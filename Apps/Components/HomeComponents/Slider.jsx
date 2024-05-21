import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { FlatList } from "react-native-gesture-handler";
import PostCard from "./PostCard";
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

export default function Slider({ cars, slideway }) {
  const [ownersData, setOwnersData] = useState({});

  useEffect(() => {
    const db = getFirestore();

    // Subscribe to changes in the owners collection
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      const newOwnersData = {};
      snapshot.forEach((doc) => {
        const data = doc.data();
        newOwnersData[data.id] = {
          email: data.email,
          name: data.name,
          profileImage: data.profileImage,
        };
      });
      setOwnersData(newOwnersData);
    });

    // Clean up subscription when component unmounts
    return () => unsubscribe();
  }, []); // Run once when component mounts

  const renderItem = ({ item, index }) => {
    const ownerData = ownersData[item.ownerId] || {};
   
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
