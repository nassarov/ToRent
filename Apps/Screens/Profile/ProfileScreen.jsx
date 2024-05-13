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
import { useNavigation } from "@react-navigation/native";
export default function ProfileScreen({ route }) {
  const { userData, visitorData } = route.params;

  const db = getFirestore(app);
  const [userPosts, setUserPosts] = useState([]);
  const [favPosts,setFavPosts] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    navigation.addListener("focus", (e) => {
      fetchData();
      fetchFav();
      console.log("favPost",favPosts);
      console.log("CarData",userPosts)
    });
  }, [navigation]);
  useEffect(() => {
    
    console.log('DATA',userData.favorites)
  }, [favPosts]);

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

  const fetchFav = async () => {
    const querySnapshot = await getDocs(
      query(collection(db, "car_post"), where("carDetails.postId", "in", userData.favorites))
    );
    newData = [];
    querySnapshot.forEach((element) => {
      newData = [...newData, element.data()];
    });
    setFavPosts(newData);
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false} className='pb-5 bg-white'>
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        {userPosts && visitorData && (
          <>
            <ProfileHeader userData={userData} visitorData={visitorData} />
            <ProfileDetails
              userData={userData}
              visitorData={visitorData}
              numberOfPosts={userPosts.length}
            />
            <ListofCars userPosts={userPosts} favPosts={favPosts}/>
          </>
        )}
      </SafeAreaView>
    </ScrollView>
  );
}
