import React from "react";
import { View, Text, StatusBar, TouchableOpacity } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Ionicons, EvilIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import  PhoneInput  from 'react-native-phone-number-input';

export default function SignUpForToRent() {
  const navigation = useNavigation();

  const onSubmitMethod = (phoneNumber) => {
    console.log(phoneNumber);
    navigation.navigate("signup",{value});
  };

  return (
    <View className="items-center ">
      <StatusBar />
      <View style={{ width: wp(80) }}>
        <Text className="font-bold text-3xl mt-2 text-center">
          Sign Up For ToRent
        </Text>
        <Text>
          Create a profile, Drive easy, Rent your favorite car and more
        </Text>
        <Text className="font-bold text-lg">Or</Text>
        <Text>
          Create a profile, Show your cars, Grow your business and more
        </Text>
        <PhoneInput
          defaultCode="LEB"
          layout="first"
          containerStyle={{ backgroundColor: 'white', borderRadius: 10 }}
          textInputProps={{ autoFocus: true }}
          onChangeText={(text) => onSubmitMethod(text)}
        />
        <TouchableOpacity
          onPress={() => {}}
          className="bg-purple-700 rounded-lg p-3 items-center justify-center mt-3 flex-row "
        >
          <Ionicons name="person-outline" size={17} color="white" />
          <Text className="text-white font-bold text-base ml-1">
            Use your phone number
          </Text>
        </TouchableOpacity>
        <Text className="text-center text-xl font-bold my-4">Or</Text>
        <TouchableOpacity
          onPress={() => {}}
          className="bg-purple-700 rounded-lg p-3 items-center justify-center mt-3 flex-row"
        >
          <EvilIcons name="arrow-right" size={24} color="white" />
          <Text className="text-white font-bold text-base ml-1">
            Continue as a guest
          </Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row mt-3">
        <Text>Already Have An Account?</Text>
        <TouchableOpacity>
          <Text className="text-purple-700"> Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
