import { View, Text } from "react-native";
import React from "react";
import { FlatList } from "react-native-gesture-handler";
import PostCard from "./PostCard";

export default function Slider({ cars, slideway }) {
  const renderItem = ({ item, index }) => {
    console.log(item);
    return (
      <PostCard
        car={item.carDetails.carData}
        key={index}
        imageUrls={item.carDetails.imageUrls}
      />
    );
  };

  return (
    <FlatList
      data={cars}
      renderItem={renderItem}
      horizontal={slideway}
      showsHorizontalScrollIndicator={false}
    />
  );
}
