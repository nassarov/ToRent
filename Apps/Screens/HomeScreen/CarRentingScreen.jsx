import { View, Text, Image, Dimensions, Linking, Alert } from "react-native";
import React, { useEffect, useRef, useState } from "react";
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
import CarRentingDetails from "../../Components/CarRegistrationComponents/CarRentingDetails";
import { StyleSheet } from "react-native";
import {
  collection,
  collectionGroup,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { Card } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

export default function CarRentingScreen({ route }) {
  const { userData, carData, images, ownerId, ownerData, postId } =
    route.params;
  const isOwner = userData.id === ownerId;
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const minDate = new Date(); // Today
  const maxDate = new Date(2025, 6, 3);
  const [buttonVisible, setButtonVisible] = useState(true);
  const scrollViewRef = useRef(null);
  const db = getFirestore();
  const navigation = useNavigation();
  const locationLink = carData.address.value;
  const handlePress = () => {
    // Open Google Maps with the location of Beirut
    const url = locationLink;
    Linking.openURL(url);
  };

  // Function to handle scroll event
  const handleScroll = (event) => {
    const { y } = event.nativeEvent.contentOffset;
    if (y > 350) {
      setButtonVisible(false);
    } else {
      setButtonVisible(true);
    }
  };
  // Function to scroll to the bottom
  const scrollToBottom = () => {
    scrollViewRef.current.scrollToEnd({ animated: true, duration: 1000 });
  };

  // Handlers for date change
  const handleStartDateChange = (date) => {
    setSelectedStartDate(date ? date.toString() : "");
  };

  const handleEndDateChange = (date) => {
    setSelectedEndDate(date ? date.toString() : "");
  };
  const handleDelete = () => {
    Alert.alert(
      "Confirmation",
      "Do you want to proceed?",
      [
        {
          text: "No",
          onPress: () => console.log("No pressed"),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            const postRef = doc(db, "car_post", postId);
            console.log(postId);
            deleteDoc(postRef).then(() => {
              navigation.goBack();
            });
          },
        },
      ],
      { cancelable: false }
    );
  };

  useEffect(() => {
    setSelectedStartDate(minDate);
    setSelectedEndDate(minDate);
  }, []);

  const details = [
    {
      id: 1,
      attribute: "Model-Type",
      value: carData.model + " (" + carData.type + ")",
      icon: <FontAwesome5 name="car" size={24} color="#7F5AF0" />,
    },
    {
      id: 2,
      attribute: "Brand",
      value: carData.brand,
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
      value: carData.color,
      icon: <FontAwesome6 name="brush" size={24} color="#7F5AF0" />,
    },
    {
      id: 4,
      attribute: "Number of Seats",
      value: carData.carseat,
      icon: (
        <MaterialCommunityIcons name="car-seat" size={24} color="#7F5AF0" />
      ),
    },
    {
      id: 5,
      attribute: "Year",
      value: carData.year,
      icon: <Ionicons name="speedometer-outline" size={24} color="#7F5AF0" />,
    },
    {
      id: 6,
      attribute: "Price",
      value: carData.price + "$ /day",
      icon: <Entypo name="price-tag" size={24} color="#7F5AF0" />,
    },
    {
      id: 7,
      attribute: "Gear Type",
      value: carData.gearType,
      icon: <FontAwesome name="gear" size={24} color="#7F5AF0" />,
    },
    {
      id: 8,
      attribute: "Fuel Type",
      value: carData.fuelType,
      icon: <MaterialCommunityIcons name="fuel" size={24} color="#7F5AF0" />,
    },
  ];

  return (
    <View className="flex-1">
      <ScrollView
        className="pb-4"
        ref={scrollViewRef}
        onScroll={handleScroll}
        scrollEventThrottle={20}
        showsVerticalScrollIndicator={false}
      >
        <CustomHeader2
          text={carData.brand + " " + carData.model + "(" + carData.year + ")"}
        />
        <View style={styles.container}>
          <PictureSwitching images={images} />
        </View>
        <View style={styles.container}>
          {/* Car Owner Data */}

          <TouchableOpacity style={styles.profileContainer}>
            <Image
              source={{ uri: ownerData.profileImage }}
              style={styles.profileImage}
            />
            <View>
              <Text style={styles.userName}>{ownerData.name}</Text>
              <Text>{carData.address.label}</Text>
            </View>
          </TouchableOpacity>

          {/* Grid */}
          <View>
            <Text className="ml-2 font-bold text-lg mb-[-12px] mt-2">
              Car Details
            </Text>
            <DetailsGrid details={details} />
          </View>
          {/* Description */}
          <View>
            <Text className="ml-2 font-bold text-lg mb-[-12px] ">
              Description
            </Text>
            <View className="m-4 border-2 border-violet-600 p-4 rounded-lg">
              <Text>{carData.description}</Text>
            </View>
          </View>
          {/* Address  */}
          <Text className="ml-2 font-bold text-lg mb-[-12px] ">Address</Text>
          <View
            className="m-4 border-2 border-violet-600 rounded-lg p-2"
            style={{ height: heightPercentageToDP(26) }}
          >
            <View className=" flex-row">
              <Text className="font-bold">City:</Text>
              <Text>{carData.address.label}</Text>
            </View>
            <Text className="font-bold mb-1">Google maps Link:</Text>
            <TouchableOpacity
              style={{
                width: "100%",
                height: "90%",
                borderColor: "#7F5AF0",
                borderRadius: 10,
                borderWidth: 1,
                margin: -2,
              }}
              onPress={handlePress}
            >
              <Image
                source={require("../../../assets/Location/Beirut.png")}
                style={{ width: "100%", height: "100%", borderRadius: 10 }}
              />
            </TouchableOpacity>
          </View>
        </View>
        {/* Calendar */}
        <View style={styles.container} className="pb-5">
          <Text className="ml-2 font-bold text-lg mb-[2px] mt-2">
            Car Pick-up and Drop-off Dates
          </Text>
          <CarRentingDetails
            startDate={new Date(selectedStartDate)}
            endDate={new Date(selectedEndDate)}
            onStartDateChange={handleStartDateChange}
            onEndDateChange={handleEndDateChange}
          />
        </View>
        {/* TouchableOpacity fixed at center bottom */}
        <View
          style={{
            position: "relative",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            columnGap: 10,
            marginBottom: 20, // Adjust as needed
          }}
        >
          {isOwner ? (
            <>
              <TouchableOpacity
                onPress={() => {
                  /* Your onPress function */
                }}
                style={{
                  backgroundColor: "#7F5AF0",
                  padding: 10,
                  borderRadius: 10,
                  marginTop: 10,
                  width: widthPercentageToDP(40),
                  height: heightPercentageToDP(7),
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* Button content */}
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  Update Post
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handleDelete();
                }}
                style={{
                  backgroundColor: "#fff",
                  padding: 10,
                  borderRadius: 10,
                  marginTop: 10,
                  width: widthPercentageToDP(40),
                  height: heightPercentageToDP(7),
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* Button content */}
                <Text style={{ color: "red", fontWeight: "bold" }}>
                  Delete Post
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              onPress={() => {
                /* Your onPress function */
              }}
              style={{
                backgroundColor: "#7F5AF0",
                padding: 10,
                borderRadius: 10,
                marginTop: 10,
                width: widthPercentageToDP(40),
                height: heightPercentageToDP(7),
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* Button content */}
              <Text style={{ color: "white", fontWeight: "bold" }}>
                Request Rent
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
      {buttonVisible && (
        <TouchableOpacity
          onPress={scrollToBottom}
          style={{
            position: "absolute",
            bottom: 30,
            right: 20,
            backgroundColor: "#7F5AF0",
            borderRadius: 30,
            borderColor: "#7F5AF0",
            borderWidth: 2,
            padding: 15,
            zIndex: 999,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>
            {isOwner ? "Update OR Delete" : "Schedule A Rent"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20, // Adjust the value as needed for the desired roundness
    backgroundColor: "#FFFFFF",
    padding: 6,
    margin: 2,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8, // Android shadow elevation
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25, // Assuming you want a circular profile image
    marginRight: 10, // Adjust as needed for spacing between image and text
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
