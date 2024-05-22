import {
  View,
  Text,
  Image,
  Dimensions,
  Linking,
  Alert,
  StyleSheet,
  Modal,
  ActivityIndicator,
} from "react-native";
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
  MaterialIcons,
} from "@expo/vector-icons/";
import CalendarPicker from "react-native-calendar-picker";
import PictureSwitching from "../../Components/HomeComponents/PictureSwitching";
import DetailsGrid from "../../Components/HomeComponents/DetailsGrid";
import CarRentingDetails from "../../Components/CarRegistrationComponents/CarRentingDetails";
import {
  collection,
  collectionGroup,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  where,
  updateDoc,
  getDoc,
  serverTimestamp,
  addDoc,
  setDoc,
} from "firebase/firestore";
import { Card } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import FavoriteButton from "./favorite";

export default function CarRentingScreen({ route }) {
  const { userData, carData, images, ownerId, ownerData, postId } =
    route.params;
  const isOwner = userData.id === ownerId;
  const minDate = new Date(); // Today
  const maxDate = new Date(2025, 6, 3);
  const [buttonVisible, setButtonVisible] = useState(true);
  const scrollViewRef = useRef(null);
  const db = getFirestore();
  const navigation = useNavigation();
  const locationLink = carData.address.value;
  const [loading, setLoading] = useState(false);
  const [reservationStatus, setReservationStatus] = useState(null);
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [daysDifference, setDaysDifference] = useState(0);

  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
  };

  // Function to update selected end date
  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
  };

  // Function to update total price
  const handleTotalPriceChange = (totalPrice) => {
    setTotalPrice(totalPrice);
  };
  const updateDaysDifference = (difference) => {
    setDaysDifference(difference);
  };
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

  const handleDelete = () => {
    Alert.alert(
      "Confirmation",
      "Do you want to delete this post?",
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
    setSelectedEndDate(maxDate);
  }, []);

  const details = [
    {
      id: 1,
      attribute: "Model-Type",
      value: carData.model + " (" +carData.type + ")",
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

  // Function to update user data when a post is favorited
  const addToFavorites = async (postId) => {
    try {
      const userRef = doc(db, "users", userData.id);
      const userSnapshot = await getDoc(userRef);
      const userData = userSnapshot.data();

      let updatedFavorites = [];
      // Check if favorites array exists, if not create it
      if (userData.favorites) {
        updatedFavorites = [...userData.favorites, postId];
      } else {
        updatedFavorites = [postId];
      }
      await updateDoc(userRef, {
        favorites: updatedFavorites,
      });
    } catch (error) {
      console.error("Error updating favorites:", error);
      Alert.alert(
        "Error",
        "Failed to update favorites. Please try again later."
      );
    }
  };

  const addToReservation = async () => {
    console.log(daysDifference)
    try {
      if (
        selectedStartDate &&
        daysDifference >= carData.mindays &&
        daysDifference <= carData.maxdays
      ) {
        setLoading(true);
        // reservation ID hiye combination of userData.id and postId
        const reservationId = userData.id + "_" + postId;

        // reservation data
        const reservationData = {
          reservationId: reservationId,
          clientId: userData.id,
          clientData: userData,
          ownerData: ownerData,
          ownerId: ownerId,
          startDate: selectedStartDate,
          endDate: selectedEndDate ? selectedEndDate : selectedStartDate,
          totalPrice: daysDifference*totalPrice,
          daysDifference: daysDifference,
          status: "pending",
          createdAt: serverTimestamp(),
          images: images,
          carData: carData,
          postId: postId,
        };

        await setDoc(doc(db, "Reservation", reservationId), reservationData);
        console.log("Reservation added with ID: ", reservationId);
        setLoading(false);
        Alert.alert(
          "Success",
          "Request sent successfully. Please wait for the owner's response.",
          [{ text: "OK", onPress: navigation.replace("TabNavigation") }]
        );
      } else {
        Alert.alert("Reservation date", `Please choose the date of reservation and make sure its between ${carData.mindays} and ${carData.maxdays}`);
      }
    } catch (error) {
      console.error("Error adding reservation: ", error);
      Alert.alert(
        "Failed",
        "There is a problem requesting reservation of this car.",
        [{ text: "OK", onPress: () => {} }]
      );
      setLoading(false);
    }
  };
  const [ended, setEnded] = useState(false);

  const fetchReservationStatus = async () => {
    try {
      const reservationRef = doc(db, "Reservation", `${userData.id}_${postId}`);
      const reservationDoc = await getDoc(reservationRef);
      if (reservationDoc.exists()) {
        const reservationData = reservationDoc.data();
        const endDateInSeconds = reservationData.endDate.seconds;
        if (Date.now() < endDateInSeconds * 1000) {
          console.log(endDateInSeconds * 1000);
          setEnded(false);
        } else {
          setEnded(true);
        }
        setReservationStatus(reservationData.status);
        console.log(reservationData.status);
      } else {
        // If reservation does not exist, set status to null
        setReservationStatus(null);
      }
    } catch (error) {
      console.error("Error fetching reservation status: ", error);
    }
  };
  useEffect(() => {
    const fetchStatus = async () => {
      await fetchReservationStatus();
      setLoadingStatus(false);
    };

    fetchStatus();
  }, []);
  let buttonText = "Request Rent";
  let buttonDisabled = false;

  if (reservationStatus === "pending") {
    buttonText = "Awaiting Owner Response";
    buttonDisabled = true;
  } else if (reservationStatus === "accepted" && ended === false) {
    buttonText = "Enjoy your Trip";
    buttonDisabled = true;
  } else if (reservationStatus === "accepted" && ended === true) {
    buttonText = "ReRequest To Rent";
    buttonDisabled = false;
  }

  // Function to cancel reservation
  const cancelReservation = async () => {
    Alert.alert(
      "Cancel Reservation",
      "Are you sure you want to cancel your reservation?",
      [
        {
          text: "No",
          onPress: () => console.log("No pressed"),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            try {
              const reservationId = userData.id + "_" + postId;
              const reservationRef = doc(db, "Reservation", reservationId);
              await deleteDoc(reservationRef);
              setReservationStatus(null);
              Alert.alert("Reservation Cancelled", "Your reservation has been cancelled.");
            } catch (error) {
              console.error("Error cancelling reservation: ", error);
              Alert.alert("Error", "Failed to cancel reservation. Please try again later.");
            }
          },
        },
      ],
      { cancelable: false }
    );
  };


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
          <View className="flex-row justify-between items-center">
            <TouchableOpacity style={styles.profileContainer} onPress={() => navigation.replace("ProfileScreen",{ visitorData: userData ,userData:ownerData}) }>
              <Image
                source={{ uri: ownerData.profileImage }}
                style={styles.profileImage}
              />
              <View>
                <Text style={styles.userName}>{ownerData.name}</Text>
                <Text>{carData.address.label}</Text>
              </View>
            </TouchableOpacity>
             {/* FavoriteButton */}
            {!isOwner && (
              <View className='flex-row'>
                <TouchableOpacity className="items-center mr-1 rounded-full border-violet-500 border-2 px-3 py-2" 
                onPress={() => {
                  const firstImageUrl = images[0];
                console.log("First image URL:", firstImageUrl);
                  const message = `Hello, ${ownerData.name} this is ${userData.name} I am interested in your car ${carData.brand}-${carData.model}(${carData.year})\n\n ${firstImageUrl}.`;
                  const phoneNumber = ownerData.phoneNumber;
                  const url = `whatsapp://send?text=${encodeURIComponent(
                    message
                  )}&phone=${phoneNumber}`;
                  Linking.openURL(url);
                }}
                >
                <FontAwesome name="whatsapp" size={26} color="#7F5AF0" />
                </TouchableOpacity>
              <View className="items-center mr-1 rounded-full border-violet-500 border-2 px-3 py-2">
                <FavoriteButton
                  userId={userData.id}
                  postId={postId}
                  userData={userData}
                  addToFavorites={addToFavorites}
                />
              </View>
              
              </View>
            )}
           
          </View>
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
            startDate={selectedStartDate}
            endDate={selectedEndDate}
            onStartDateChange={handleStartDateChange}
            onEndDateChange={handleEndDateChange}
            minDays={carData.mindays}
            maxDays={carData.maxdays}
            price={carData.price}
            onTotalPriceChange={handleTotalPriceChange}
            onDaysDifferenceChange={updateDaysDifference}
            postId={postId}
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
                  navigation.navigate("EditCarRegistrationScreen", { postId, carData,userData });
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
              onPress={addToReservation}
              disabled={buttonDisabled}
              style={[styles.button, buttonDisabled && styles.disabledButton]}
            >
              {loadingStatus ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={styles.buttonText}>{buttonText}</Text>
              )}
            </TouchableOpacity>
            
          )}

        {!isOwner && reservationStatus === "pending" && (
            <View className='justify-center items-center'>
              <TouchableOpacity onPress={cancelReservation} >
                <Text className='text-[#7F5AF0] font-bold'>Cancel Reservation</Text>
              </TouchableOpacity>
            </View>
          )}
          <Modal visible={loading} transparent animationType="fade">
            <View style={styles.modalBackground}>
              <View style={styles.activityIndicatorWrapper}>
                <ActivityIndicator size="large" color="#FFFFFF" />
              </View>
            </View>
          </Modal>
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
    borderRadius: 20,
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
    elevation: 8,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  activityIndicatorWrapper: {
    backgroundColor: "#000000",
    padding: 20,
    borderRadius: 10,
  },
  button: {
    backgroundColor: "#7F5AF0",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    width: 200,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "gray",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
