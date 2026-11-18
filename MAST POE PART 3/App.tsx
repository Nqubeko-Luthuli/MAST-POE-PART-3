import React, { useState } from 'react';
import { Alert } from 'react-native';
import { FeedbackMessage, MenuItem, MenuItemInput, Screen } from './types';
import { generateId } from './utils/menuHelpers';
import HomeScreen from './screens/HomeScreen';
import MenuListScreen from './screens/MenuListScreen';
import DishFormScreen from './screens/DishFormScreen';
import StatisticsScreen from './screens/StatisticsScreen';

/**
 * Root component. Holds the menu items in state and decides which screen to
 * show. Whenever the state changes, every screen re-renders, so changes
 * (add, edit, delete) show up immediately.
 */
export default function App() {
  const [screen, setScreen] = useState<Screen>('Home');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [dishToEdit, setDishToEdit] = useState<MenuItem | null>(null);
  const [message, setMessage] = useState<FeedbackMessage | null>(null);

  const goTo = (target: Screen) => {
    setMessage(null); // clear any old message when moving around
    setScreen(target);
  };

  const startAddingDish = () => {
    setDishToEdit(null);
    goTo('DishForm');
  };

  const startEditingDish = (item: MenuItem) => {
    setDishToEdit(item);
    goTo('DishForm');
  };

  const saveDish = (data: MenuItemInput, id?: string) => {
    if (id) {
      setMenuItems((prev) => prev.map((item) => (item.id === id ? { ...item, ...data } : item)));
      setMessage({ type: 'success', text: `"${data.name}" was updated successfully.` });
    } else {
      setMenuItems((prev) => [...prev, { ...data, id: generateId() }]);
      setMessage({ type: 'success', text: `"${data.name}" was added to the menu successfully.` });
    }
    setScreen('MenuList');
  };

  const deleteDish = (item: MenuItem) => {
    setMenuItems((prev) => prev.filter((existing) => existing.id !== item.id));
    setMessage({ type: 'success', text: `"${item.name}" was deleted from the menu.` });
  };

  // Ask the chef to confirm before anything is deleted.
  const confirmDeleteDish = (item: MenuItem) => {
    Alert.alert('Delete dish', `Are you sure you want to delete "${item.name}"?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => deleteDish(item) },
    ]);
  };

  switch (screen) {
    case 'MenuList':
      return (
        <MenuListScreen
          items={menuItems}
          message={message}
          onAddDish={startAddingDish}
          onEditDish={startEditingDish}
          onDeleteDish={confirmDeleteDish}
          onBack={() => goTo('Home')}
        />
      );
    case 'DishForm':
      return (
        <DishFormScreen
          dishToEdit={dishToEdit}
          existingItems={menuItems}
          onSave={saveDish}
          onCancel={() => goTo('MenuList')}
        />
      );
    case 'Statistics':
      return <StatisticsScreen items={menuItems} onBack={() => goTo('Home')} />;
    default:
      return (
        <HomeScreen
          itemCount={menuItems.length}
          onViewMenu={() => goTo('MenuList')}
          onAddDish={startAddingDish}
          onViewStatistics={() => goTo('Statistics')}
        />
      );
  }
}
