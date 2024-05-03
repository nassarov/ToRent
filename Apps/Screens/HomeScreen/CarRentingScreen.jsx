import { View, Text, Image, Dimensions } from "react-native";
import React, { useState } from "react";
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import CustomHeader2 from "../../Components/CustomHeader2";
import {
  MaterialCommunityIcons,
  Entypo,
  FontAwesome5,
  FontAwesome,
  Ionicons,
  FontAwesome6,
} from "@expo/vector-icons/";
import CalendarPicker from "react-native-calendar-picker";
import PictureSwitching from "../../Components/HomeComponents/PictureSwitching";
import DetailsGrid from "../../Components/HomeComponents/DetailsGrid";
import CarRentingDetails from "../../Components/HomeComponents/CarRentingDetails";
export default function CarRentingScreen() {
 
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [selectedStartDate, setSelectedStartDate] = useState("");

  const minDate = new Date(); // Today
  const maxDate = new Date(2025, 6, 3);
  const startDate = selectedStartDate ? new Date(selectedStartDate) : "";
  const endDate = selectedEndDate ? new Date(selectedEndDate) : "";

  const images = [
    {
      id: 1,
      image: require("./../../../assets/CarPosts/toyota.png"),
    },
    { id: 2, image: require("./../../../assets/CarPosts/toyota1.jpeg") },
    { id: 3, image: require("./../../../assets/CarPosts/toyota2.jpeg") },
    { id: 4, image: require("./../../../assets/CarPosts/toyota3.jpeg") },
  ];
  const details = [
    {
      id: 1,
      attribute: "Model",
      value: "2017",
      icon: <FontAwesome5 name="car" size={24} color="#7F5AF0" />,
    },
    {
      id: 2,
      attribute: "Brand",
      value: "Toyota",
      icon: (
        <MaterialCommunityIcons
          name="label-outline"
          size={24}
          color="#7F5AF0"
        />
      ),
    },
    {
      id: 3,
      attribute: "Color",
      value: "Orange",
      icon: <FontAwesome6 name="brush" size={24} color="#7F5AF0" />,
    },
    {
      id: 4,
      attribute: "Number of Seats",
      value: "4",
      icon: (
        <MaterialCommunityIcons name="car-seat" size={24} color="#7F5AF0" />
      ),
    },
    {
      id: 5,
      attribute: "Mileage",
      value: "200Km",
      icon: <Ionicons name="speedometer-outline" size={24} color="#7F5AF0" />,
    },
    {
      id: 6,
      attribute: "Price",
      value: "99$/day",
      icon: <Entypo name="price-tag" size={24} color="#7F5AF0" />,
    },
    {
      id: 7,
      attribute: "Gear Type",
      value: "Automatic",
      icon: <FontAwesome name="gear" size={24} color="#7F5AF0" />,
    },
    {
      id: 8,
      attribute: "Fuel Type",
      value: "Gasoline",
      icon: <MaterialCommunityIcons name="fuel" size={24} color="#7F5AF0" />,
    },
  ];

  const onDateChange = (date, type) => {
    if (type === "END_DATE") {
      setSelectedEndDate(date);
    } else {
      setSelectedStartDate(date);
      setSelectedEndDate(null);
    }
  };
  return (
    <ScrollView>
      <CustomHeader2 text={"Car Details"} />
      <PictureSwitching images={images} />
      {/* Grid */}
      <Text className="ml-2 font-bold text-lg mb-[-12px] mt-2">
        Car Details
      </Text>
     <DetailsGrid details={details}/>
      {/* Description */}
      <Text className="ml-2 font-bold text-lg mb-[-12px] ">Description</Text>
      <View className="m-4 border-2 border-violet-600 p-4 rounded-lg">
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum
        </Text>
      </View>
      {/* Address  */}
      <Text className="ml-2 font-bold text-lg mb-[-12px] ">Address</Text>
      <View
        className="m-4 border-2 border-violet-600 rounded-lg p-2"
        style={{ height: heightPercentageToDP(10) }}
      >
        <View className=" flex-row mb-1">
          <Text className="font-bold">City:</Text>
          <Text>Beirut</Text>
        </View>
        <Text className="font-bold ">
          Google maps Link:
          <TouchableOpacity>
            <Text className="text-blue-400">
              https://maps.app.goo.gl/sdfaewf
            </Text>
          </TouchableOpacity>
        </Text>
      </View>
      {/* Calendar */}
      <Text className="ml-2 font-bold text-lg mb-[-12px] mt-2">
        Car Pick-up and Drop-off Dates
      </Text>
      
      <View>
       <CarRentingDetails startDate={startDate} endDate={endDate}/>
      </View>
    
    </ScrollView>
  );
}
