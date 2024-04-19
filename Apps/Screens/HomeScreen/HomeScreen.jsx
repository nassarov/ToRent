import React from "react";
import { Text, View } from "react-native";
import PropTypes from "deprecated-react-native-prop-types"; // Import PropTypes from the deprecated package
import Carousel from "../../Components/HomeComponents/Carousel";
import PostCard from "../../Components/HomeComponents/PostCard";
import Slider from "../../Components/HomeComponents/Slider";
import { TouchableOpacity } from "react-native-gesture-handler";
export default function HomeScreen() {
  const images = [
    require("../../../assets/HomeSlider/s0.jpg"),
    require("../../../assets/HomeSlider/s3.jpg"),
    require("../../../assets/HomeSlider/s2.webp"),
    require("../../../assets/HomeSlider/s1.png"),
  ];
  const companyData = [
    {
      id: 1,
      name: "ABC Motors",
      cars: [
        {
          id: 1,
          image: require("./../../../assets/CarPosts/hyundai.png"),
          brand: "Hyundai",
          model: "Creta-2018",
          price:'30'
        },
        {
          id: 2,
          image: require("./../../../assets/CarPosts/mahindra.jpeg"),
          brand: "Mahindra",
          model: "Scorpion-2020",
          price:'20'
        },
        {
          id: 3,
          image: require("./../../../assets/CarPosts/suzuki.jpeg"),
          brand: "Suzuki",
          model: "Fronx-2012",
          price:'40'
        },
        {
          id: 4,
          image: require("./../../../assets/CarPosts/toyota.png"),
          brand: "Toyota",
          model: "Urban Cruiser Taysor-2010",
          price:'50' },
      ],
    },
    {
      id: 2,
      name: "DEF Motors",
      cars: [
        {
          id: 1,
          image: require("./../../../assets/CarPosts/hyundai.png"),
          brand: "Hyundai",
          model: "Creta-2018",
          price:'30'
        },
        {
          id: 2,
          image: require("./../../../assets/CarPosts/mahindra.jpeg"),
          brand: "Mahindra",
          model: "Scorpion-2020",
          price:'55'
        },
        {
          id: 3,
          image: require("./../../../assets/CarPosts/suzuki.jpeg"),
          brand: "Suzuki",
          model: "Fronx-2012",
          price:'35'
    },
        {
          id: 4,
          image: require("./../../../assets/CarPosts/toyota.png"),
          brand: "Toyota",
          model: "Urban Cruiser Taysor-2010",
          price:'70'
        },
      ],
    },
  ];

  return (
    <View className="mt-12 ">
      <View className="flex-row mb-2">
        <Text className="text-[#7F5AF0] text-xl font-bold ml-4">Find</Text>
        <Text className="text-xl"> Your Favorite Car</Text>
      </View>
      <Carousel />
      {companyData.map((company, index) => (
        <View className=" py-2">
          <View className="flex-row justify-between p-1 items-center">
            <Text className="font-bold">{company.name}</Text>
            <TouchableOpacity>
              <Text className="text-violet-600 text-xs">See More</Text>
            </TouchableOpacity>
          </View>
          <Slider key={index} cars={company.cars} />
        </View>
      ))}
    </View>
  );
}
