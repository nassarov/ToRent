import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import Constants from "expo-constants";
import { widthPercentageToDP } from "react-native-responsive-screen";

export default function ForgotPasswordScreen() {
  const navigation = useNavigation();
  return (
    <View
      className="flex-1 items-center"
      style={{ paddingTop: Constants.statusBarHeight }}
    >
      <View
        style={{
          width: widthPercentageToDP(80),
        }}
      >
        <Text className="font-bold text-3xl">
          Forgot Password? <Icon name="lock-closed" size={22} color="#7F5AF0" />
        </Text>
        <Text>
          Please input your email or phone number to recover your acount
        </Text>
        <Text>Email address OR Phone number </Text>
        <TextInput placeholder="Email/Phone number"></TextInput>
        <TouchableOpacity onPress={() => navigation.navigate("recoveraccount")}>
          <Text>Recover Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
