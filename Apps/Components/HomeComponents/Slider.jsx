import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { FlatList } from "react-native-gesture-handler";
import PostCard from "./PostCard";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

export default function Slider({ cars, slideway }) {
  const [ownersData, setOwnersData] = useState({});

  useEffect(() => {
    // Fetch owner data for all cars
    const fetchOwnersData = async () => {
      const db = getFirestore();
      const ownersData = {};
      await Promise.all(
        cars.map(async (item) => {
          const ownerId = item.ownerId;
          const q = query(collection(db, "users"), where("id", "==", ownerId));
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            ownersData[ownerId] = {
              email: data.email,
              name: data.name,
              profileImage: data.profileImage,
            };
          });
        })
      );
      setOwnersData(ownersData);
    };

    fetchOwnersData();
  }, [cars]); // Run the effect when cars change

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
      scrollEnabled={slideway}
    />
  );
}
