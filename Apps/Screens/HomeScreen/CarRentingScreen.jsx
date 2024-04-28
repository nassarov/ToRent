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
export default function CarRentingScreen() {
  const screenWidth = Dimensions.get("window").width - 20;

  const [selectedImage, setSelectedImage] = useState(
    require("./../../../assets/CarPosts/toyota.png")
  );
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
      <CustomHeader2 text={"CARCAR"} />
      <View className="items-center">
        <Image
          source={selectedImage}
          style={{
            objectFit: "cover",
            width: screenWidth,
            height: 200,
            borderRadius: 10,
          }}
        />
      </View>
      <View className="flex-row gap-x-1 rounded-xl  mt-2">
        <FlatList
          scrollEnabled={false}
          data={images}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => {
                setSelectedImage(item.image);
              }}
              key={index}
              className={`border-2 ${
                selectedImage == item.image
                  ? "border-violet-600"
                  : "border-gray-200"
              } rounded-lg ml-1`}
            >
              <Image
                source={item.image}
                style={{
                  width: widthPercentageToDP(86 / images.length),
                  height: widthPercentageToDP(20),
                }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}
          horizontal
        />
      </View>
      <View className="m-4 border-b-2 border-violet-600">
        <FlatList
          scrollEnabled={false}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-around" }}
          data={details}
          renderItem={({ item, index }) => (
            <View
              key={index}
              className="flex-row p-4  border-t-2 border-r-2  border-violet-600 items-center "
              style={{ width: widthPercentageToDP(50) }}
            >
              <View className="m-2">{item.icon}</View>
              <View>
                <Text className="font-bold ">{item.attribute}</Text>
                <Text className="text-xs text-violet-600">{item.value}</Text>
              </View>
            </View>
          )}
        />
      </View>
      <View className="m-4 border-2 border-violet-600 p-4 rounded-lg">
        <Text className="font-bold text-lg">Description</Text>
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
      <View className="m-4 border-2 border-violet-600 rounded-lg p-2">
        <View className=" flex-row ">
          <Text className="font-bold">Address:</Text>
          <Text>Beirut</Text>
        </View>
        <Text className="font-bold leading-3">
          Google maps Link:
          <TouchableOpacity>
            <Text className="text-blue-400 leading-3">
              https://maps.app.goo.gl/sdfaewf
            </Text>
          </TouchableOpacity>
        </Text>
      </View>

      <CalendarPicker
        startFromMonday={true}
        allowRangeSelection={true}
        minDate={minDate}
        maxDate={maxDate}
        todayBackgroundColor="#f2e6ff"
        selectedDayColor="#7300e6"
        selectedDayTextColor="#FFFFFF"
        onDateChange={onDateChange}
      />

      <View>
        <Text>
          {startDate
            ? startDate.getFullYear() +
              "/" +
              (startDate.getMonth() + 1) +
              "/" +
              startDate.getDate()
            : ""}
        </Text>
        <Text>
          {endDate
            ? endDate.getFullYear() +
              "/" +
              (endDate.getMonth() + 1) +
              "/" +
              endDate.getDate()
            : ""}
        </Text>
      </View>
      <View className="items-end mb-4">
        <TouchableOpacity
          className="bg-violet-600 mr-5 p-4 rounded-xl "
          style={{ width: widthPercentageToDP(30) }}
        >
          <Text className="text-white text-center font-bold">Rent</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
