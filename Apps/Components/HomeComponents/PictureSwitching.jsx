import { View, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { widthPercentageToDP } from "react-native-responsive-screen";

export default function PictureSwitching({ images }) {
  const screenWidth = Dimensions.get("window").width - 20;

  const [selectedImage, setSelectedImage] = useState(images[0].image);
  return (
    <View>
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
          scrollEnabled={false}
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
                  height: widthPercentageToDP(15),
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
