import { View, Text, Image, TouchableOpacity, StatusBar } from "react-native";
import React, { useState } from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import AppIntroSlider from "react-native-app-intro-slider";
import Registration from "../Navigations/Registration";


export default function OnBoardScreen({navigation}) {
  const [showHomePage, setShowHomePage] = useState(false);
  StatusBar.setBarStyle('dark-content', true);
  StatusBar.setTranslucent(true);
  StatusBar.setBackgroundColor('transparent');
  
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
      image: require("./../../assets/OnBoard/s1.webp"),
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
              <View className={"p-5"} style={{height: hp(50)}}>
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
        activeDotStyle={{ backgroundColor: "#7F5AF0", width: wp(8), }}
        renderNextButton={() => labelButton("Next")}
        showSkipButton
        renderSkipButton={() => skipButton("Skip")}
        renderDoneButton={() => labelButton("Done")}
        onDone={() => {
          setShowHomePage(true);
          navigation.replace("Registration"); 
        }}
      />
    );
    
  }
 
    
}
