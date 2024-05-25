import React, { useState, useEffect } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  Text,
} from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useNavigation } from "@react-navigation/native";
import PostCard from "../../Components/HomeComponents/PostCard";
import {
  onSnapshot,
  getFirestore,
  doc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { app } from "../../../firebaseConfig";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { get } from "firebase/database";

const Tab = createMaterialTopTabNavigator();

export default function ListOfCars({ userPosts, visitorData, userData }) {
  const navigation = useNavigation();
  const [favPosts, setFavPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const isProfileOwner = userData.id === visitorData.id;

  useEffect(() => {
    if (isProfileOwner) {
      const unsubscribe = fetchFavPosts();
      return unsubscribe;
    }
  }, [userData, isProfileOwner]);

  const fetchFavPosts = () => {
    setLoading(true);
    const db = getFirestore(app);
    const userDocRef = doc(db, "users", userData.id);

    const unsubscribe = onSnapshot(userDocRef, (snapshot) => {
      const updatedUserData = snapshot.data();
      if (
        updatedUserData &&
        updatedUserData.favorites &&
        updatedUserData.favorites.length > 0
      ) {
        const favPostsQuery = query(
          collection(db, "car_post"),
          where("carDetails.postId", "in", updatedUserData.favorites)
        );
        const favPostsUnsubscribe = onSnapshot(
          favPostsQuery,
          async (snapshot) => {
            let newData = [];
            // Using Promise.all to wait for all async tasks to complete
            await Promise.all(
              snapshot.docs.map(async (postDoc) => {
                const querySnapshot = await getDocs(
                  query(
                    collection(db, "users"),
                    where("id", "==", postDoc.data().ownerId)
                  )
                );
                querySnapshot.forEach((doc) => {
                  newData.push({
                    favData: postDoc.data(),
                    ownerData: doc.data(), // Assuming you want to include the owner data
                  });
                });
              })
            );
            setFavPosts(newData);
            setLoading(false);
          }
        );
        return favPostsUnsubscribe;
      } else {
        // If userData.favorites is empty or undefined, set favPosts to an empty array
        setFavPosts([]);
        setLoading(false);
      }
    });

    return unsubscribe;
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIndicatorStyle: { backgroundColor: "#7F5AF0" },
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "YourPosts") {
            iconName = "view-grid-outline";
          } else if (route.name === "Favorites") {
            iconName = "bookmark-multiple";
          }
          return (
            <MaterialCommunityIcons name={iconName} size={23} color={color} />
          );
        },
        tabBarLabel: () => null,
      })}
    >
      <Tab.Screen name="YourPosts">
        {() => (
          <FlatList
            scrollEnabled={false}
            data={userPosts}
            numColumns={2}
            renderItem={({ item }) => (
              <View style={{ flex: 1 }}>
                <View style={{ margin: 8 }}>
                  <PostCard
                    car={item.carDetails.carData}
                    imageUrls={item.carDetails.imageUrls}
                    ownerId={item.ownerId}
                    ownerData={userData}
                    horizontal={false}
                    postId={item.carDetails.postId}
                  />
                </View>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
          />
        )}
      </Tab.Screen>
      <Tab.Screen name="Favorites">
        {() => (
          <View>
            {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : isProfileOwner ? (
              favPosts.length > 0 ? (
                <FlatList
                  scrollEnabled={false}
                  data={favPosts}
                  numColumns={2}
                  renderItem={({ item }) => (
                    <View style={{ flex: 1 }}>
                      <View style={{ margin: 8 }}>
                        <PostCard
                          car={item.favData.carDetails.carData}
                          imageUrls={item.favData.carDetails.imageUrls}
                          ownerId={item.ownerId}
                          ownerData={item.ownerData}
                          horizontal={false}
                          postId={item.favData.carDetails.postId}
                        />
                      </View>
                    </View>
                  )}
                  keyExtractor={(item, index) => index.toString()}
                  showsVerticalScrollIndicator={false}
                />
              ) : (
                <View style={{ alignItems: "center", marginTop: 20 }}>
                  <Text style={{ fontSize: 20 }}>No favorite posts yet</Text>
                </View>
              )
            ) : (
              <View style={{ alignItems: "center", marginTop: 20 }}>
                <Text style={{ fontSize: 20 }}>
                  This profile's favorite posts are private
                </Text>
              </View>
            )}
          </View>
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
