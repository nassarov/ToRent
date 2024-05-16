import { View, Text, Image } from "react-native";
import React from "react";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function PostCard({
  car,
  imageUrls,
  ownerId,
  ownerData,
  horizontal,
  postId
}) {
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2, 
    },
    shadowOpacity: 0.30, 
    shadowRadius: 4.65, 
    elevation: 8,
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
      <View className='p-2'>
        <Text className="font-bold text-violet-600 text-lg">{car.model}</Text>
        <Text className="text-xs">{car.brand} ({car.year})</Text>
      <View className='p2 flex-row justify-between'>
        <View className='flex-row'>
      <Icon
          name="map-marker-radius"
          color="#777777"
          size={18}
        />
      <Text className="text-violet-900">{car.address.label}</Text>
      </View>
      <Text className="text-violet-900">${car.price}/day</Text>
      </View>
      </View>
    </TouchableOpacity>
  );
}


