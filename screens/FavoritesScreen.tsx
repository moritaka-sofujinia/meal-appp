import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useFavorites } from './FavoritesContext';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import biểu tượng

const FavoritesScreen = () => {
  const { favorites, removeFavorite } = useFavorites(); // Giả sử hàm removeFavorite đã được định nghĩa
  const navigation = useNavigation();

  const handlePress = (meal) => {
    navigation.navigate('MealDetail', { mealId: meal.id });
  };

  const handleRemoveFavorite = (mealId) => {
    // Gọi hàm để xóa món ăn khỏi danh sách Yêu Thích
    removeFavorite(mealId);
  };

  return (
    <View style={styles.screen}>
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <TouchableOpacity onPress={() => handlePress(item)} style={styles.titleContainer}>
                <Text style={styles.title}>{item.title}</Text>
              </TouchableOpacity>
              {/* Thêm biểu tượng Thùng rác */}
              <TouchableOpacity onPress={() => handleRemoveFavorite(item.id)}>
                <Icon name="delete" size={24} color="#000000" />
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <Text>Danh sách món ăn yêu thích trống.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
    backgroundColor: '#dfe8f1',
  },
  item: {
    flexDirection: 'row', // Đặt các thành phần theo hàng ngang
    justifyContent: 'space-between', // Khoảng cách giữa tiêu đề và biểu tượng thùng rác
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  titleContainer: {
    flex: 1, // Để tiêu đề chiếm không gian còn lại
  },
  title: {
    fontSize: 16,
  },
});

export default FavoritesScreen;
