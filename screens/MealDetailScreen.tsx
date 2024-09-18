import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { useFavorites } from '../screens/FavoritesContext';
import { NavigationProp } from '@react-navigation/native';

interface Meal {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
}

type RootStackParamList = {
  MealDetail: { mealId: string };
  Favorites: undefined;
};

type MealDetailRouteProp = RouteProp<RootStackParamList, 'MealDetail'>;
type NavigationPropType = NavigationProp<RootStackParamList>;

const MEALS: Record<string, Meal[]> = {
  '1': [
    { id: 'm1', title: 'Cá basa fillet chiên trứng', imageUrl: 'https://monngonmoingay.com/wp-content/smush-webp/2024/06/ca-basa-fillet-trung.jpg.webp', 
      description: 'Cá basa fillet chiên trứng bên trong mềm, ngọt, bên ngoài giòn nhẹ, không ngấm dầu. Màu vàng của lớp bột bên ngoài cá, màu xanh của hành ngò, màu đỏ của cà chua hấp dẫn. Món cá chiên còn thơm mùi ngò rí, hành lá ăn kèm, vị vừa ăn.'
    },
    { id: 'm2', title: 'Da heo chiên nước mắm', imageUrl: 'https://monngonmoingay.com/wp-content/smush-webp/2024/04/da-heo-chien-nuoc-mam-768x438.jpg.webp', 
      description: 'Da heo chiên nước mắm là món ăn được nhiều người yêu thích, đặc biệt là những người đam mê ẩm thực. Món ăn này có hương vị đậm đà, thơm ngon, vị ngọt thanh, độ cay nhẹ, phù hợp với nhiều đối tượng người dùng. Da heo chiên nước mắm thường được dùng làm món ăn chính hoặc món ăn phụ, kết hợp với nhiều món khác nhau để tạo ra những hương vị đa dạng và phong phú.'
    },
    { id: 'm3', title: 'Bún thang', imageUrl: 'https://monngonmoingay.com/wp-content/smush-webp/2016/01/bun-thang-768x438.jpg.webp', 
      description: 'Bún thang là món ăn được nhiều người yêu thích, đặc biệt là những người đam mê ẩm thực. Món ăn này có hương vị đậm đà, thơm ngon, vị ngọt thanh, độ cay nhẹ, phù hợp với nhiều đối tượng người dùng. Bún thang thường được dùng làm món ăn chính hoặc món ăn phụ, kết hợp với nhiều món khác nhau để tạo ra những hương vị đa dạng và phong phú.'
    },
    { id: 'm4', title: 'Gà hấp hành răm', imageUrl: 'https://monngonmoingay.com/wp-content/smush-webp/2017/11/ga-hap-hanh-ram-768x438.jpg.webp', 
      description: 'Gà hấp hành răm là món ăn được nhiều người yêu thích, đặc biệt là những người đam mê ẩm thực. Món ăn này có hương vị đậm đà, thơm ngon, vị ngọt thanh, độ cay nhẹ, phù hợp với nhiều đối tượng người dùng. Gà hấp hành răm thường được dùng làm món ăn chính hoặc món ăn phụ, kết hợp với nhiều món khác nhau để tạo ra những hương vị đa dạng và phong phú.'
    },
  ],
  '2': [
    { id: 'm5', title: 'Cánh gà nướng cay', imageUrl: 'https://monngonmoingay.com/wp-content/smush-webp/2017/11/canh-ga-nuong-cay-768x438.jpg.webp', 
      description: 'Chẳng cần ra quán mà vẫn có món cánh gà nướng cay ngon đúng điệu, bạn đã thử chưa? Cánh già tươm mỡ trên bề mặt, quyện xốt tương ớt đỏ tươi nhìn quyến rũ mê hoặc, thêm thơm mùi đặc trưng của hành tỏi đủ sức đốn tim mọi tín đồ khó tính nhất.'
    },
    { id: 'm6', title: 'Thịt heo kho tàu', imageUrl: 'https://monngonmoingay.com/wp-content/smush-webp/2023/01/heo-kho-tau-768x438.jpg.webp', 
      description: 'Miếng thịt kho mềm rục, vị ngọt sắc của thịt hầm nhừ. Trứng gà lòng đào, béo mịn, quyện đều vào nước kho sóng sánh, hương vị khó quên. Vị ngon truyền thống với công thức món kho cực dễ dàng từ Món Ngon Mỗi Ngày. Vào bếp làm ngay!'
    },
    { id: 'm7', title: 'Cá trắm kho riềng', imageUrl: 'https://monngonmoingay.com/wp-content/smush-webp/2022/11/ca-tram-kho-rieng-768x438.jpg.webp', 
      description: 'Cá trắm kho riềng với màu nâu sậm bắt mắt, vị cá ngọt đậm đà thơm mùi riềng. Vào bếp làm ngay món ăn hàng ngày bắt cơm này thôi nào!'
    },
    { id: 'm8', title: 'Bò lá lót chiên', imageUrl: 'https://monngonmoingay.com/wp-content/smush-webp/2022/10/bo-la-lot-chien-768x438.jpg.webp', 
      description: 'Chả lá lốt được bao quanh lớp bột chiên giòn tan, thịt bò mềm, mọng ngọt ngon, lớp lá lốt vương vít thơm nồng, ngon mê mẩn. Vị thân quen nhưng ngon không thể cưỡng lại! Món ngon cuối tuần Bò lá lốt chiên làm ngay luôn chứ bạn ơi?'
    },
  ],
  '3': [
    { id: 'm9', title: 'Vịt kho riềng ớt khô', imageUrl: 'https://monngonmoingay.com/wp-content/uploads/2015/12/vit-kho-rieng-ot-kho-8-768x438.jpg', 
      description: 'Tạo sắc thái mới cho món vịt kho với riềng và ớt khô! Riềng thơm, ớt khô cay dịu, không quá nồng, giúp món ăn hài hòa và có hương vị rất hấp dẫn. Thịt vịt có màu cánh gián đẹp mắt, chín mềm, chua cay hài hòa, nước kho sánh thơm thấm vị. Đặc biệt, công thức có kết hợp nước me cho món vịt kho chua nhẹ kích thích vị giác, lại giúp thịt vịt săn và giòn hơn. Vịt kho riềng ớt khô dùng với cơm trắng thì còn gì bằng!'
    },
    { id: 'm10', title: 'Canh tôm bồ ngót', imageUrl: 'https://monngonmoingay.com/wp-content/smush-webp/2015/08/canh-tom-bo-ngot-768x438.jpg.webp', 
      description: 'Món canh tôm bồ ngót dân dã, dễ làm, màu sắc đẹp và ngon miệng, vị ngọt của tôm hòa quyện vào vị ngọt của rau ngót và bắp tạo thành vị ngọt rất thanh mát, rất kích thích vị giác. Rau bồ ngót có vị ngọt thanh, khi nấu canh không bị nát, ăn canh bồ ngót giúp làm mát cơ thể thích hợp cho những ngày nắng nóng.'
    },
    { id: 'm11', title: 'Lẩu sườn khoai môn', imageUrl: 'https://monngonmoingay.com/wp-content/smush-webp/2024/06/lau-suon-khoai-mon.jpg.webp', 
      description: 'Món lẩu sườn khoai môn hấp dẫn với sự kết hợp vị ngọt của sườn non và vị dẻo bùi của khoai môn, thoảng mùi thơm đặc trưng khi ăn với chao, cay nhẹ của sa tế, sả. Cách nấu sao cho nước lẩu sanh sánh, sườn mềm, khoai môn chín mềm không bị quá nát. Món ăn có nhiều ích lợi cho sức khỏe với khoai môn cải thiện hệ tiêu hóa, giảm lượng đường trong máu, ngăn ngừa ung thư, bảo vệ da, đặc biệt là sườn non rất tốt để xây dựng khối cơ xương khi kết hợp với thực đơn dinh dưỡng.'
    },
    { id: 'm12', title: 'Vịt nấu cơm rượu', imageUrl: 'https://monngonmoingay.com/wp-content/smush-webp/2024/06/vit-nau-com-ruou-768x438.jpg.webp', 
      description: 'Món Vịt nấu cơm rượu nổi tiếng với hương vị đặc trưng từ cơm rượu mang nét đặc trưng truyền thống của Việt Nam. Khi thưởng thức món này, bạn có thể cảm nhận được vị ngọt tự nhiên của thịt vịt kết hợp với vị chua nhẹ, ngọt ngào của cơm rượu, tạo nên một hương vị hài hòa và độc đáo. Đây không chỉ là một trải nghiệm ẩm thực thú vị mà còn là cách thể hiện sự tinh tế trong việc kết hợp nguyên liệu và gia vị của người Việt. Mỗi miếng thịt vịt mềm mại, thấm đẫm hương vị cơm rượu, sẽ khiến bạn nhớ mãi không quên. Một cảm nhận khó có thể diễn tả hết bằng lời, mà chỉ có thể trải nghiệm trọn vẹn khi thực sự thử món ăn này. Vào bếp làm ngay món ăn ngon đón tết đoan ngọ thôi nào!'
    },
  ],
  '4': [
    { id: 'm13', title: 'Phở', imageUrl: 'https://statics.vinwonders.com/popular-Vietnamese-dishes-2_1683453326.jpg', 
      description: 'Phở là món ăn được nhiều người yêu thích, đặc biệt là những người đam mê ẩm thực. Món ăn này có hương vị đậm đà, thơm ngon, vị ngọt thanh, độ cay nhẹ, phù hợp với nhiều đối tượng người dùng. Phở thường được dùng làm món ăn chính hoặc món ăn phụ, kết hợp với nhiều món khác nhau để tạo ra những hương vị đa dạng và phong phú.'
    },
    { id: 'm14', title: 'Bún chả', imageUrl: 'https://statics.vinwonders.com/popular-Vietnamese-dishes-3_1683453317.jpg', 
      description: 'Bún chả là món ăn được nhiều người yêu thích, đặc biệt là những người đam mê ẩm thực. Món ăn này có hương vị đậm đà, thơm ngon, vị ngọt thanh, độ cay nhẹ, phù hợp với nhiều đối tượng người dùng. Bún chả thường được dùng làm món ăn chính hoặc món ăn phụ, kết hợp với nhiều món khác nhau để tạo ra những hương vị đa dạng và phong phú.'
    },
    { id: 'm15', title: 'Cơm tấm', imageUrl: 'https://statics.vinwonders.com/popular-Vietnamese-dishes-7_1683453276.jpg', 
      description: 'Cơm tấm là món ăn được nhiều người yêu thích, đặc biệt là những người đam mê ẩm thực. Món ăn này có hương vị đậm đà, thơm ngon, vị ngọt thanh, độ cay nhẹ, phù hợp với nhiều đối tượng người dùng. Cơm tấm thường được dùng làm món ăn chính hoặc món ăn phụ, kết hợp với nhiều món khác nhau để tạo ra những hương vị đa dạng và phong phú.'
    },
    { id: 'm16', title: 'Bánh mì', imageUrl: 'https://statics.vinwonders.com/popular-Vietnamese-dishes-9_1683453257.jpg', 
      description: 'Bánh mì là món ăn được nhiều người yêu thích, đặc biệt là những người đam mê ẩm thực. Món ăn này có hương vị đậm đà, thơm ngon, vị ngọt thanh, độ cay nhẹ, phù hợp với nhiều đối tượng người dùng. Bánh mì thường được dùng làm món ăn chính hoặc món ăn phụ, kết hợp với nhiều món khác nhau để tạo ra những hương vị đa dạng và phong phú.'
    },
  ],
  '5': [
    { id: 'm17', title: 'Spaghetti Carbonara', imageUrl: 'https://www.marthastewart.com/thmb/S9xVtnWSHldvxPHKOxEq0bALG-k=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/MSL-338686-spaghetti-carbonara-hero-3x2-69999-560b45d1dd9f4741b717176eff024839.jpeg', 
      description: 'Spaghetti Carbonara là món ăn được nhiều người yêu thích, đặc biệt là những người đam mê ẩm thực. Món ăn này có hương vị đậm đà, thơm ngon, vị ngọt thanh, độ cay nhẹ, phù hợp với nhiều đối tượng người dùng. Spaghetti Carbonara thường được dùng làm món ăn chính hoặc món ăn phụ, kết hợp với nhiều món khác nhau để tạo ra những hương vị đa dạng và phong phú.'
    },
    { id: 'm18', title: 'Paella', imageUrl: 'https://res.cloudinary.com/tienda-com/image/upload/f_auto/q_auto/c_fill,w_752/dpr_2.0/v1/recipes/mixed-seafood-paella', 
      description: 'Paella là món ăn được nhiều người yêu thích, đặc biệt là những người đam mê ẩm thực. Món ăn này có hương vị đậm đà, thơm ngon, vị ngọt thanh, độ cay nhẹ, phù hợp với nhiều đối tượng người dùng. Paella thường được dùng làm món ăn chính hoặc món ăn phụ, kết hợp với nhiều món khác nhau để tạo ra những hương vị đa dạng và phong phú.'
    },
    { id: 'm19', title: 'Coq au Vin', imageUrl: 'https://www.allrecipes.com/thmb/uiEvBi5acOOjnWmzDZyt8mjaPm0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/239230-chef-johns-coq-au-vin-MFS_358-3x2-1-997d63c3032a41b1be3559476fc0f3b0.jpg', 
      description: 'Coq au Vin là món ăn được nhiều người yêu thích, đặc biệt là những người đam mê ẩm thực. Món ăn này có hương vị đậm đà, thơm ngon, vị ngọt thanh, độ cay nhẹ, phù hợp với nhiều đối tượng người dùng. Coq au Vin thường được dùng làm món ăn chính hoặc món ăn phụ, kết hợp với nhiều món khác nhau để tạo ra những hương vị đa dạng và phong phú.'
    },
    { id: 'm20', title: 'Wiener Schnitzel', imageUrl: 'https://aem-prod-publish.viking.com/content/dam/vikingcruises/en/magnolia-images/mar_content/recipes/Wienerschnitzel_Potatoes_Alamy_RM_3840_16x9.jpg', 
      description: 'Wiener Schnitzel là món ăn được nhiều người yêu thích, đặc biệt là những người đam mê ẩm thực. Món ăn này có hương vị đậm đà, thơm ngon, vị ngọt thanh, độ cay nhẹ, phù hợp với nhiều đối tượng người dùng. Wiener Schnitzel thường được dùng làm món ăn chính hoặc món ăn phụ, kết hợp với nhiều món khác nhau để tạo ra những hương vị đa dạng và phong phú.'
    },
],
  '6': [
    { id: 'm21', title: 'Chè ba màu', imageUrl: 'https://anh.24h.com.vn/upload/2-2014/images/2014-06-10/1402363028-untitled.jpg', 
      description: 'Chè ba màu là món ăn được nhiều người yêu thích, đặc biệt là những người đam mê ẩm thực. Món ăn này có hương vị đậm đà, thơm ngon, vị ngọt thanh, độ cay nhẹ, phù hợp với nhiều đối tượng người dùng. Chè ba màu thường được dùng làm món ăn chính hoặc món ăn phụ, kết hợp với nhiều món khác nhau để tạo ra những hương vị đa dạng và phong phú.'
    },
    { id: 'm22', title: 'Bánh chuối nướng', imageUrl: 'https://daylambanh.edu.vn/wp-content/uploads/2019/04/890602090856167d6e437c240c8755b2.jpg', 
      description: 'Bánh chuối nướng là món ăn được nhiều người yêu thích, đặc biệt là những người đam mê ẩm thực. Món ăn này có hương vị đậm đà, thơm ngon, vị ngọt thanh, độ cay nhẹ, phù hợp với nhiều đối tượng người dùng. Bánh chuối nướng thường được dùng làm món ăn chính hoặc món ăn phụ, kết hợp với nhiều món khác nhau để tạo ra những hương vị đa dạng và phong phú.'
    },
    { id: 'm23', title: 'Chè trôi nước', imageUrl: 'https://afamilycdn.com/150157425591193600/2022/4/3/edit-cach-nau-che-troi-nuoc-tam-sac-ngon-mieng-dep-mat-avt-1200x676-1-16489239279302026256551.jpeg', 
      description: 'Chè trôi nước là món ăn được nhiều người yêu thích, đặc biệt là những người đam mê ẩm thực. Món ăn này có hương vị đậm đà, thơm ngon, vị ngọt thanh, độ cay nhẹ, phù hợp với nhiều đối tượng người dùng. Chè trôi nước thường được dùng làm món ăn chính hoặc món ăn phụ, kết hợp với nhiều món khác nhau để tạo ra những hương vị đa dạng và phong phú.'
    },
    { id: 'm24', title: 'Bánh flan', imageUrl: 'https://www.cukcuk.vn/wp-content/uploads/2022/12/kv4umGc.jpg', 
      description: 'Bánh flan là món ăn được nhiều người yêu thích, đặc biệt là những người đam mê ẩm thực. Món ăn này có hương vị đậm đà, thơm ngon, vị ngọt thanh, độ cay nhẹ, phù hợp với nhiều đối tượng người dùng. Bánh flan thường được dùng làm món ăn chính hoặc món ăn phụ, kết hợp với nhiều món khác nhau để tạo ra những hương vị đa dạng và phong phú.'
    },
  ],
};

const MealDetailScreen = () => {
  const route = useRoute<MealDetailRouteProp>();
  const navigation = useNavigation<NavigationPropType>();
  const { mealId } = route.params;
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  let meal: Meal | undefined;
  for (const key in MEALS) {
    const categoryMeals = MEALS[key];
    meal = categoryMeals.find((m) => m.id === mealId);
    if (meal) break;
  }

  const [isMealFavorite, setIsMealFavorite] = useState<boolean>(isFavorite(mealId));

  useEffect(() => {
    setIsMealFavorite(isFavorite(mealId));
  }, [mealId, isFavorite]);

  const toggleFavorite = () => {
    if (meal) {
      if (!isMealFavorite) {
        addFavorite(meal);
        console.log('Meal added to favorites:', meal);
        alert('Món ăn được thêm vào mục yêu thích');
      } else {
        removeFavorite(meal.id);
        console.log('Meal removed from favorites:', meal);
        alert('Món ăn được xóa khỏi mục yêu thích');
      }
      setIsMealFavorite((prevState) => !prevState);
      //navigation.navigate('Favorites');
    }
  };

  return (
    <View style={styles.screen}>
      {meal ? (
        <>
          <Image source={{ uri: meal.imageUrl }} style={styles.image} />
          <View style={styles.titleContainer}>
          <Text style={styles.title}>{meal.title}</Text>
          <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
            <Icon
              name={isMealFavorite ? 'star' : 'star-outline'}
              size={30}
              color={isMealFavorite ? 'yellow' : 'black'}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.description}>{meal.description}</Text>
        </>
      ) : (
        <Text style={styles.notFound}>Meal not found</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
  titleContainer: {
    flexDirection: 'row', // Đặt title và nút ngôi sao cùng hàng
    justifyContent: 'space-between', // Căn đều hai bên
    alignItems: 'center', // Căn giữa theo trục dọc
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  favoriteButton: {
    marginLeft: 10, // Khoảng cách giữa title và ngôi sao (nếu cần)
  },
  description: {
    fontSize: 16,
    color: '#333',
    marginVertical: 10,
  },
  notFound: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});


export default MealDetailScreen;
