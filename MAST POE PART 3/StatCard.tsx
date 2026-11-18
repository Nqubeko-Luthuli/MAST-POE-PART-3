import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme';

interface Props {
  label: string;
  value: string;
}

// One labelled number on the Statistics screen.
const StatCard: React.FC<Props> = ({ label, value }) => (
  <View style={styles.card}>
    <Text style={styles.value}>{value}</Text>
    <Text style={styles.label}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  value: { fontSize: 28, fontWeight: 'bold', color: colors.accent },
  label: { fontSize: 14, color: colors.subtleText, marginTop: 4 },
});

export default StatCard;
