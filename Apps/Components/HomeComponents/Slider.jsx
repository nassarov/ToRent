import React from "react";
import { FlatList } from "react-native-gesture-handler";
import PostCard from "./PostCard";

export default function Slider({ cars, slideway, ownerData }) {
  const renderItem = ({ item, index }) => {
    return (
      <PostCard
        car={item.carDetails.carData}
        key={index}
        imageUrls={item.carDetails.imageUrls}
        ownerId={item.ownerId}
        ownerData={ownerData}
        horizontal={slideway}
        postId={item.carDetails.postId}
      />
    );
  };

  return (
    <FlatList
      data={cars}
      renderItem={renderItem}
      horizontal={slideway}
      numColumns={slideway ? "" : 2}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      scrollEnabled={slideway}
    />
  );
}
