import { View, Text, StatusBar, Platform } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import Constants from 'expo-constants';
import { MaterialIcons } from '@expo/vector-icons';
export default function CustomHeader3({text}) {
 const navigation = useNavigation();
return (
    <View style={{paddingTop:Constants.statusBarHeight}}>
      <View className="flex-row p-3  items-center ">
        <Text className='text-xl ml-2 font-bold'>{text}</Text>
      </View>
    </View>
  );
}