import React from 'react';
import { FlatList, View, Text, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Country = [
  { id: '1', title: 'Miền Bắc', imageUrl: 'https://dulichviet.com.vn/images/bandidau/kham-pha-mien-bac-viet-nam-voi-tour-du-lich-he-2021.jpg' },
  { id: '2', title: 'Miền Trung', imageUrl: 'https://bcp.cdnchinhphu.vn/Uploaded/dangdinhnam/2015_10_12/hanh-trinh-den-voi-di-san-mien-trung.jpg' },
  { id: '3', title: 'Miền Nam', imageUrl: 'https://static.vinwonders.com/2022/11/Du-lich-mien-Nam-thang-1-2.jpg' },
  { id: '4', title: 'Món Á', imageUrl: 'https://imgs.vietnamnet.vn/Images/2016/01/16/11/20160116112138-15-diem-den-dep-ngo-ngang-o-chau-a.jpg' },
  { id: '5', title: 'Món Âu', imageUrl: 'https://static-images.vnncdn.net/files/publish/2022/5/19/dolphin-2-237.jpg'},
  { id: '6', title: 'Tráng Miệng', imageUrl: 'https://www.cukcuk.vn/wp-content/uploads/2022/12/kv4umGc.jpg' },
];

// Component chính để hiển thị danh sách các danh mục (quốc gia)
const CategoriesScreen = () => {
  const navigation = useNavigation(); 

  // Hàm render cho mỗi mục trong danh sách
  const renderCategoryItem = (itemData: { item: { id: string; title: string; imageUrl: string } }) => {
    return (
      <TouchableOpacity
        style={styles.gridItem}
        onPress={() => navigation.navigate('Meals', { categoryId: itemData.item.id })}
      >
        <View style={styles.imageContainer}>
          <Image source={{ uri: itemData.item.imageUrl }} style={styles.image} />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{itemData.item.title}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // Hàm mở liên kết Google Play
  const openPlayStore = () => {
    Linking.openURL('https://play.google.com/store/apps/details?id=xyz.be.customer&hl=vi');
  };

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity onPress={openPlayStore} style={styles.bannerContainer}>
        <Image
          source={{ uri: 'https://cdn2.fptshop.com.vn/unsafe/Uploads/images/tin-tuc/178765/Originals/befood-1.jpg' }} 
          style={styles.bannerImage}
        />
      </TouchableOpacity>
      <FlatList
        data={Country}
        renderItem={renderCategoryItem}
        numColumns={2}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  bannerImage: {
    width: '94%',
    height: 180,
    resizeMode: 'cover',
    borderRadius: 15,
  },
  gridItem: {
    flex: 1,
    margin: 12,
    height: 150,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#D1E9F6',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  image: {
    width: '100%',
    height: 110,
    resizeMode: 'cover',
  },
  titleContainer: {
    backgroundColor: '#D1E9F6', 
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#173B45',
    textAlign: 'center',
  },
});

export default CategoriesScreen;
