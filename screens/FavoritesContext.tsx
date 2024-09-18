// Import các hook và type cần thiết từ React
import React, { createContext, useState, ReactNode, useContext } from 'react';

// Định nghĩa interface cho đối tượng Meal
interface Meal {
  id: string;
  title: string;
  imageUrl: string;
}

// Định nghĩa interface cho FavoritesContext
interface FavoritesContextType {
  favorites: Meal[];
  addFavorite: (meal: Meal) => void;
  removeFavorite: (mealId: string) => void;
  isFavorite: (mealId: string) => boolean;
}

// Tạo context với giá trị mặc định
const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
  isFavorite: () => false,
});

// Hook tùy chỉnh để sử dụng FavoritesContext
export const useFavorites = () => useContext(FavoritesContext);

// Component Provider cho FavoritesContext
export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // State để lưu trữ danh sách các món ăn yêu thích
  const [favorites, setFavorites] = useState<Meal[]>([]);

  // Hàm để thêm một món ăn vào danh sách yêu thích
  const addFavorite = (meal: Meal) => {
    setFavorites((currentFavorites) => [...currentFavorites, meal]);
  };

  // Hàm để xóa một món ăn khỏi danh sách yêu thích
  const removeFavorite = (id: string) => {
    setFavorites((prevFavorites) => prevFavorites.filter((meal) => meal.id !== id));
  };

  // Hàm để kiểm tra xem một món ăn có trong danh sách yêu thích hay không
  const isFavorite = (mealId: string) => {
    return favorites.some((meal) => meal.id === mealId);
  };

  // Render Provider với value chứa state và các hàm xử lý
  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};