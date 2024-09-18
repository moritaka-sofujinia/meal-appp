import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, Image, TouchableOpacity } from 'react-native';

const SettingsScreen = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => setIsDarkMode(previousState => !previousState);

  return (
    <View style={styles.screen}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={{ uri: 'https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-6/453032328_1534948864115589_3857018554599919698_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=nfE7Zd7dgnoQ7kNvgGNNQ5d&_nc_ht=scontent.fhan2-3.fna&_nc_gid=AasbO4NLQgUo7_w2AhISYl7&oh=00_AYC3vMVxsvhGrypCOOcX29byFn6Qb8KuGbeYX_PfyRC-lw&oe=66F0E80A' }} // Replace with profile image URL
          style={styles.profileImage}
        />
        <Text style={styles.accountName}>Moritaka Sofujinia</Text>
        <Text style={styles.accountType}>Loại tài khoản: VIP</Text>
      </View>

      {/* Settings Options */}
      <TouchableOpacity style={styles.settingItem}>
        <Text>Món ăn đã xem</Text>
      </TouchableOpacity>

      <View style={styles.settingItem}>
        <Text>Giao diện tối </Text>
        <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
      </View>

      <TouchableOpacity style={styles.settingItem}>
        <Text>Bộ phận hỗ trợ</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingItem}>
        <Text style={styles.logoutText}>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
    backgroundColor: '#dfe8f1',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  accountName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  accountType: {
    fontSize: 16,
    color: '#888',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20, // Equal height for all rows
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  logoutText: {
    color: 'red',
    fontWeight: 'bold',
  },
});

export default SettingsScreen;
