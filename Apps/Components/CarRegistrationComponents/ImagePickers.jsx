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
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [5, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  return (
    <View>
      <Text>{whichImage}</Text>

      <TouchableOpacity
        style={{
          borderWidth: 2,
          borderColor: "#7F5AF0",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 10,
        }}
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
