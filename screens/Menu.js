import React from 'react';
import { View, Text, Button } from 'react-native';

function MenuScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Đây là trang Menu</Text>
      <Button
        title="Xem chi tiết món ăn"
        onPress={() => navigation.navigate('FoodDetails', { dish: { name: 'Món ăn mẫu' } })}
      />
    </View>
  );
}

export default MenuScreen;
