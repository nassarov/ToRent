import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";

export default function ImagePickers({ image, setImage, whichImage }) {
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Only allow images
      allowsEditing: true,
      aspect: [16, 12],
      quality: 0.5,
    });
  
    if (!result.cancelled) {
      setImage(result.assets[0].uri);
    }
  };
  return (
    <View>
      <Text className="text-violet-600 text-lg">{whichImage}</Text>

      <TouchableOpacity
        style={[
          {
            borderWidth: 2,
            borderColor: "#7F5AF0",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
          },
          image
            ? ""
            : {
                width: widthPercentageToDP(90),
                height: heightPercentageToDP(25),
              },
        ]}
        onPress={() => {
          pickImage();
        }}
      >
        {image ? (
          <Image
            source={{ uri: image }}
            style={{
              width: widthPercentageToDP(90),
              height: heightPercentageToDP(25),
              resizeMode: "cover",
              borderRadius: 8,
            }}
          />
        ) : (
          <Text className="text-slate-500 border-2 border-slate-500 border-dashed p-1 ">
            Click To Add Photo
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
