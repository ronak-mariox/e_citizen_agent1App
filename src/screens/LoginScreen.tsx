/**
 * Agent 1 sign-in — Figma "E-Citizen Mobile App", node 675:2.
 *
 * The frame draws the screen inside a rounded 372x700 card floating on a navy
 * page. That is the mock's phone, not part of the design: on a device the card
 * *is* the screen, so the hero runs full width to the status bar and the white
 * pane fills the rest. Everything inside those two — the gradient, the badge,
 * the field metrics — is the frame's own.
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

/** Matches the shortest password the API will issue. */
const MIN_PASSWORD_LENGTH = 8;

export type Credentials = {
  employeeId: string;
  password: string;
  remember: boolean;
};

type LoginScreenProps = {
  onSubmit?: (credentials: Credentials) => void | Promise<void>;
  onForgotPassword?: () => void;
};

type Errors = { employeeId?: string; password?: string };

function LoginScreen({ onSubmit, onForgotPassword }: LoginScreenProps) {
  const insets = useSafeAreaInsets();

  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);

  /** Clears the message on the field being corrected, not the other one. */
  const clearError = useCallback(
    (field: keyof Errors) =>
      setErrors(current => {
        if (!current[field]) return current;
        const next = { ...current };
        delete next[field];
        return next;
      }),
    [],
  );

  const handleSubmit = useCallback(async () => {
    Keyboard.dismiss();

    const found: Errors = {};
    if (!employeeId.trim()) found.employeeId = 'Enter your employee ID';
    if (password.length < MIN_PASSWORD_LENGTH) {
      found.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters`;
    }

    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setSubmitting(true);
    try {
      await onSubmit?.({ employeeId: employeeId.trim(), password, remember });
    } finally {
      setSubmitting(false);
    }
  }, [employeeId, onSubmit, password, remember]);

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" />

      <AuthHero
        title="Welcome back"
        subtitle="Sign in with your employee credentials"
        disc
        minHeight={207.473}
      >
        <View style={styles.chip}>
          <Image
            source={require('../assets/images/icon-badge-file.png')}
            style={styles.chipIcon}
          />
          <Text style={styles.chipLabel}>Agent 1 — Field Verification</Text>
        </View>
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
          label="Employee ID"
          icon={require('../assets/images/icon-user.png')}
          value={employeeId}
          onChangeText={value => {
            setEmployeeId(value);
            clearError('employeeId');
          }}
          placeholder="Enter your employee ID"
          autoCapitalize="characters"
          autoCorrect={false}
          returnKeyType="next"
          error={errors.employeeId}
        />

        <TextField
          label="Password"
          icon={require('../assets/images/icon-lock.png')}
          value={password}
          onChangeText={value => {
            setPassword(value);
            clearError('password');
          }}
          placeholder="Enter your password"
          secureTextEntry={!showPassword}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="go"
          onSubmitEditing={handleSubmit}
          error={errors.password}
          trailing={
            /* The frame only exports the open eye, so the state is carried by
               the tint rather than by a second glyph: muted while the password
               is hidden, brand blue while it is showing. */
            <Pressable
              onPress={() => setShowPassword(visible => !visible)}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
              accessibilityState={{ selected: showPassword }}
            >
              <Image
                source={require('../assets/images/icon-eye.png')}
                style={[styles.eye, showPassword ? styles.eyeOn : null]}
              />
            </Pressable>
          }
        />

        <View style={styles.options}>
          <Pressable
            style={styles.remember}
            onPress={() => setRemember(checked => !checked)}
            hitSlop={6}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: remember }}
          >
            <View style={[styles.checkbox, remember ? styles.checkboxOn : null]}>
              {remember ? <View style={styles.checkboxTick} /> : null}
            </View>
            <Text style={styles.rememberLabel}>Remember me</Text>
          </Pressable>

          <Pressable
            onPress={onForgotPassword}
            hitSlop={8}
            accessibilityRole="button"
          >
            <Text style={styles.link}>Forgot password?</Text>
          </Pressable>
        </View>

        {/* Holds the button and the ministry line at the bottom of the pane,
            which is what the frame's empty flex child (node 675:46) does. */}
        <View style={styles.spacer} />

        <PrimaryButton
          label="Sign In Securely"
          busyLabel="Signing In…"
          busy={submitting}
          onPress={handleSubmit}
        />

        <Text style={styles.ministry}>
          Ministry of Electronics &amp; Information Technology
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.card,
  },

  chip: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5.625,
    marginBottom: 11.25,
    paddingHorizontal: 11.25,
    paddingVertical: 3.75,
    borderRadius: 999,
    backgroundColor: 'rgba(56, 189, 248, 0.2)',
    borderWidth: 0.625,
    borderColor: 'rgba(56, 189, 248, 0.3)',
  },
  chipIcon: {
    width: 11.245,
    height: 11.245,
  },
  chipLabel: {
    fontFamily: fonts.bold,
    fontSize: 10,
    lineHeight: 15,
    color: colors.brandSky,
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

  eye: {
    width: 14.993,
    height: 14.993,
  },
  eyeOn: {
    tintColor: colors.brandBlue,
  },

  options: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  remember: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7.5,
  },
  checkbox: {
    width: 16.867,
    height: 16.867,
    // Nearly circular in the frame, not a square box.
    borderRadius: 9.25,
    borderWidth: 1.874,
    borderColor: colors.checkboxBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxOn: {
    backgroundColor: colors.brandBlue,
    borderColor: colors.brandBlue,
  },
  checkboxTick: {
    width: 6.5,
    height: 6.5,
    borderRadius: 3.25,
    backgroundColor: '#ffffff',
  },
  rememberLabel: {
    fontFamily: fonts.medium,
    fontSize: 11.25,
    lineHeight: 15,
    color: colors.textLabel,
  },
  link: {
    fontFamily: fonts.semiBold,
    fontSize: 11.25,
    lineHeight: 15,
    color: colors.brandBlue,
  },

  spacer: {
    flexGrow: 1,
    minHeight: 15,
  },

  ministry: {
    fontFamily: fonts.regular,
    fontSize: 10,
    lineHeight: 15,
    color: colors.textMuted,
    textAlign: 'center',
  },
});

export default LoginScreen;
