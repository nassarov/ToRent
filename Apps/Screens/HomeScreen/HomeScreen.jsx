import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import Carousel from "../../Components/HomeComponents/Carousel";
import Slider from "../../Components/HomeComponents/Slider";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import SearchBarCar from "../../Components/HomeComponents/SearchBar";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome6 } from "@expo/vector-icons";
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

export default function HomeScreen() {
  const db = getFirestore(app);
  const [posts, setPosts] = useState([]);
  const auth = getAuth();
  const slide = true;
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.replace("Registration");
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };

  const fetchData = async () => {
    const queryUserData = await getDocs(
      query(collection(db, "users"), where("role", "==", "1"))
    );
    let companyData = [];
    let newData = [];
    queryUserData.forEach(async (doc1) => {
      const queryPostData = await getDocs(
        query(
          collection(db, "car_post"),
          where("carDetails.ownerId", "==", doc1.data().id),
          limit(4)
        )
      );

      newData = [];
      queryPostData.forEach((doc2) => {
        newData = [...newData, doc2.data()];
      });
      companyData = [
        ...companyData,
        { ownerInfo: doc1.data(), cars: { newData } },
      ];
      setData(companyData);
    });
  };
  useEffect(() => {
    data && console.log(data);
  }, [data]);
  const navigation = useNavigation();
  const images = [
    require("../../../assets/HomeSlider/s0.jpg"),
    require("../../../assets/HomeSlider/s3.jpg"),
    require("../../../assets/HomeSlider/s2.webp"),
    require("../../../assets/HomeSlider/s1.png"),
  ];
  // const companyData = [
  //   {
  //     id: 1,
  //     name: "ABC Motors",
  //     cars: [
  //       {
  //         id: 1,
  //         image: require("./../../../assets/CarPosts/hyundai.png"),
  //         brand: "Hyundai",
  //         model: "Creta-2018",
  //         price: "30",
  //       },
  //       {
  //         id: 2,
  //         image: require("./../../../assets/CarPosts/mahindra.jpeg"),
  //         brand: "Mahindra",
  //         model: "Scorpion-2020",
  //         price: "20",
  //       },
  //       {
  //         id: 3,
  //         image: require("./../../../assets/CarPosts/suzuki.jpeg"),
  //         brand: "Suzuki",
  //         model: "Fronx-2012",
  //         price: "40",
  //       },
  //       {
  //         id: 4,
  //         image: require("./../../../assets/CarPosts/toyota.png"),
  //         brand: "Toyota",
  //         model: "Urban Cruiser Taysor-2010",
  //         price: "50",
  //       },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     name: "DEF Motors",
  //     cars: [
  //       {
  //         id: 1,
  //         image: require("./../../../assets/CarPosts/hyundai.png"),
  //         brand: "Hyundai",
  //         model: "Creta-2018",
  //         price: "30",
  //       },
  //       {
  //         id: 2,
  //         image: require("./../../../assets/CarPosts/mahindra.jpeg"),
  //         brand: "Mahindra",
  //         model: "Scorpion-2020",
  //         price: "55",
  //       },
  //       {
  //         id: 3,
  //         image: require("./../../../assets/CarPosts/suzuki.jpeg"),
  //         brand: "Suzuki",
  //         model: "Fronx-2012",
  //         price: "35",
  //       },
  //       {
  //         id: 4,
  //         image: require("./../../../assets/CarPosts/toyota.png"),
  //         brand: "Toyota",
  //         model: "Urban Cruiser Taysor-2010",
  //         price: "70",
  //       },
  //     ],
  //   },
  //   {
  //     id: 3,
  //     name: "DEF Motors",
  //     cars: [
  //       {
  //         id: 1,
  //         image: require("./../../../assets/CarPosts/hyundai.png"),
  //         brand: "Hyundai",
  //         model: "Creta-2018",
  //         price: "30",
  //       },
  //       {
  //         id: 2,
  //         image: require("./../../../assets/CarPosts/mahindra.jpeg"),
  //         brand: "Mahindra",
  //         model: "Scorpion-2020",
  //         price: "55",
  //       },
  //       {
  //         id: 3,
  //         image: require("./../../../assets/CarPosts/suzuki.jpeg"),
  //         brand: "Suzuki",
  //         model: "Fronx-2012",
  //         price: "35",
  //       },
  //       {
  //         id: 4,
  //         image: require("./../../../assets/CarPosts/toyota.png"),
  //         brand: "Toyota",
  //         model: "Urban Cruiser Taysor-2010",
  //         price: "70",
  //       },
  //     ],
  //   },
  // ];

  const handleSearch = (text) => {
    setSearchQuery(text);
    setShowSearchResults(true);
  };

  return (
    <ScrollView
      className="mt-[38px] pt-3 flex-1 mb-[50px]"
      keyboardShouldPersistTaps="handled"
    >
      <View className="flex-row mb-2 ">
        <Text className="text-[#7F5AF0] text-xl font-bold ml-4">Find</Text>
        <Text className="text-xl"> Your Favorite Car</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row justify-between px-1 items-center">
        <SearchBarCar />
        <TouchableOpacity
          onPress={() => navigation.navigate("Filter")}
          className="mr-2 mt-1"
        >
          <FontAwesome6 name="sliders" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Carousel />
      {data.map((dat, index) => (
        <View key={index} className=" py-2 mb-2">
          <View className="flex-row justify-between px-1 items-center">
            <Text className="font-bold">{dat.ownerInfo.name}</Text>
            <TouchableOpacity>
              <Text className="text-violet-600 text-xs">See More</Text>
            </TouchableOpacity>
          </View>
          <Slider cars={dat.cars.newData} slideway={true} />
        </View>
      ))}
    </ScrollView>
  );
}
