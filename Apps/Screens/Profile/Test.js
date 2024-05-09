import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Constants from "expo-constants";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from '@react-navigation/native';

import DPI from '../../../assets/Profile/DPI.jpg';

export default function ProfileScreen({ route }) {
  const { userData } = route.params;
  const navigation = useNavigation();
  
  return userData.role === "0" || userData.role === "1" ? (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('ProfileSettings')} style={styles.imageContainer}>
          <Image source={DPI} style={styles.profileImage} />
        </TouchableOpacity>
        <Text style={styles.userName}>{userData.name}</Text>
      </View>
    </ScrollView>
  ) : (
    <View style={styles.container}>
      <Text style={styles.text}>Only Logged In users can see their profile page</Text>
      <TouchableOpacity>
        <Text style={styles.text}>Log In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 20,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  profileContainer: {
    flexDirection: "row", 
    alignItems: "center", 
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 20, 
    bottom: 10,
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 75,
    overflow: "hidden",
    marginBottom: 20,
    top: 20,
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  text: {
    fontSize: 16,
  },
});
