import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import MenuScreen from '../screens/Menu';
import FoodDetailsScreen from '../screens/FoodDetailsScreen';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Menu" component={MenuScreen} options={{ title: 'Thực đơn' }} />
        <Stack.Screen 
          name="FoodDetails" 
          component={FoodDetailsScreen} 
          options={({ route }) => ({ title: route.params?.dish?.name || 'Chi tiết món ăn' })} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
