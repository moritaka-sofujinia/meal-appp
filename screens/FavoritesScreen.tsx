// FavoritesScreen.tsx
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useFavorites } from './FavoritesContext';

const FavoritesScreen  = () => {
  const { favorites } = useFavorites();

  return (
    <View style={styles.screen}>
      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text>{item.title}</Text>
            </View>
          )}
        />
      ) : (
        <Text>No favorites yet.</Text>
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
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default FavoritesScreen;
