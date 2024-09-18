import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Linking } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ScrollView } from 'react-native-gesture-handler';

type Category = {
  id: string;
  title: string;
  imageUrl: string;
};

type Meal = {
  id: string;
  title: string;
  imageUrl: string;
};

type RootStackParamList = {
  MealsScreen: { categoryId: string };
  MealDetail: { mealId: string };
};

const CATEGORIES: Category[] = [
  { id: '1', title: 'Miền Bắc', imageUrl: '' },
  { id: '2', title: 'Miền Trung', imageUrl: '' },
  { id: '3', title: 'Miền Nam', imageUrl: '' },
  { id: '4', title: 'Món Á', imageUrl: '' },
  { id: '5', title: 'Món Âu', imageUrl: '' },
  { id: '6', title: 'Tráng Miệng', imageUrl: '' },  
];

const MEALS: Record<string, Meal[]> = {
  '1': [
    { id: 'm1', title: 'Cá basa fillet chiên trứng', imageUrl: 'https://monngonmoingay.com/wp-content/smush-webp/2024/06/ca-basa-fillet-trung.jpg.webp' },
    { id: 'm2', title: 'Da heo chiên nước mắm', imageUrl: 'https://monngonmoingay.com/wp-content/smush-webp/2024/04/da-heo-chien-nuoc-mam-768x438.jpg.webp' },
    { id: 'm3', title: 'Bún thang', imageUrl: 'https://monngonmoingay.com/wp-content/smush-webp/2016/01/bun-thang-768x438.jpg.webp' },
    { id: 'm4', title: 'Gà hấp hành răm', imageUrl: 'https://monngonmoingay.com/wp-content/smush-webp/2017/11/ga-hap-hanh-ram-768x438.jpg.webp' },
  ],
  '2': [
    { id: 'm5', title: 'Cánh gà nướng cay', imageUrl: 'https://monngonmoingay.com/wp-content/smush-webp/2017/11/canh-ga-nuong-cay-768x438.jpg.webp'},
    { id: 'm6', title: 'Thịt heo kho tàu', imageUrl: 'https://monngonmoingay.com/wp-content/smush-webp/2023/01/heo-kho-tau-768x438.jpg.webp' },
    { id: 'm7', title: 'Cá trắm kho riềng', imageUrl: 'https://monngonmoingay.com/wp-content/smush-webp/2022/11/ca-tram-kho-rieng-768x438.jpg.webp' },
    { id: 'm8', title: 'Bò lá lót chiên', imageUrl: 'https://monngonmoingay.com/wp-content/smush-webp/2022/10/bo-la-lot-chien-768x438.jpg.webp' },
  ],
  '3': [
    { id: 'm9', title: 'Vịt kho riềng ớt khô', imageUrl: 'https://monngonmoingay.com/wp-content/uploads/2015/12/vit-kho-rieng-ot-kho-8-768x438.jpg' },
    { id: 'm10', title: 'Canh tôm bồ ngót', imageUrl: 'https://monngonmoingay.com/wp-content/smush-webp/2015/08/canh-tom-bo-ngot-768x438.jpg.webp' },
    { id: 'm11', title: 'Lẩu sườn khoai môn', imageUrl: 'https://monngonmoingay.com/wp-content/smush-webp/2024/06/lau-suon-khoai-mon.jpg.webp' },
    { id: 'm12', title: 'Vịt nấu cơm rượu', imageUrl: 'https://monngonmoingay.com/wp-content/smush-webp/2024/06/vit-nau-com-ruou-768x438.jpg.webp' },
  ],
  '4': [
    { id: 'm21', title: 'Phở', imageUrl: 'https://statics.vinwonders.com/popular-Vietnamese-dishes-2_1683453326.jpg' },
    { id: 'm22', title: 'Bún chả', imageUrl: 'https://statics.vinwonders.com/popular-Vietnamese-dishes-3_1683453317.jpg' },
    { id: 'm23', title: 'Cơm tấm', imageUrl: 'https://statics.vinwonders.com/popular-Vietnamese-dishes-7_1683453276.jpg' },
    { id: 'm24', title: 'Bánh mì', imageUrl: 'https://statics.vinwonders.com/popular-Vietnamese-dishes-9_1683453257.jpg' },
  ],
  '5': [
    { id: 'm13', title: 'Spaghetti Carbonara', imageUrl: 'https://www.marthastewart.com/thmb/S9xVtnWSHldvxPHKOxEq0bALG-k=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/MSL-338686-spaghetti-carbonara-hero-3x2-69999-560b45d1dd9f4741b717176eff024839.jpeg' },
    { id: 'm14', title: 'Paella', imageUrl: 'https://res.cloudinary.com/tienda-com/image/upload/f_auto/q_auto/c_fill,w_752/dpr_2.0/v1/recipes/mixed-seafood-paella' },
    { id: 'm15', title: 'Coq au Vin', imageUrl: 'https://www.allrecipes.com/thmb/uiEvBi5acOOjnWmzDZyt8mjaPm0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/239230-chef-johns-coq-au-vin-MFS_358-3x2-1-997d63c3032a41b1be3559476fc0f3b0.jpg' },
    { id: 'm16', title: 'Wiener Schnitzel', imageUrl: 'https://aem-prod-publish.viking.com/content/dam/vikingcruises/en/magnolia-images/mar_content/recipes/Wienerschnitzel_Potatoes_Alamy_RM_3840_16x9.jpg' },
  ],
  '6': [
    { id: 'm21', title: 'Chè Ba Màu', imageUrl: 'https://anh.24h.com.vn/upload/2-2014/images/2014-06-10/1402363028-untitled.jpg' },
    { id: 'm22', title: 'Bánh Chuối Nướng', imageUrl: 'https://daylambanh.edu.vn/wp-content/uploads/2019/04/890602090856167d6e437c240c8755b2.jpg' },
    { id: 'm23', title: 'Chè Trôi Nước', imageUrl: 'https://afamilycdn.com/150157425591193600/2022/4/3/edit-cach-nau-che-troi-nuoc-tam-sac-ngon-mieng-dep-mat-avt-1200x676-1-16489239279302026256551.jpeg' },
    { id: 'm24', title: 'Bánh Flan', imageUrl: 'https://www.cukcuk.vn/wp-content/uploads/2022/12/kv4umGc.jpg' },
],
};
const openPlayStore = () => {
  Linking.openURL('https://play.google.com/store/apps/details?id=com.mservice.momotransfer&hl=vi');
};

const MealsScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'MealsScreen'>>();
const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const { categoryId } = route.params;

  const selectedCategory = CATEGORIES.find(cat => cat.id === categoryId);

  const meals = MEALS[categoryId] || [];

  const renderMealItem = ({ item }: { item: Meal }) => {
    return (
      <TouchableOpacity
        style={styles.mealItem}
        onPress={() => navigation.navigate('MealDetail', { mealId: item.id })}
      >
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
        <Text style={styles.title}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView>
      <View style={styles.screen}>
        <TouchableOpacity onPress={openPlayStore} style={styles.bannerContainer}>
          <Image
            source={{ uri: 'https://homepage.momocdn.net/blogscontents/momo-upload-api-211021092849-637704053296372051.jpg' }} 
            style={styles.bannerImage}
          />
        </TouchableOpacity>
        <Text style={styles.categoryTitle}>{selectedCategory?.title}</Text>
        
        {meals.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.mealItem}
            onPress={() => navigation.navigate('MealDetail', { mealId: item.id })}
          >
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  bannerImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
    borderRadius: 15,
  },
  screen: {
    flex: 1,
    padding: 25,
  },
  categoryInfo: {
    fontSize: 16,
    color: '#888',
    marginBottom: 5,
  },
  categoryTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  mealItem: {
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 200,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default MealsScreen;
