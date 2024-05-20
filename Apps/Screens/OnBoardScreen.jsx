import React, { useState, useEffect } from "react";
import { StatusBar, View, Text, Image } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import AppIntroSlider from "react-native-app-intro-slider";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage

export default function OnBoardScreen({ navigation }) {
  const [showHomePage, setShowHomePage] = useState(false);
  StatusBar.setBarStyle("dark-content", true);

  // Check if the user has completed onboarding
  useEffect(() => {
    AsyncStorage.getItem("hasCompletedOnboarding").then((value) => {
      if (value === "true") {
        // User has already completed onboarding, navigate to registration or main content
        setShowHomePage(true);
        navigation.replace("Registration");
      }
    });
  }, []);

  // Function to handle completion of onboarding
  const handleCompleteOnboarding = async () => {
    try {
      // Set flag indicating that onboarding has been completed
      await AsyncStorage.setItem("hasCompletedOnboarding", "true");
      // Navigate to registration or main content
      navigation.replace("Registration");
    } catch (error) {
      console.error("Error setting AsyncStorage:", error);
    }
  };

  const labelButton = (label) => (
    <View className="bg-violet-600 p-3 rounded-lg " style={{ width: wp(20) }}>
      <Text className="text-white text-center font-medium">{label}</Text>
    </View>
  );

  const skipButton = (label) => (
    <View className="mt-2 ml-3">
      <Text className="text-violet-600 text-lg font-light">{label}</Text>
    </View>
  );

  const slides = [
    {
      id: 1,
      title: "Explore Top Car Rentals in Lebanon",
      description:
        "Discover the best car rental options in your city. From luxury to economy, find the perfect ride for your needs with just a few taps.",
      image: require("./../../assets/OnBoard/s1.webp"),
    },
    {
      id: 2,
      title: "Select Your Ideal Car",
      description:
        "Browse through a wide variety of cars and choose the one that suits your style and budget.",
      image: require("./../../assets/OnBoard/s2.jpg"),
    },
    {
      id: 3,
      title: "Rent Easily Anytime",
      description:
        "Rent a car quickly and conveniently whenever you need it. Flexible booking options and instant confirmations ensure a hassle-free experience.",
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
              <View className={"p-5"} style={{ height: hp(50) }}>
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
        activeDotStyle={{ backgroundColor: "#7F5AF0", width: wp(8) }}
        renderNextButton={() => labelButton("Next")}
        showSkipButton
        renderSkipButton={() => skipButton("Skip")}
        renderDoneButton={() => labelButton("Done")}
        onDone={handleCompleteOnboarding} // Update to call handleCompleteOnboarding
      />
    );
  }
}

