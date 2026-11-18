import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MenuItem } from '../types';
import { colors } from '../theme';
import { formatPrice } from '../utils/menuHelpers';
import AppButton from './AppButton';

interface Props {
  item: MenuItem;
  onEdit: (item: MenuItem) => void;
  onDelete: (item: MenuItem) => void;
}

const MenuItemCard: React.FC<Props> = ({ item, onEdit, onDelete }) => (
  <View style={styles.card}>
    <View style={styles.topRow}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>{formatPrice(item.price)}</Text>
    </View>
    <Text style={styles.course}>{item.course}</Text>
    <Text style={styles.description}>{item.description}</Text>

    <View style={styles.actions}>
      <AppButton title="Edit" variant="edit" small onPress={() => onEdit(item)} />
      <AppButton
        title="Delete"
        variant="danger"
        small
        style={styles.gap}
        onPress={() => onDelete(item)}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
  },
  topRow: { flexDirection: 'row', justifyContent: 'space-between' },
  name: { fontSize: 17, fontWeight: 'bold', color: colors.text, flex: 1 },
  price: { fontSize: 16, fontWeight: 'bold', color: colors.accent },
  course: { fontSize: 13, color: colors.accent, marginTop: 2, marginBottom: 6 },
  description: { fontSize: 14, color: colors.subtleText },
  actions: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 12 },
  gap: { marginLeft: 8 },
});

export default MenuItemCard;
