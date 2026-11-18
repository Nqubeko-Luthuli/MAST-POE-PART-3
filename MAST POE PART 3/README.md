# Chef's Menu Manager (Final PoE)

A React Native (TypeScript, Expo) mobile app that lets a chef manage a restaurant menu: dish name, description, course (Starter, Main Course, Dessert) and price.

## Links
- **GitHub repo:** <paste your repo link here>
- **Video demonstration:** <paste your video link here>

## How to run
1. Install Node.js (LTS) and clone this repo.
2. `npm install`
3. `npx expo install @react-native-picker/picker`
4. `npx expo start`, then scan the QR code in Expo Go or press `a` for an Android emulator.

## Features
- Add, edit and delete menu items (changes show immediately).
- Search by dish name and filter by course; clear both with one tap.
- Statistics screen: total items, average price, items per course.
- Validation with inline error messages, success/error banners, delete confirmation, and empty-menu / no-results messages.

## Project structure
```
src/
  App.tsx                      Root: menu state, navigation, add/edit/delete handlers
  types.ts                     Shared TypeScript types
  constants.ts                 COURSES and FILTER_OPTIONS
  theme.ts                     Colours and spacing
  utils/
    menuHelpers.ts             filterMenuItems, calculateStatistics, formatPrice, generateId
    validation.ts              validateDishForm
  screens/
    HomeScreen.tsx
    MenuListScreen.tsx         List + search/filter + edit/delete
    DishFormScreen.tsx         One form used for adding AND editing
    StatisticsScreen.tsx
  components/
    AppHeader.tsx  AppButton.tsx  FormField.tsx  MessageBanner.tsx
    MenuItemCard.tsx  SearchFilterBar.tsx  StatCard.tsx
```

## Change log (since Part 2)

### Added
- **Edit a dish:** Edit button on every card opens the form pre-filled; saving updates the item and the list.
- **Delete a dish:** Delete button with a confirmation prompt; the list updates immediately.
- **Search:** search box filters dishes by name (not case-sensitive).
- **Filter by course:** All / Starter / Main Course / Dessert chips.
- **Clear:** "Clear search and filter" restores the full list.
- **"Showing X of Y dishes"** counter and a separate "No matching dishes" message.
- **Statistics screen:** total items, average price, and count per course (new button on Home).
- **Validation improvements:** duplicate dish names are rejected; maximum lengths for name and description.
- **Messages:** success banners for add, update and delete.

### Changed
- Add Dish screen became a combined Add/Edit form (`DishFormScreen`), titled "Add Dish" or "Edit Dish" and with a Save/Update button.
- Menu cards now include Edit and Delete buttons.
- Home screen now has three buttons (View Menu, Add New Dish, Menu Statistics).
- `Screen` type changed from `'AddDish'` to `'DishForm'` and `'Statistics'` was added.

## Refactoring (behaviour kept, structure improved)
- **Reusable components:** repeated button code replaced with `AppButton` (primary / secondary / edit / danger variants); repeated label + input + error code replaced with `FormField`; success/error banners moved into `MessageBanner`; stats displayed with `StatCard`.
- **Reusable functions:** `filterMenuItems`, `calculateStatistics`, `formatPrice` and `generateId` moved to `utils/menuHelpers.ts`; validation moved out of the screen into `validateDishForm` in `utils/validation.ts`.
- **Code organisation:** new `utils/` folder and `constants.ts`; the course list is defined once instead of in several files.
- **Types:** added `CourseFilter`, `MenuItemInput`, `FeedbackMessage` and `MenuStatistics`.
- **Naming:** clearer names such as `dishToEdit`, `startAddingDish`, `confirmDeleteDish`, `visibleItems`.
- **Single feedback state:** one `message` object (type + text) replaces the separate `successMessage` string.
