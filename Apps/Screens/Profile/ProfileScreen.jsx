import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import CustomHeader2 from "../../Components/CustomHeader2";
import Constants from "expo-constants";

export default function ProfileScreen({ route }) {
  const { userData } = route.params;
  console.log(userData);
  return userData.role === "0" || userData.role === "1" ? (
    <View style={{ paddingTop: Constants.statusBarHeight }}>
      <Text> {userData.name}</Text>
    </View>
  ) : (
    <View>
      <Text>Only Logged In users can see their profile page</Text>
      <TouchableOpacity>
        <Text>LogIn</Text>
      </TouchableOpacity>
    </View>
  );
}
