import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../theme';

interface Props {
  title: string;
  onBack?: () => void;
}

// Header used on every screen so the layout stays consistent.
const AppHeader: React.FC<Props> = ({ title, onBack }) => (
  <View style={styles.header}>
    <View style={styles.side}>
      {onBack && (
        <TouchableOpacity onPress={onBack} accessibilityLabel="Go back">
          <Text style={styles.back}>{'\u2190'}</Text>
        </TouchableOpacity>
      )}
    </View>
    <Text style={styles.title}>{title}</Text>
    <View style={styles.side} />
  </View>
);

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.accent,
    paddingVertical: 18,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  side: { width: 36 },
  back: { color: colors.white, fontSize: 24 },
  title: {
    flex: 1,
    textAlign: 'center',
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default AppHeader;
