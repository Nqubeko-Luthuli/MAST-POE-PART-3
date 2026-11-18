import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { MenuItem } from '../types';
import { COURSES } from '../constants';
import AppHeader from '../components/AppHeader';
import StatCard from '../components/StatCard';
import { calculateStatistics, formatPrice } from '../utils/menuHelpers';
import { colors, spacing } from '../theme';

interface Props {
  items: MenuItem[];
  onBack: () => void;
}

const StatisticsScreen: React.FC<Props> = ({ items, onBack }) => {
  const stats = calculateStatistics(items);

  return (
    <SafeAreaView style={styles.safe}>
      <AppHeader title="Menu Statistics" onBack={onBack} />
      <ScrollView contentContainerStyle={styles.content}>
        {stats.totalItems === 0 && (
          <Text style={styles.note}>
            No dishes have been added yet, so the statistics are all zero.
          </Text>
        )}

        <StatCard label="Total menu items" value={String(stats.totalItems)} />
        <StatCard label="Average price" value={formatPrice(stats.averagePrice)} />

        <Text style={styles.sectionTitle}>Items per course</Text>
        {COURSES.map((course) => (
          <StatCard
            key={course}
            label={course}
            value={String(stats.courseCounts[course])}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg },
  note: { color: colors.subtleText, textAlign: 'center', marginBottom: 16 },
  sectionTitle: { fontSize: 17, fontWeight: 'bold', color: colors.text, marginVertical: 8 },
});

export default StatisticsScreen;
