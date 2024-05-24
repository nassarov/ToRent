import { View, Text, Linking, Share,ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Avatar, Title, Caption } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "../ProfileComponents/profileStyle";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getFirestore, onSnapshot, query, where } from "firebase/firestore";
export default function ProfileDetails({
  userData,
  numberOfPosts,
  visitorData,
}) {
  const navigation = useNavigation();
  const profileImage = userData.profileImage;
  const [userEmail, setUserEmail] = useState("");
  const [cities, setCities] = useState([]);
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const UserRole = userData.role;
  const [role, setRole] = useState("");
  const [numberOfReservations, setNumberOfReservations] = useState(0);
  const [loading,setLoading]=useState(true);

  const handleRole = () => {
    if (UserRole === "1") {
      setRole("Car Owner");
    } else {
      setRole("Client");
    }
  };

  useEffect(() => {
    handleRole();
    if (UserRole === "1") {
      setCities(userData.addresses.map((address) => address.label));
    }
  }, []);

  useEffect(() => {
    navigation.addListener("focus", (e) => {
      setUserEmail(userData.email);
      setUserPhoneNumber(userData.phoneNumber);
    });
  }, [navigation]);

  const handleShareProfile = async () => {
    try {
      let message = `Check out ${userData.name}'s profile on ToRent app:\n\nEmail: ${userData.email}\nPhone: ${userData.phoneNumber}`;
      if (UserRole === "1" && cities.length > 0) {
        message += `\nCities: ${cities.join(", ")}`;
      }
  
      const result = await Share.share({
        message: message,
      });
  
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // Shared with activity type of result.activityType
        } else {
          // Shared
        }
      } else if (result.action === Share.dismissedAction) {
        // Dismissed
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    const fetchReservations = async () => {
      const db = getFirestore();
      const reservationsRef = collection(db, "Reservation");
      const q = query(
        reservationsRef,
        where("ownerId", "==", userData.id),
        where("status", "==", "accepted")
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setNumberOfReservations(snapshot.size);
        setLoading(false)
      });

      return () => unsubscribe();
    };

    fetchReservations();
  }, [userData.id]);

  

  return (
    <View style={{ paddingHorizontal: 15 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Avatar.Image
          source={{
            uri: profileImage,
          }}
          size={80}
          style={{
            height: 80,
            width: 80,
            borderRadius: 4,
            backgroundColor: "white",
          }}
        />
        <View style={{ width: 75, alignItems: "center" }}>
          <Text style={{ fontSize: 24, fontWeight: "bold", color: "black" }}>
            {numberOfPosts}
          </Text>
          <Text style={{ fontSize: 16, color: "black" }}>Posts</Text>
        </View>
        {/* Displaying the number of reservations */}
        <View style={{ alignItems: "center" }}>
        {loading ? (
          <ActivityIndicator size="small" color="#7F5AF0" />
        ) : (
          <Text style={{ fontSize: 24, fontWeight: "bold", color: "black" }}>
            {numberOfReservations}
          </Text> )}
          <Text style={{ fontSize: 16, color: "black" }}>Total Client's</Text>
          <Text style={{ fontSize: 16, color: "black" }}> Reservations</Text>
        </View>
        {/* <View style={{ width: 75, alignItems: "center" }}>
          <Text style={{ fontSize: 15, fontWeight: "bold", color: "black" }}>
            {userData.role === "1" ? "Car Owner" : "Client"}
          </Text>
          <Text style={{ fontSize: 16, color: "black" }}>Role</Text>
        </View> */}
      </View>
      <Text
        style={{
          fontSize: 18,
          color: "black",
          fontWeight: "500",
          marginTop: 16,
        }}
      >
        {userData.name}
      </Text>
      <Text style={{ color: "black", marginTop: 4 }}>{userData.email}</Text>
      <Text style={{ color: "black", marginTop: 4 }}>
        {userData.phoneNumber}
      </Text>
      {userData.role === "1" && (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon
            name="map-marker-radius"
            color="#777777"
            size={20}
            style={{ paddingRight: 10 }}
          />
          <View
            style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}
          >
            {cities.map((label, index) => (
              <View
                key={index}
                style={{
                  width: 60,
                  height: 30,
                  borderRadius: 50,
                  marginRight: 5,
                  backgroundColor: "#EFEFEF",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "#040404" }}>{label}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
      <View
        style={{
          flexDirection: "row",
          marginTop: 15,
          justifyContent: "space-between",
          marginHorizontal: 10,
          marginBottom: 5,
        }}
      >
        {userData.id === visitorData.id && (
          <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
            <Text
              style={{
                backgroundColor: "#E1E1E1",
                width: 150,
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 5,
                textAlign: "center",
                color: "black",
              }}
            >
              Edit Profile
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={handleShareProfile}>
          <Text
            style={{
              backgroundColor: "#E1E1E1",
              width: 150,
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 5,
              textAlign: "center",
              color: "black",
            }}
          >
            Share Profile
          </Text>
        </TouchableOpacity>
        {userData.id !== visitorData.id && (
          <TouchableOpacity
            onPress={() => {
              const message = `Hello, ${userData.name} I am interested in your car.`;
              const phoneNumber = userData.phoneNumber;
              const url = `whatsapp://send?text=${encodeURIComponent(
                message
              )}&phone=${phoneNumber}`;
              Linking.openURL(url);
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  backgroundColor: "#E1E1E1",
                  width: 150,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 5,
                  textAlign: "center",
                  color: "black",
                  marginLeft: 10,
                }}
              >
                <Icon name="whatsapp" size={18} color="green" /> Message
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
