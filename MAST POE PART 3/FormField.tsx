import React from 'react';
import { View, Text, TextInput, TextInputProps, StyleSheet } from 'react-native';
import { colors } from '../theme';

interface Props extends TextInputProps {
  label: string;
  error?: string;
}

// A label + text box + error message, reused for every form field.
const FormField: React.FC<Props> = ({ label, error, style, ...inputProps }) => (
  <View>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      placeholderTextColor={colors.placeholder}
      style={[styles.input, error ? styles.inputError : null, style]}
      {...inputProps}
    />
    {error ? <Text style={styles.errorText}>{error}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  label: { fontSize: 15, fontWeight: '600', color: colors.text, marginTop: 16, marginBottom: 6 },
  input: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: colors.text,
  },
  inputError: { borderColor: colors.error, backgroundColor: colors.errorBg },
  errorText: { color: colors.error, fontSize: 13, marginTop: 4 },
});

export default FormField;
