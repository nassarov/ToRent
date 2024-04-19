import { View, Text, Image, Dimensions } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";

export default function CarRentingScreen() {
  const screenWidth = Dimensions.get("window").width - 20;
  const [selectedImage, setSelectedImage] = useState(
    require("./../../../assets/CarPosts/toyota.png")
  );

  return (
    <View >
        <View></View>
      <View >
        <Image source={selectedImage} style={{ objectFit: "cover",width:screenWidth,height:200,borderRadius:10,marginTop:40 }}  />
      </View>
      <View className="flex-row">
        <TouchableOpacity
          onPress={() => {
            setSelectedImage(require("./../../../assets/CarPosts/toyota.png"));
          }}
        >
          <Image
            source={require("./../../../assets/CarPosts/toyota.png")}
            style={{
              width: widthPercentageToDP(10),
              height: widthPercentageToDP(10),
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelectedImage(
              require("./../../../assets/CarPosts/toyota1.jpeg")
            );
          }}
        >
          <Image
            source={require("./../../../assets/CarPosts/toyota1.jpeg")}
            style={{
              width: widthPercentageToDP(10),
              height: widthPercentageToDP(10),
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelectedImage(
              require("./../../../assets/CarPosts/toyota2.jpeg")
            );
          }}
        >
          <Image
            source={require("./../../../assets/CarPosts/toyota2.jpeg")}
            style={{
              width: widthPercentageToDP(10),
              height: widthPercentageToDP(10),
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelectedImage(
              require("./../../../assets/CarPosts/toyota3.jpeg")
            );
          }}
        >
          <Image
            source={require("./../../../assets/CarPosts/toyota3.jpeg")}
            style={{
              width: widthPercentageToDP(10),
              height: widthPercentageToDP(10),
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
