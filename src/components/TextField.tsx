/**
 * Labelled input with a glyph pinned inside its left edge — the field every
 * auth screen is built from (Figma nodes 675:15, 675:26, 840:97).
 *
 * @format
 */

import type { ReactNode } from 'react';
import { Image, StyleSheet, Text, TextInput, View } from 'react-native';
import type { ImageSourcePropType, TextInputProps } from 'react-native';
import { colors, fonts } from '../theme';

type TextFieldProps = TextInputProps & {
  label: string;
  icon: ImageSourcePropType;
  /** Icon size, which the frames vary by a fraction (14.993 / 15). */
  iconSize?: number;
  /** A control pinned inside the right edge — the password eye, so far. */
  trailing?: ReactNode;
  error?: string;
};

function TextField({
  label,
  icon,
  iconSize = 14.993,
  trailing,
  error,
  style,
  ...inputProps
}: TextFieldProps) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.control}>
        <Image
          source={icon}
          style={[styles.leadingIcon, { width: iconSize, height: iconSize }]}
        />

        <TextInput
          style={[
            styles.input,
            trailing ? styles.inputWithAction : null,
            error ? styles.inputError : null,
            style,
          ]}
          placeholderTextColor={colors.textMuted}
          {...inputProps}
        />

        {trailing ? <View style={styles.trailing}>{trailing}</View> : null}
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    gap: 5.625,
  },
  label: {
    fontFamily: fonts.semiBold,
    fontSize: 11.25,
    lineHeight: 15,
    color: colors.textLabel,
  },
  control: {
    justifyContent: 'center',
  },
  leadingIcon: {
    position: 'absolute',
    left: 13.12,
    zIndex: 1,
  },
  input: {
    height: 49.996,
    paddingLeft: 37.5,
    paddingRight: 15,
    paddingVertical: 0,
    borderRadius: 15,
    backgroundColor: colors.surface,
    borderWidth: 0.625,
    borderColor: colors.cardBorder,
    fontFamily: fonts.regular,
    fontSize: 13.125,
    lineHeight: 18.75,
    color: colors.textPrimary,
  },
  inputWithAction: {
    paddingRight: 45,
  },
  inputError: {
    borderColor: colors.danger,
  },
  trailing: {
    position: 'absolute',
    right: 13.12,
    zIndex: 1,
  },
  error: {
    fontFamily: fonts.medium,
    fontSize: 11.25,
    lineHeight: 15,
    color: colors.danger,
  },
});

export default TextField;
