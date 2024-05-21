import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, ActivityIndicator, Dimensions } from "react-native";
import Carousel from "../../Components/HomeComponents/Carousel";
import Slider from "../../Components/HomeComponents/Slider";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import SearchBarCar from "../../Components/HomeComponents/SearchBar2";
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { getAuth, signOut } from "firebase/auth";
import {
  collection,
  collectionGroup,
  getDocs,
  getFirestore,
  limit,
  query,
  where,
} from "firebase/firestore";
import { app } from "../../../firebaseConfig";
import SearchChoices from "../../Components/HomeComponents/SearchChoices";

export default function HomeScreen({ route }) {
  const db = getFirestore(app);
  const [posts, setPosts] = useState([]);
  const auth = getAuth();
  const slide = true;
  const [data, setData] = useState([]);
  const [filtereData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState("");
  const screenWidth = Dimensions.get("window").width ;

  const { userData } = route.params;
  useEffect(() => {
      fetchData();
    data.forEach((item) => {
      console.log(item.cars.newData[0].carDetails.carData);
    });
  }, [navigation]);

  const fetchData = async () => {
    setLoading(true);
    setData([]);
    const queryUserData = await getDocs(
      query(collection(db, "users"), where("role", "==", "1"))
    );
    let companyData = [];
    let newData = [];
    queryUserData.forEach(async (doc1) => {
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
        setData(companyData);
        setFilteredData(companyData);
      }
    });
    setLoading(false);
  };

  const navigation = useNavigation();
  const images = [
    require("../../../assets/HomeSlider/s0.jpg"),
    require("../../../assets/HomeSlider/s3.jpg"),
    require("../../../assets/HomeSlider/s2.webp"),
    require("../../../assets/HomeSlider/s1.png"),
  ];
 
  return (
    <ScrollView
      className="mt-[38px] pt-3 flex-1 "
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}>
    
      <View className='flex-row justify-between'>
      <View className="flex-row mb-2 ">
        <Text className="text-[#7F5AF0] text-xl font-bold ml-4">Find</Text>
        <Text className="text-xl"> Your Favorite Car</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("Explore")} className='mr-2 mb-3 items-center justify-center'>
      <FontAwesome5 name="search" size={25} color="#7F5AF0" /> 
      <Text className='text-[#7F5AF0]'>Explore</Text>
      </TouchableOpacity>
    </View>
      <Carousel />
      <Text className="font-bold text-lg">Top <Text className="font-bold text-lg text-[#7F5AF0]">Car</Text> Renting Companies</Text>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#7F5AF0" />
          <Text style={styles.loadingText}>Getting Latest Cars...</Text>
        </View>
      ) : (
        filtereData.map((data, index) => (
          <View
            key={index}
            className=" mt-2 mb-2 bg-purple-100"
            style={styles.container}
          >
            <View className="flex-row justify-between px-1 items-center rounded-xl py-1">
              <View className="flex-row items-center ">
                <Image
                  className="rounded-full w-10 h-10 mr-3"
                  source={{ uri: data.ownerInfo.profileImage }}
                />
                <Text className="font-bold text-[17px]">
                  {data.ownerInfo.name}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("ProfileScreen", {
                    userData: data.ownerInfo,
                  });
                }}
              >
                <Text className="text-violet-600 text-[13px] mr-1">See More</Text>
              </TouchableOpacity>
            </View>
            <Slider cars={data.cars.newData} slideway={true} />
          </View>
        ))
      )}
      <View className='mb-[55px]'></View>
    </ScrollView>
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
    marginTop: 50,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#7F5AF0",
  },
});
