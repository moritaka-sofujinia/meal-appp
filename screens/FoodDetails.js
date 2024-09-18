import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const CategoryDetailsScreen = ({ route }) => {
  const { category } = route.params;
  
  // Giả sử đây là dữ liệu chi tiết món ăn
  const recipe = {
    name: 'Phở bò',
    image: require('../assets/pho-bo.jpg'),
    difficulty: 'Trung bình',
    estimatedTime: '2 giờ',
    ingredients: [
      '500g thịt bò',
      '200g bánh phở',
      '2 lít nước dùng xương bò',
      'Hành, gừng, gia vị...',
    ],
    instructions: [
      'Chuẩn bị nước dùng từ xương bò và các gia vị',
      'Thái mỏng thịt bò',
      'Trụng bánh phở',
      'Xếp thịt bò lên trên bánh phở',
      'Chan nước dùng nóng vào tô',
      'Thêm các loại rau ăn kèm và gia vị tùy thích',
    ],
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={recipe.image} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{recipe.name}</Text>
        <Text style={styles.info}>Độ khó: {recipe.difficulty}</Text>
        <Text style={styles.info}>Thời gian ước tính: {recipe.estimatedTime}</Text>
        
        <Text style={styles.sectionTitle}>Nguyên liệu:</Text>
        {recipe.ingredients.map((ingredient, index) => (
          <Text key={index} style={styles.listItem}>• {ingredient}</Text>
        ))}
        
        <Text style={styles.sectionTitle}>Cách nấu:</Text>
        {recipe.instructions.map((step, index) => (
          <Text key={index} style={styles.listItem}>{index + 1}. {step}</Text>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  infoContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  info: {
    fontSize: 16,
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  listItem: {
    fontSize: 16,
    marginBottom: 4,
    paddingLeft: 8,
  },
});

export default CategoryDetailsScreen;
