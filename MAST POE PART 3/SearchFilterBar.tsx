import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { CourseFilter } from '../types';
import { FILTER_OPTIONS } from '../constants';
import { colors } from '../theme';

interface Props {
  searchText: string;
  selectedCourse: CourseFilter;
  onSearchChange: (text: string) => void;
  onCourseChange: (course: CourseFilter) => void;
  onClear: () => void;
}

const SearchFilterBar: React.FC<Props> = ({
  searchText,
  selectedCourse,
  onSearchChange,
  onCourseChange,
  onClear,
}) => {
  const isActive = searchText !== '' || selectedCourse !== 'All';

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        placeholder="Search dishes by name"
        placeholderTextColor={colors.placeholder}
        value={searchText}
        onChangeText={onSearchChange}
      />

      <View style={styles.chipRow}>
        {FILTER_OPTIONS.map((option) => {
          const selected = option === selectedCourse;
          return (
            <TouchableOpacity
              key={option}
              style={[styles.chip, selected && styles.chipSelected]}
              onPress={() => onCourseChange(option)}
            >
              <Text style={[styles.chipText, selected && styles.chipTextSelected]}>{option}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {isActive && (
        <TouchableOpacity onPress={onClear}>
          <Text style={styles.clear}>Clear search and filter</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 12 },
  search: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: colors.text,
  },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 },
  chip: {
    borderWidth: 1,
    borderColor: colors.accent,
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 14,
    marginRight: 8,
    marginBottom: 6,
    backgroundColor: colors.white,
  },
  chipSelected: { backgroundColor: colors.accent },
  chipText: { color: colors.accent, fontSize: 13, fontWeight: '600' },
  chipTextSelected: { color: colors.white },
  clear: { color: colors.error, fontWeight: '600', marginTop: 2 },
});

export default SearchFilterBar;
