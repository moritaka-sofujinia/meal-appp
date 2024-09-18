import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import CategoriesScreen from '../../screens/CategoriesScreen';
import MealsScreen from '../../screens/MealsScreen';
import MealDetailScreen from '../../screens/MealDetailScreen';
import FavoritesScreen from '../../screens/FavoritesScreen';
import SettingsScreen from '../../screens/SettingsScreen';
import { FavoritesProvider } from '@/screens/FavoritesContext';

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

const MealsNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Categories">
      <Stack.Screen name="Ẩm Thực Việt" component={CategoriesScreen} />
      <Stack.Screen name="Meals" component={MealsScreen} />
      <Stack.Screen name="MealDetail" component={MealDetailScreen} />
      <Stack.Screen name="Favorites" component={FavoritesScreen} />
    </Stack.Navigator>
  );
};
const TabNavigator = () => {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: string = '';
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Favorites') {
            iconName = 'star';
          } else if (route.name === 'Settings') {
            iconName = 'settings-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen
        name="Home"
        component={MealsNavigator}
        options={{ title: 'Home', headerShown: false }}
      />
      <Tabs.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{ title: 'Favorites' }}
      />
      <Tabs.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: 'Settings' }}
      />
    </Tabs.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <FavoritesProvider>
        <TabNavigator />
      </FavoritesProvider>
    </NavigationContainer>
  );
}
