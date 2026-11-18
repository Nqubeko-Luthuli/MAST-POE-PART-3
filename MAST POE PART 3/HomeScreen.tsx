import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import AppHeader from '../components/AppHeader';
import AppButton from '../components/AppButton';
import { colors, spacing } from '../theme';

interface Props {
  itemCount: number;
  onViewMenu: () => void;
  onAddDish: () => void;
  onViewStatistics: () => void;
}

const HomeScreen: React.FC<Props> = ({ itemCount, onViewMenu, onAddDish, onViewStatistics }) => (
  <SafeAreaView style={styles.safe}>
    <AppHeader title="Chef's Menu Manager" />
    <View style={styles.content}>
      <Text style={styles.welcome}>Welcome, Chef Christoffel!</Text>
      <Text style={styles.sub}>
        {itemCount === 0
          ? 'Your menu is empty. Add your first dish to get started.'
          : `You currently have ${itemCount} dish${itemCount === 1 ? '' : 'es'} on the menu.`}
      </Text>

      <AppButton title="View Menu" onPress={onViewMenu} style={styles.gap} />
      <AppButton title="+ Add New Dish" onPress={onAddDish} style={styles.gap} />
      <AppButton title="Menu Statistics" onPress={onViewStatistics} style={styles.gap} />
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg },
  welcome: { fontSize: 20, fontWeight: '600', color: colors.text, marginBottom: 6 },
  sub: { fontSize: 15, color: colors.subtleText, marginBottom: 28 },
  gap: { marginBottom: spacing.md },
});

export default HomeScreen;
