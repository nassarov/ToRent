import { View, Text, Image, Dimensions } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";

export default function Carousel() {
  const screenWidth = Dimensions.get("window").width - 20;
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef();
  const carouselSlides = [
    { id: "1", image: require("./../../../assets/HomeSlider/s0.jpg") },
    { id: "2", image: require("./../../../assets/HomeSlider/s1.png") },
    { id: "3", image: require("./../../../assets/HomeSlider/s2.webp") },
    { id: "4", image: require("./../../../assets/HomeSlider/s3.jpg") },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const newIndex =
        activeIndex === carouselSlides.length - 1 ? 0 : activeIndex + 1;
      setActiveIndex(newIndex);
      flatListRef.current.scrollToIndex({
        index: newIndex,
        animated: true,
      });
    }, 2000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [activeIndex]); // Add activeIndex as a dependency

  const getItemLayout = (data, index) => ({
    length: screenWidth,
    offset: screenWidth * index,
    index: index,
  });
  const renderItem = ({ item, index }) => {
    return (
      <View key={index}>
        <Image
          source={item.image}
          style={{
            height: 200,
            width: screenWidth,
            marginHorizontal: 10,
            borderRadius: 10,
          }}
        />
      </View>
    );
  };
  const renderDotIdicatotrs = () => {
    return carouselSlides.map((dot, index) => {
      return (
        <View
          className={`${
            activeIndex === index ? "bg-violet-600" : "bg-gray-500"
          }  h-2 w-2 rounded-full mx-1`}
          key={index}
        ></View>
      );
    });
  };

  return (
    <View>
      <FlatList
        data={carouselSlides}
        renderItem={renderItem}
        horizontal={true}
        ref={flatListRef}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onScroll={(event) => {
          const scrollPosition = event.nativeEvent.contentOffset.x;
          const index = Math.floor(scrollPosition / screenWidth);
          setActiveIndex(index);
        }}
      />

      <View className="absolute flex-row bottom-2 left-0 right-0 items-center justify-center">
        {renderDotIdicatotrs()}
      </View>
    </View>
  );
}
