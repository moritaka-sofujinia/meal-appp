import React from 'react';
import { View, Text } from 'react-native';

function FoodDetailsScreen({ route }) {
  const { dish } = route.params || {};

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Chi tiết món ăn: {dish?.name || 'Không có tên'}</Text>
    </View>
  );
}

export default FoodDetailsScreen;