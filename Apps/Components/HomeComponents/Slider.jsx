import { View, Text } from "react-native";
import React from "react";
import { FlatList } from "react-native-gesture-handler";
import PostCard from "./PostCard";

export default function Slider({ cars }) {
  const renderItem = ({ item, index }) => {
    return <PostCard car={item} key={index}  />;
  };

  return (
    <FlatList
      data={cars}
      renderItem={renderItem}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
     
    />
  );
}
