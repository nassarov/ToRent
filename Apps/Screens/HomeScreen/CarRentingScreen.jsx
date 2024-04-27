import { View, Text, Image, Dimensions } from "react-native";
import React, { useState } from "react";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import CustomHeader2 from "../../Components/CustomHeader2";

export default function CarRentingScreen() {
  const screenWidth = Dimensions.get("window").width - 20;
  const [selectedImage, setSelectedImage] = useState(
    require("./../../../assets/CarPosts/toyota.png")
  );
  const images = [
    {
      id: 1,
      image: require("./../../../assets/CarPosts/toyota.png"),
    },
    { id: 2, image: require("./../../../assets/CarPosts/toyota1.jpeg") },
    { id: 3, image: require("./../../../assets/CarPosts/toyota2.jpeg") },
    { id: 4, image: require("./../../../assets/CarPosts/toyota3.jpeg") },
    { id: 5, image: require("./../../../assets/CarPosts/toyota3.jpeg") },
  ];

  return (
    <View>
      <CustomHeader2 text={"CARCAR"} />
      <View className="items-center">
        <Image
          source={selectedImage}
          style={{
            objectFit: "cover",
            width: screenWidth,
            height: 200,
            borderRadius: 10,
          }}
        />
      </View>
      <View className="flex-row gap-x-1 rounded-xl  mt-2">
        <FlatList
          data={images}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => {
                setSelectedImage(item.image);
              }}
              key={index}
              className={`border-2 ${
                selectedImage == item.image
                  ? "border-violet-600"
                  : "border-gray-200"
              } rounded-lg ml-1`}
            >
              <Image
                source={item.image}
                style={{
                  width: widthPercentageToDP(86 / images.length),
                  height: widthPercentageToDP(20),
                }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}
          horizontal
        />
      </View>
    
    </View>
  );
}
