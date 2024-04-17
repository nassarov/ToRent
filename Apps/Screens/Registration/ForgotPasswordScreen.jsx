import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import Constants from "expo-constants";
import { widthPercentageToDP } from "react-native-responsive-screen";

export default function ForgotPasswordScreen() {
  const navigation = useNavigation();
  const [credentials, setCredentials] = useState("");

  const validateInput = () => {};
  return (
    <View
      className="flex-1 items-center"
      style={{ paddingTop: Constants.statusBarHeight }}
    >
      <View className="w-full p-2">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back-outline" size={27} color={"#7F5AF0"} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: widthPercentageToDP(90),
        }}
      >
        <Text className="font-bold text-3xl">
          Forgot Password? <Icon name="lock-closed" size={22} color="#7F5AF0" />
        </Text>
        <Text className="mt-3 font-medium">
          Please input your email or phone number to recover your acount
        </Text>
        <Text className="mt-3">Email address OR Phone number </Text>
        <TextInput
          placeholder="Email/Phone Number"
          className="border-[1px] border-[#7F5AF0] p-3 my-[15px] rounded-lg"
          value={credentials}
          onChangeText={(value) => {
            setCredentials(value);
          }}
        />
        <View className="items-center">
          <TouchableOpacity
            onPress={() => navigation.navigate("recoveraccount")}
            className="bg-violet-600 p-3"
            style={{
              width: widthPercentageToDP(70),
              borderRadius: 8,
              marginHorizontal: "auto",
            }}
          >
            <Text className="font-bold text-white text-lg text-center">
              Recover Account
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
