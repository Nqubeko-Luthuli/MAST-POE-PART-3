import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { CourseFilter, FeedbackMessage, MenuItem } from '../types';
import AppHeader from '../components/AppHeader';
import AppButton from '../components/AppButton';
import MenuItemCard from '../components/MenuItemCard';
import MessageBanner from '../components/MessageBanner';
import SearchFilterBar from '../components/SearchFilterBar';
import { filterMenuItems } from '../utils/menuHelpers';
import { colors, spacing } from '../theme';

interface Props {
  items: MenuItem[];
  message: FeedbackMessage | null;
  onAddDish: () => void;
  onEditDish: (item: MenuItem) => void;
  onDeleteDish: (item: MenuItem) => void;
  onBack: () => void;
}

const MenuListScreen: React.FC<Props> = ({
  items,
  message,
  onAddDish,
  onEditDish,
  onDeleteDish,
  onBack,
}) => {
  const [searchText, setSearchText] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<CourseFilter>('All');

  const visibleItems = filterMenuItems(items, searchText, selectedCourse);
  const menuIsEmpty = items.length === 0;

  const clearSearchAndFilter = () => {
    setSearchText('');
    setSelectedCourse('All');
  };

  const renderEmptyMessage = () => (
    <View style={styles.emptyBox}>
      {menuIsEmpty ? (
        <>
          <Text style={styles.emptyTitle}>No menu items yet</Text>
          <Text style={styles.emptyText}>
            Tap "Add New Dish" below to add your first menu item.
          </Text>
        </>
      ) : (
        <>
          <Text style={styles.emptyTitle}>No matching dishes</Text>
          <Text style={styles.emptyText}>
            Try a different name or tap "Clear search and filter".
          </Text>
        </>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <AppHeader title="Menu Items" onBack={onBack} />
      <View style={styles.content}>
        {message && <MessageBanner message={message} />}

        {!menuIsEmpty && (
          <>
            <SearchFilterBar
              searchText={searchText}
              selectedCourse={selectedCourse}
              onSearchChange={setSearchText}
              onCourseChange={setSelectedCourse}
              onClear={clearSearchAndFilter}
            />
            <Text style={styles.count}>
              Showing {visibleItems.length} of {items.length} dishes
            </Text>
          </>
        )}

        <FlatList
          data={visibleItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <MenuItemCard item={item} onEdit={onEditDish} onDelete={onDeleteDish} />
          )}
          ListEmptyComponent={renderEmptyMessage}
          style={styles.list}
        />

        <AppButton title="+ Add New Dish" onPress={onAddDish} style={styles.addButton} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1, padding: spacing.md },
  list: { flex: 1 },
  count: { fontSize: 13, color: colors.subtleText, marginBottom: 8 },
  emptyBox: { alignItems: 'center', marginTop: 40, paddingHorizontal: 20 },
  emptyTitle: { fontSize: 18, fontWeight: 'bold', color: colors.text, marginBottom: 6 },
  emptyText: { fontSize: 15, color: colors.subtleText, textAlign: 'center' },
  addButton: { marginTop: 8 },
});

export default MenuListScreen;
