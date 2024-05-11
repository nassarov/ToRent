import { View, StyleSheet, Text } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import UserProfile from "../../Components/ProfileComponents/UserProfile";
import ListofCars from "../../Components/ProfileComponents/ListOfcars";
import { useEffect } from "react";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { app } from "../../../firebaseConfig";
import ProfileHeader from "../../Components/ProfileComponents/ProfileHeader";
import ProfileDetails from "../../Components/ProfileComponents/ProfileDetails";
import { ScrollView } from "react-native-gesture-handler";
export default function ProfileScreen({ route }) {
  const { userData } = route.params;
  const db = getFirestore(app);
  const [userPosts, setUserPosts] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const querySnapshot = await getDocs(
      query(collection(db, "car_post"), where("ownerId", "==", userData.id))
    );
    newData = [];
    querySnapshot.forEach((element) => {
      newData = [...newData, element.data()];
    });
    setUserPosts(newData);
  };
  return (
    <ScrollView>

    <SafeAreaView style={{ flex: 1 ,backgroundColor:"white" }}>
      <ProfileHeader userData={userData}/>
<ProfileDetails userData={userData} numberOfPosts={userPosts.length} />
 
      <ListofCars userPosts={userPosts} />
    </SafeAreaView>
    </ScrollView>
  );
}
