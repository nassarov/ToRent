import { View, Text, Image } from "react-native";
import React from "react";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

export default function PostCard({
  car,
  imageUrls,
  ownerId,
  ownerData,
  horizontal,
  postId
}) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{
        width: widthPercentageToDP(50),
        height: widthPercentageToDP(50),
      }}
      className={`bg-violet-300 rounded-lg p-2 ${
        horizontal ? "gap-y-1 ml-2 mt-1" : "ml-[1px] mt-[1px]"
      }  `}
      key={car.id}
      onPress={() =>
        navigation.navigate("CarRentingScreen", {
          images: imageUrls,
          carData: car,
          ownerId: ownerId,
          ownerData: ownerData,
          postId:postId
        })
      }
    >
      <Image
        source={{ uri: imageUrls[0] }}
        className=" object-cohtain rounded-lg "
        style={{ width: "90%", height: "50%" }}
      />

      <View>
        <Text className="font-bold text-violet-600 text-lg">{car.brand}</Text>
        <Text className="text-xs">{car.model}</Text>
      </View>
      <Text className="text-violet-900">${car.price}/day</Text>
    </TouchableOpacity>
  );
}
