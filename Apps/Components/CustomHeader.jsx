import { View, Text, StatusBar, Platform } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import Constants from 'expo-constants';

export default function CustomHeader({ props }) {
  const navigation = useNavigation();

  return (
    <View style={{paddingTop:Constants.statusBarHeight}}>
      <View className="flex-row p-3 justify-between items-center ">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="close" size={24} color="black" />
        </TouchableOpacity>
        <Text className="font-bold text-3xl text-center">{props.title}</Text>
        <TouchableOpacity onPress={()=>navigation.push('login')}>
          
          <Text className="text-violet-600 text-lg">{props.nextPage}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
