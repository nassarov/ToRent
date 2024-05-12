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
  console.log(ownerData)
  const navigation = useNavigation();
  const customWidth = horizontal ? widthPercentageToDP(50) :widthPercentageToDP(45) ;
  const customHeight = horizontal ? widthPercentageToDP(50) :widthPercentageToDP(50) ;
  return (
    <TouchableOpacity
  activeOpacity={0.8}
  style={{
    width: customWidth,
    height: customHeight,
    borderRadius: 10,
    shadowColor: "#000", // Shadow color
    shadowOffset: {
      width: 0,
      height: 2, // Shadow direction: here it's set to be below the card
    },
    shadowOpacity: 0.30, // Shadow opacity
    shadowRadius: 4.65, // Shadow blur radius
    elevation: 8, // Elevation for Android
  }}
      className={`rounded-lg bg-white ${
        horizontal ? " ml-2 mt-1 mb-2" : "ml-[1px] mt-[1px]"
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
        style={{ width: '100%', height: '55%', borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
      />

      <View className='p-2 border-t-[1px] border-violet-400'>
        <Text className="font-bold text-violet-600 text-lg">{car.brand}</Text>
        <Text className="text-xs">{car.model}</Text>
      
      <Text className="text-violet-900">${car.price}/day</Text>
      </View>
    </TouchableOpacity>
  );
}


