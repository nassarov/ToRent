import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import UserProfile from "../../Components/ProfileComponents/UserProfile";
import ListofCars from "../../Components/ProfileComponents/ListOfcars";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
  onSnapshot // Import onSnapshot for real-time updates
} from "firebase/firestore";
import { app } from "../../../firebaseConfig";
import ProfileHeader from "../../Components/ProfileComponents/ProfileHeader";
import ProfileDetails from "../../Components/ProfileComponents/ProfileDetails";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

export default function ProfileScreen({ route }) {
  const { userData, visitorData } = route.params;
  const db = getFirestore(app);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading indicator
  const navigation = useNavigation();

  useEffect(() => {
    navigation.addListener("focus", (e) => {
    const unsubscribeUserPosts = fetchData();
    // Cleanup subscriptions on unmount
    return () => {
      unsubscribeUserPosts();
    };
  })}, [navigation,userData]);

  const fetchData = () => {
    setUserPosts([]);
    const userPostsQuery = query(collection(db, "car_post"), where("ownerId", "==", userData.id));
    const unsubscribe = onSnapshot(userPostsQuery, (snapshot) => {
      const newData = [];
      snapshot.forEach((doc) => {
        newData.push(doc.data());
      });
      setUserPosts(newData);
      setLoading(false); // Set loading to false once data is fetched
    });
    return unsubscribe;
  };
   
  return (
    <ScrollView showsVerticalScrollIndicator={false} className='pb-5 bg-white'>
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        {loading ? ( // Show loading indicator if data is being fetched
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            <ProfileHeader userData={userData} visitorData={visitorData} />
            <ProfileDetails
              userData={userData}
              visitorData={visitorData}
              numberOfPosts={userPosts.length}
            />
            <ListofCars userPosts={userPosts} visitorData={visitorData} userData={userData}/>
          </>
        )}
      </SafeAreaView>
      <View className='mb-[55px]'></View>
    </ScrollView>
  );
}