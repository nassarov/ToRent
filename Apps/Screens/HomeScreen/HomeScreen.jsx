import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, ActivityIndicator, Dimensions, FlatList } from "react-native";
import Carousel from "../../Components/HomeComponents/Carousel";
import Slider from "../../Components/HomeComponents/Slider";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import Constants from 'expo-constants';

import {
  collection,
  getDocs,
  getFirestore,
  limit,
  query,
  where,
  onSnapshot,
  startAfter,
} from "firebase/firestore";
import { app } from "../../../firebaseConfig";
import { StatusBar } from "expo-status-bar";

export default function HomeScreen({ route }) {
  const db = getFirestore(app);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastVisible, setLastVisible] = useState(null);
  const navigation = useNavigation();
  const images = [
    require("../../../assets/HomeSlider/s0.jpg"),
    require("../../../assets/HomeSlider/s3.jpg"),
    require("../../../assets/HomeSlider/s2.webp"),
    require("../../../assets/HomeSlider/s1.png"),
  ];

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "car_post"), () => {
      fetchData();
    });
    const unsubscribe2 = onSnapshot(collection(db, "users"), () => {
      fetchData();
    });

    return () => {
      unsubscribe();
      unsubscribe2();
    };
  }, [navigation]);

  const fetchData = async (startAfterDoc = null) => {
    setLoading(true);

    let queryUserData = query(
      collection(db, "users"),
      where("role", "==", "1"),
      limit(4)
    );

    if (startAfterDoc) {
      queryUserData = query(queryUserData, startAfter(startAfterDoc));
    }

    const userSnapshot = await getDocs(queryUserData);
    let companyData = [];
    let newData = [];
    let lastVisible = null;

    for (const doc1 of userSnapshot.docs) {
      const id = doc1.data().id;
      const queryPostData = await getDocs(
        query(
          collection(db, "car_post"),
          where("ownerId", "==", id ? id : ""),
          limit(4)
        )
      );

      newData = [];
      queryPostData.forEach((doc2) => {
        newData = [...newData, doc2.data()];
      });

      if (newData.length !== 0) {
        companyData = [
          ...companyData,
          { ownerInfo: doc1.data(), cars: { newData } },
        ];
      }

      lastVisible = doc1;
    }

    if (startAfterDoc) {
      setData((prevData) => [...prevData, ...companyData]);
      setFilteredData((prevData) => [...prevData, ...companyData]);
    } else {
      setData(companyData);
      setFilteredData(companyData);
    }

    setLastVisible(lastVisible);
    setLoading(false);
  };

  const handleLoadMore = () => {
    if (!loading && lastVisible) {
      fetchData(lastVisible);
    }
  };

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#7F5AF0" />
        <Text style={styles.loadingText}>Getting Latest Cars...</Text>
      </View>
    );
  };

  const renderHeader = () => {
    return (
      < >
        <StatusBar backgroundColor={"#F6F6F6"} translucent={true} />
        <View className='flex-row justify-between' style={{paddingTop:Constants.statusBarHeight}}>
          <View className="flex-row mb-2 mt-2">
            <Text className="text-[#7F5AF0] text-xl font-bold ml-4">Find</Text>
            <Text className="text-xl"> Your Favorite Car</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("Explore")} className='mr-2 mb-3 mt-2 items-center justify-center'>
            <FontAwesome5 name="search" size={25} color="#7F5AF0" /> 
            <Text className='text-[#7F5AF0]'>Explore</Text>
          </TouchableOpacity>
        </View>
        <Carousel images={images} />
        <Text className="font-bold text-lg ml-3">Top <Text className="font-bold text-lg text-[#7F5AF0]">Car</Text> Renting Companies</Text>
      </>
    );
  };

  return (
    <FlatList
      data={filteredData}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View key={item.id} className="mt-2 mb-2 bg-purple-100" style={styles.container}>
          <View className="flex-row justify-between px-1 items-center rounded-xl py-1">
            <View className="flex-row items-center">
              <Image className="rounded-full w-10 h-10 mr-3" source={{ uri: item.ownerInfo.profileImage }} />
              <Text className="font-bold text-[17px]">{item.ownerInfo.name}</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("ProfileScreen", {
                  userData: item.ownerInfo,
                });
              }}
            >
              <Text className="text-violet-600 text-[13px] mr-1">See More</Text>
            </TouchableOpacity>
          </View>
          <Slider cars={item.cars.newData} ownerData={item.ownerInfo} slideway={true} />
        </View>
      )}
      style={{marginBottom:50}}
      ListHeaderComponent={renderHeader}
      ListFooterComponent={renderFooter}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
    
    />
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    marginBottom:40
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#7F5AF0",
  },
});
