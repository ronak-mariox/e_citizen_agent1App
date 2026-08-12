/**
 * The navy gradient header every auth screen opens with — Figma nodes 675:53
 * (sign in) and 840:77 (forgot password).
 *
 * The two frames share the gradient, the 22.5 side padding and the 52.5/30
 * vertical rhythm exactly; only the slot above the title differs — a badge on
 * one, a back button on the other — so that is passed in. The slot carries its
 * own bottom margin, because that is the one measurement the frames disagree
 * on.
 *
 * @format
 */

import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fonts } from '../theme';

type AuthHeroProps = {
  title: string;
  subtitle: string;
  /** Badge, back button — whatever sits above the title on this screen. */
  children?: ReactNode;
  /** The pale disc bleeding off the corner. Only the sign-in frame has one. */
  disc?: boolean;
  /** Frames that fix the hero taller than its content pass their height. */
  minHeight?: number;
};

function AuthHero({
  title,
  subtitle,
  children,
  disc = false,
  minHeight,
}: AuthHeroProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.hero,
        { paddingTop: insets.top + 28 },
        minHeight === undefined ? null : { minHeight: insets.top + minHeight },
      ]}
    >
      {disc ? <View style={styles.disc} /> : null}

      {children}

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    paddingHorizontal: 22.5,
    paddingBottom: 30,
    overflow: 'hidden',
    experimental_backgroundImage:
      'linear-gradient(180deg, rgb(0, 26, 77) 0%, rgb(0, 45, 138) 50%, rgb(0, 82, 204) 100%)',
  },
  disc: {
    position: 'absolute',
    top: -30,
    right: -30,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 22.5,
    lineHeight: 30,
    color: '#ffffff',
  },
  subtitle: {
    marginTop: 3.75,
    fontFamily: fonts.regular,
    fontSize: 13.125,
    lineHeight: 18.75,
    color: colors.brandBlueTint,
  },
});

export default AuthHero;
