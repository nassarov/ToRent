import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import AppIntroSlider from "react-native-app-intro-slider";
export default function OnBoardScreen() {
  const [showHomePage, setShowHomePage] = useState(false);

  const labelButton = (label) => (
    <View className="bg-purple-700 p-3 rounded-lg " style={{width: wp(20)}}>
      <Text className="text-white text-center font-medium">{label}</Text>
    </View>
  );
  
  const skipButton = (label) => (
    <View className='mt-2 ml-3'>
      <Text className="text-purple-700 text-lg font-light">{label}</Text>
    </View>
  );
  const slides = [
    {
      id: 1,
      title: "Discover best cars in your city",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      image: require("./../../assets/OnBoard/s1.jpg"),
    },
    {
      id: 2,
      title: "Choose the car that you like",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      image: require("./../../assets/OnBoard/s2.jpg"),
    },
    {
      id: 3,
      title: "Rent the car whenever you want",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      image: require("./../../assets/OnBoard/s3.jpg"),
    },
  ];
  if (!showHomePage) {
    return (
      <AppIntroSlider
        data={slides}
        renderItem={({ item }) => {
          return (
            <View>
              <Image
                source={item.image}
                className={""}
                style={{ width: wp(100), height: hp(50) }}
              />
              <View className={"p-5"}>
                <Text className="font-bold text-black text-4xl">
                  {item.title}
                </Text>
                <Text className="font-bold text-black text-lg mt-8">
                  {item.description}
                </Text>
              </View>
            </View>
          );
        }}
        activeDotStyle={{ backgroundColor: "purple", width: wp(8), }}
        renderNextButton={() => labelButton("Next")}
        showSkipButton
        renderSkipButton={() => skipButton("Skip")}
        renderDoneButton={() => labelButton("Done")}
        onDone={() => {
          setShowHomePage(true);
        }}
      />
    );
  }

  return (
    <View className="flex-1 justify-center items-center">
     <Text>Hello</Text>
    </View>
  );
}
