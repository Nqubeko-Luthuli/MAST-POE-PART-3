import React, { useState } from 'react';
import {
  View, Text, StyleSheet, SafeAreaView, ScrollView,
  KeyboardAvoidingView, Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Course, MenuItem, MenuItemInput } from '../types';
import { COURSES } from '../constants';
import AppHeader from '../components/AppHeader';
import AppButton from '../components/AppButton';
import FormField from '../components/FormField';
import MessageBanner from '../components/MessageBanner';
import { DishFormErrors, validateDishForm } from '../utils/validation';
import { colors, spacing } from '../theme';

interface Props {
  // Leave undefined to add a new dish, or pass a dish to edit it.
  dishToEdit?: MenuItem | null;
  existingItems: MenuItem[];
  onSave: (data: MenuItemInput, id?: string) => void;
  onCancel: () => void;
}

const DishFormScreen: React.FC<Props> = ({ dishToEdit, existingItems, onSave, onCancel }) => {
  const isEditing = !!dishToEdit;

  const [name, setName] = useState(dishToEdit?.name ?? '');
  const [description, setDescription] = useState(dishToEdit?.description ?? '');
  const [course, setCourse] = useState<Course>(dishToEdit?.course ?? 'Starter');
  const [price, setPrice] = useState(dishToEdit ? String(dishToEdit.price) : '');
  const [errors, setErrors] = useState<DishFormErrors>({});

  const handleSave = () => {
    const foundErrors = validateDishForm({ name, description, price }, existingItems, dishToEdit?.id);
    setErrors(foundErrors);
    if (Object.keys(foundErrors).length > 0) return; // stop if anything is invalid

    onSave(
      { name: name.trim(), description: description.trim(), course, price: Number(price) },
      dishToEdit?.id
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <AppHeader title={isEditing ? 'Edit Dish' : 'Add Dish'} onBack={onCancel} />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          {Object.keys(errors).length > 0 && (
            <MessageBanner
              message={{ type: 'error', text: 'Please fix the highlighted fields before saving.' }}
            />
          )}

          <FormField
            label="Dish Name"
            placeholder="e.g. Bruschetta"
            value={name}
            onChangeText={setName}
            error={errors.name}
          />

          <FormField
            label="Description"
            placeholder="e.g. Toasted bread topped with tomato, basil and olive oil"
            value={description}
            onChangeText={setDescription}
            error={errors.description}
            multiline
            numberOfLines={4}
            style={styles.multiline}
          />

          <Text style={styles.label}>Course</Text>
          <View style={styles.pickerWrap}>
            <Picker selectedValue={course} onValueChange={(value) => setCourse(value as Course)}>
              {COURSES.map((option) => (
                <Picker.Item key={option} label={option} value={option} />
              ))}
            </Picker>
          </View>

          <FormField
            label="Price (R)"
            placeholder="e.g. 45.00"
            value={price}
            onChangeText={setPrice}
            error={errors.price}
            keyboardType="numeric"
          />

          <View style={styles.row}>
            <AppButton
              title={isEditing ? 'Update' : 'Save'}
              onPress={handleSave}
              style={styles.rowButtonLeft}
            />
            <AppButton
              title="Cancel"
              variant="secondary"
              onPress={onCancel}
              style={styles.rowButtonRight}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  flex: { flex: 1 },
  content: { padding: spacing.lg },
  label: { fontSize: 15, fontWeight: '600', color: colors.text, marginTop: 16, marginBottom: 6 },
  multiline: { height: 90, textAlignVertical: 'top' },
  pickerWrap: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 6,
  },
  row: { flexDirection: 'row', marginTop: 28, marginBottom: 30 },
  rowButtonLeft: { flex: 1, marginRight: 8 },
  rowButtonRight: { flex: 1, marginLeft: 8 },
});

export default DishFormScreen;
