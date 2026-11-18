import React from 'react';
import { Text, TouchableOpacity, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { colors } from '../theme';

type Variant = 'primary' | 'secondary' | 'edit' | 'danger';

interface Props {
  title: string;
  onPress: () => void;
  variant?: Variant;
  small?: boolean;
  style?: StyleProp<ViewStyle>;
}

const BACKGROUNDS: Record<Variant, string> = {
  primary: colors.accent,
  secondary: colors.cancel,
  edit: colors.edit,
  danger: colors.error,
};

// One reusable button used on every screen instead of repeating styles.
const AppButton: React.FC<Props> = ({ title, onPress, variant = 'primary', small, style }) => (
  <TouchableOpacity
    style={[
      styles.button,
      small && styles.small,
      { backgroundColor: BACKGROUNDS[variant] },
      style,
    ]}
    onPress={onPress}
  >
    <Text style={[styles.text, small && styles.smallText]}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: { borderRadius: 8, paddingVertical: 15, alignItems: 'center' },
  small: { paddingVertical: 7, paddingHorizontal: 16 },
  text: { color: colors.white, fontSize: 16, fontWeight: 'bold' },
  smallText: { fontSize: 13 },
});

export default AppButton;
