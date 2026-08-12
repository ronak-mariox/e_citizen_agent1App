/**
 * The six-box OTP entry — Figma "E-Citizen Mobile App", node 845:1599.
 *
 * The frame draws six empty boxes, so the filled, focused and rejected states
 * are the app's own: the box keeps the frame's fill and 2px outline until it
 * holds a digit or has the caret, when the outline turns brand blue.
 *
 * The code is held as one entry per box rather than as a string, so clearing a
 * box in the middle leaves a hole instead of shifting the digits after it left.
 *
 * @format
 */

import { useRef, useState } from 'react';
import type { ComponentRef } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import type { TextInputKeyPressEvent } from 'react-native';
import { colors, fonts } from '../theme';

export const OTP_LENGTH = 6;

/** A blank code — the shape every caller starts and resets from. */
export const emptyOtp = () => Array<string>(OTP_LENGTH).fill('');

export const isOtpComplete = (value: string[]) =>
  value.length === OTP_LENGTH && value.every(digit => digit !== '');

type OtpInputProps = {
  value: string[];
  onChange: (next: string[]) => void;
  /** Fired once the last box is filled, so the screen can submit itself. */
  onFilled?: (code: string) => void;
  error?: boolean;
  autoFocus?: boolean;
};

function OtpInput({
  value,
  onChange,
  onFilled,
  error = false,
  autoFocus = false,
}: OtpInputProps) {
  const boxes = useRef<Array<ComponentRef<typeof TextInput> | null>>([]);
  const [focused, setFocused] = useState<number | null>(null);

  const handleChange = (index: number, text: string) => {
    const cleaned = text.replace(/[^0-9]/g, '');
    const previous = value[index];

    /**
     * Typing over a box that already holds a digit arrives as both characters
     * — the old one first or last, depending on where the caret landed — so
     * the old one is dropped. Anything longer is a paste or an SMS autofill,
     * which spreads across the boxes from here.
     */
    let typed = cleaned;
    if (previous && typed.length === 2) {
      typed = typed.startsWith(previous) ? typed.slice(1) : typed.slice(0, 1);
    }

    const next = [...value];

    if (!typed) {
      next[index] = '';
      onChange(next);
      return;
    }

    let cursor = index;
    for (const digit of typed) {
      if (cursor >= OTP_LENGTH) break;
      next[cursor] = digit;
      cursor += 1;
    }
    onChange(next);

    if (isOtpComplete(next)) {
      boxes.current[Math.min(cursor, OTP_LENGTH) - 1]?.blur();
      onFilled?.(next.join(''));
      return;
    }

    boxes.current[Math.min(cursor, OTP_LENGTH - 1)]?.focus();
  };

  /** Backspace on a box the user has already emptied walks back one box. */
  const handleKeyPress = (index: number, event: TextInputKeyPressEvent) => {
    if (event.nativeEvent.key !== 'Backspace') return;
    if (value[index] || index === 0) return;

    const next = [...value];
    next[index - 1] = '';
    onChange(next);
    boxes.current[index - 1]?.focus();
  };

  return (
    <View style={styles.row}>
      {Array.from({ length: OTP_LENGTH }, (_, index) => {
        const digit = value[index] ?? '';

        return (
          <TextInput
            key={index}
            ref={box => {
              boxes.current[index] = box;
            }}
            style={[
              styles.box,
              digit || focused === index ? styles.boxActive : null,
              error ? styles.boxError : null,
            ]}
            value={digit}
            onChangeText={text => handleChange(index, text)}
            onKeyPress={event => handleKeyPress(index, event)}
            onFocus={() => setFocused(index)}
            onBlur={() =>
              setFocused(current => (current === index ? null : current))
            }
            keyboardType="number-pad"
            inputMode="numeric"
            returnKeyType="done"
            textAlign="center"
            autoFocus={autoFocus && index === 0}
            // The first box takes the autofilled code and spreads it; the rest
            // must not offer it, or each one would paste the whole code.
            textContentType={index === 0 ? 'oneTimeCode' : 'none'}
            autoComplete={index === 0 ? 'sms-otp' : 'off'}
            accessibilityLabel={`Digit ${index + 1} of ${OTP_LENGTH}`}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 7.5,
  },
  box: {
    width: 41.25,
    height: 52.5,
    borderRadius: 15.25,
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.cardBorder,
    paddingVertical: 0,
    fontFamily: fonts.bold,
    fontSize: 18.75,
    lineHeight: 22.5,
    color: colors.textPrimary,
  },
  boxActive: {
    borderColor: colors.brandBlue,
  },
  boxError: {
    borderColor: colors.danger,
  },
});

export default OtpInput;
