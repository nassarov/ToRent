import { View, Text, Image, Dimensions, Linking } from "react-native";
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
  doc,
  getDocs,
  getFirestore,
} from "firebase/firestore";

export default function CarRentingScreen({ route }) {
  const { userData, carData, images } = route.params;
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const minDate = new Date(); // Today
  const maxDate = new Date(2025, 6, 3);
  const [buttonVisible, setButtonVisible] = useState(true);
  const scrollViewRef = useRef(null);
  const db = getFirestore();

  const handlePress = () => {
    // Open Google Maps with the location of Beirut
    const url = "https://www.google.com/maps/search/?api=1&query=Beirut";
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

  useEffect(() => {
    const retrieveCarPosts = async () => {
      try {
        // Use a collection group query to target all 'user_posts' subcollections
        const userPostsRef = collectionGroup(db, "user_posts");
        const querySnapshot = await getDocs(userPostsRef);
        if (querySnapshot.empty) {
          console.log("No matching documents.");
          return;
        }

        const carPosts = querySnapshot.docs.map((doc) => {
          // Extract the user's email or identifier from the document reference
          const pathSegments = doc.ref.path.split("/");
          const ownerEmailOrId = pathSegments[pathSegments.length - 3]; // Assuming the structure is 'car_post/{userEmail}/user_posts/{postId}'
          return {
            id: doc.id,
            owner: ownerEmailOrId,
            ...doc.data().carDetails,
          };
        });
        console.log(carPosts);
      } catch (error) {
        console.error("Error retrieving car posts: ", error);
      }
    };

    retrieveCarPosts();
    setSelectedStartDate(minDate);
    setSelectedEndDate(minDate);
  }, []);

  const details = [
    {
      id: 1,
      attribute: "Model-Type",
      value: carData.model + "-" + carData.type,
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
      value: carData.price+"$/day",
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
      >
        <CustomHeader2 text={"Car Details"} />
        <View style={styles.container}>
          <PictureSwitching images={images} />
        </View>
        <View style={styles.container}>
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
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur.
              </Text>
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
              <Text>Beirut</Text>
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
        <Text className="ml-2 font-bold text-lg mb-[2px] mt-2">
          Car Pick-up and Drop-off Dates
        </Text>

        <View>
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

            justifyContent: "center",
            alignItems: "center",
            marginBottom: 20, // Adjust as needed
          }}
        >
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
            Schedule A Rent
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
});
