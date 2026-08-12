/**
 * Verify OTP — Figma "E-Citizen Mobile App", node 845:1582.
 *
 * Where "Send OTP" on the forgot-password screen lands. Same shell as the
 * other two auth screens: the frame's rounded card is the mock's phone, so on
 * a device the hero runs to the status bar and the white pane fills the rest.
 * This pane spaces its children 22.5 apart rather than 15, which is the one
 * measurement it does not share with the screens before it.
 *
 * @format
 */

import { useCallback, useState } from 'react';
import {
  Image,
  Keyboard,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AuthHero from '../components/AuthHero';
import OtpInput, { OTP_LENGTH, emptyOtp } from '../components/OtpInput';
import PrimaryButton from '../components/PrimaryButton';
import { colors, fonts } from '../theme';

type VerifyOtpScreenProps = {
  /**
   * Checks the code. Returning a string rejects it and shows that string under
   * the boxes, which is how a wrong code reaches the user; returning nothing
   * means the code was accepted and the caller has moved the screen on.
   */
  onSubmit?: (code: string) => string | void | Promise<string | void>;
  onResend?: () => void | Promise<void>;
  onBack?: () => void;
};

function VerifyOtpScreen({ onSubmit, onResend, onBack }: VerifyOtpScreenProps) {
  const insets = useSafeAreaInsets();

  const [code, setCode] = useState<string[]>(emptyOtp);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  /** Takes the code as a string: a box left blank shortens it, so a short one
      is an incomplete code however the holes are spread. */
  const submit = useCallback(
    async (value: string) => {
      Keyboard.dismiss();

      if (value.length < OTP_LENGTH) {
        setError(`Enter all ${OTP_LENGTH} digits`);
        return;
      }

      setError(null);
      setSubmitting(true);
      try {
        const rejected = await onSubmit?.(value);
        if (rejected) setError(rejected);
      } finally {
        setSubmitting(false);
      }
    },
    [onSubmit],
  );

  const handleResend = useCallback(async () => {
    Keyboard.dismiss();
    setCode(emptyOtp());
    setError(null);
    await onResend?.();
  }, [onResend]);

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" />

      <AuthHero
        title="Verify OTP"
        subtitle="6-digit OTP sent to your email. (Demo: 123456)"
      >
        <Pressable
          style={styles.back}
          onPress={onBack}
          hitSlop={8}
          accessibilityRole="button"
        >
          <Image
            source={require('../assets/images/icon-back.png')}
            style={styles.backIcon}
          />
          <Text style={styles.backLabel}>Back</Text>
        </Pressable>
      </AuthHero>

      <ScrollView
        style={styles.pane}
        contentContainerStyle={[
          styles.paneContent,
          { paddingBottom: 22.5 + insets.bottom },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <OtpInput
          value={code}
          onChange={value => {
            setCode(value);
            setError(null);
          }}
          onFilled={submit}
          error={error !== null}
          autoFocus
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <View style={styles.resend}>
          <Pressable
            onPress={handleResend}
            hitSlop={8}
            accessibilityRole="button"
          >
            <Text style={styles.resendLabel}>Resend OTP</Text>
          </Pressable>
        </View>

        {/* Holds the button at the foot of the pane, which is what the frame's
            empty flex child (node 845:1610) does. */}
        <View style={styles.spacer} />

        <PrimaryButton
          label="Verify & Continue"
          busyLabel="Verifying…"
          busy={submitting}
          onPress={() => submit(code.join(''))}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.card,
  },

  back: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5.625,
    marginBottom: 22.5,
  },
  backIcon: {
    width: 13.125,
    height: 13.125,
  },
  backLabel: {
    fontFamily: fonts.medium,
    fontSize: 11.25,
    lineHeight: 15,
    color: colors.brandBlueTint,
  },

  pane: {
    flex: 1,
    backgroundColor: colors.card,
  },
  paneContent: {
    flexGrow: 1,
    gap: 22.5,
    padding: 22.5,
  },

  error: {
    fontFamily: fonts.medium,
    fontSize: 11.25,
    lineHeight: 15,
    color: colors.danger,
    textAlign: 'center',
  },

  resend: {
    height: 22.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resendLabel: {
    fontFamily: fonts.semiBold,
    fontSize: 11.25,
    lineHeight: 15,
    color: colors.brandBlue,
    textAlign: 'center',
  },

  spacer: {
    flexGrow: 1,
    minHeight: 15,
  },
});

export default VerifyOtpScreen;
