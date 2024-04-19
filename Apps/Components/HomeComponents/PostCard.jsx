import { View, Text, Image } from "react-native";
import React from "react";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";

export default function PostCard({ car }) {
  return (
    <View
      style={{
        width: widthPercentageToDP(50),
        height: widthPercentageToDP(50),
      }}
      className="bg-violet-300 rounded-lg  gap-y-1 p-2 ml-2 mt-1"
      key={car.id}
    >
      <Image
        source={car.image}
        className=" object-cohtain rounded-lg "
        style={{ width: "90%", height: "50%" }}
      
      />
      <View>
        <Text className="font-bold text-violet-600 text-lg">{car.brand}</Text>
        <Text className="text-xs">{car.model}</Text>
      </View>
      <Text className="text-violet-900">${car.price}/day</Text>
    </View>
  );
}
