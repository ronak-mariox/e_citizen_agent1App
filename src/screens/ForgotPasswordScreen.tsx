/**
 * Forgot password — Figma "E-Citizen Mobile App", node 840:76.
 *
 * Same shell as the sign-in screen: the frame's rounded card is the mock's
 * phone, so on a device the hero runs to the status bar and the white pane
 * fills the rest.
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
import PrimaryButton from '../components/PrimaryButton';
import TextField from '../components/TextField';
import { colors, fonts } from '../theme';

/** Deliberately loose — the server decides which addresses it knows. */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ForgotPasswordScreenProps = {
  onSubmit?: (email: string) => void | Promise<void>;
  onBackToLogin?: () => void;
};

function ForgotPasswordScreen({
  onSubmit,
  onBackToLogin,
}: ForgotPasswordScreenProps) {
  const insets = useSafeAreaInsets();

  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = useCallback(async () => {
    Keyboard.dismiss();

    const value = email.trim();
    if (!value) {
      setError('Enter your registered email');
      return;
    }
    if (!EMAIL.test(value)) {
      setError('Enter a valid email address');
      return;
    }

    setError(null);
    setSubmitting(true);
    try {
      await onSubmit?.(value);
    } finally {
      setSubmitting(false);
    }
  }, [email, onSubmit]);

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" />

      <AuthHero
        title="Forgot Password?"
        subtitle="Enter your registered email to receive an OTP."
      >
        <Pressable
          style={styles.back}
          onPress={onBackToLogin}
          hitSlop={8}
          accessibilityRole="button"
        >
          <Image
            source={require('../assets/images/icon-back.png')}
            style={styles.backIcon}
          />
          <Text style={styles.backLabel}>Back to Login</Text>
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
        <TextField
          label="Registered Email"
          icon={require('../assets/images/icon-mail.png')}
          iconSize={15}
          value={email}
          onChangeText={value => {
            setEmail(value);
            setError(null);
          }}
          placeholder="Enter your registered email"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="send"
          onSubmitEditing={handleSubmit}
          error={error ?? undefined}
        />

        {/* Holds the button at the foot of the pane, which is what the frame's
            empty flex child (node 840:104) does. */}
        <View style={styles.spacer} />

        <PrimaryButton
          label="Send OTP"
          busyLabel="Sending…"
          busy={submitting}
          onPress={handleSubmit}
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
    gap: 15,
    padding: 22.5,
  },
  spacer: {
    flexGrow: 1,
    minHeight: 15,
  },
});

export default ForgotPasswordScreen;
