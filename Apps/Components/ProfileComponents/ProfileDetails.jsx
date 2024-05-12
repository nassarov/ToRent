import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Avatar, Title, Caption } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "../ProfileComponents/profileStyle";
import { TouchableOpacity } from "react-native-gesture-handler";
export default function ProfileDetails({ userData, numberOfPosts, ownerId }) {
  const navigation = useNavigation();
  const profileimage = userData.profileImage;
  const [userEmail, setUserEmail] = useState("");
  const [cities, setCities] = useState([]);

  const [userPhoneNumber, setUserPhoneNumber] = useState("");

  const UserRole = userData.role;

  const [role, setRole] = useState("");

  const handleRole = () => {
    if (UserRole === "1") {
      setRole("Car Owner");
    } else {
      setRole("Client");
    }
  };
  useEffect(() => {
    handleRole();
  }, []);

  useEffect(() => {
    navigation.addListener("focus", (e) => {
      setCities(userData.addresses.map((address) => address.label));
      setUserEmail(userData.email);
      setUserPhoneNumber(userData.phoneNumber);
      handleRole();
    });
  }, [navigation]);

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
            uri: profileimage,
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
        <View style={{ width: 75, alignItems: "center" }}>
          <Text style={{ fontSize: 15, fontWeight: "bold", color: "black" }}>
            {userData.role === "1" ? "Car Owner" : "Client"}
          </Text>
          <Text style={{ fontSize: 16, color: "black" }}>Role</Text>
        </View>
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
      <View
        style={{
          flexDirection: "row",
          marginTop: 15,
          justifyContent: "space-between",
          marginHorizontal: 10,
          marginBottom: 5,
        }}
      >
        {ownerId === userData.id && (
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

        <TouchableOpacity>
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
      </View>
    </View>
  );
}
