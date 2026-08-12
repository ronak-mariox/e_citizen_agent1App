/**
 * The blue call-to-action at the foot of every auth screen — Figma nodes
 * 675:47 ("Sign In Securely") and 840:105 ("Send OTP"), which share their fill,
 * height, radius, shadow and label style.
 *
 * @format
 */

import { Pressable, StyleSheet, Text } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import { colors, fonts } from '../theme';

type PrimaryButtonProps = {
  label: string;
  /** Shown in place of `label` while the press is in flight. */
  busyLabel?: string;
  busy?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

function PrimaryButton({
  label,
  busyLabel,
  busy = false,
  onPress,
  style,
}: PrimaryButtonProps) {
  return (
    <Pressable
      style={[styles.button, busy ? styles.busy : null, style]}
      onPress={busy ? undefined : onPress}
      accessibilityRole="button"
      accessibilityState={{ disabled: busy, busy }}
    >
      <Text style={styles.label}>{busy ? busyLabel ?? label : label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 49.996,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.brandBlue,
    boxShadow:
      '0px 10px 7.5px rgba(0, 82, 204, 0.3), 0px 4px 3px rgba(0, 82, 204, 0.3)',
  },
  busy: {
    opacity: 0.7,
  },
  label: {
    fontFamily: fonts.bold,
    fontSize: 13.125,
    lineHeight: 18.75,
    color: '#ffffff',
    textAlign: 'center',
  },
});

export default PrimaryButton;
