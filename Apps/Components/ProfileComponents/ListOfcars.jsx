import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import styles from "../../Components/ProfileComponents/profileStyle";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import PostCard from "../../Components/HomeComponents/PostCard";
import { collection, query, where, onSnapshot, getFirestore, getDoc, doc } from "firebase/firestore";
import { app } from "../../../firebaseConfig";

const windowWidth = Dimensions.get('window').width;

export default function ListOfcars({ userPosts, visitorData, userData }) {
  const [selected, setSelected] = useState(1);
  const [favPosts, setFavPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selected === 2 && userData.id === visitorData.id) {
      fetchFavPosts();
    }
  }, [selected, userData.favorites]);

  const fetchFavPosts = async () => {
    setLoading(true);
    const db = getFirestore(app);
    const favPostsQuery = query(collection(db, "car_post"), where("carDetails.postId", "in", userData.favorites));

    const unsubscribe = onSnapshot(favPostsQuery, (snapshot) => {
      const newData = [];
      snapshot.forEach((doc) => {
        newData.push(doc.data());
      });
      setFavPosts(newData);
      setLoading(false);
    });

    return unsubscribe;
  };

  return (
    <View style={{ marginTop: 10 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 15 }}>
        <TouchableOpacity
          style={{ width: 98, padding: 15, borderBottomWidth: selected === 1 ? 2 : 0, borderColor: selected === 1 ? "black" : "transparent" }}
          onPress={() => setSelected(1)}
        >
          <MaterialCommunityIcons
            name="view-grid-outline"
            size={24}
            color={selected === 1 ? "black" : "#6B6B6B"}
            style={{ alignSelf: "center" }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{ width: 98, padding: 15, borderBottomWidth: selected === 2 ? 2 : 0, borderColor: selected === 2 ? "black" : "transparent" }}
          onPress={() => setSelected(2)}
        >
          <MaterialIcons
            name="bookmarks"
            size={24}
            color={selected === 2 ? "black" : "#6B6B6B"}
            style={{ alignSelf: "center" }}
          />
        </TouchableOpacity>
      </View>

      {selected === 1 ? (
        userPosts.length > 0 ? (
          <FlatList
            data={userPosts}
            numColumns={2}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false}
            contentContainerStyle={style.container}
            renderItem={({ item }) => (
              <View style={{ flex: 1 }}>
                <View style={{ margin: 8 }}>
                  <PostCard
                    car={item.carDetails.carData}
                    imageUrls={item.carDetails.imageUrls}
                    ownerId={item.ownerId}
                    ownerData={item.ownerData || {}}
                    horizontal={false}
                    postId={item.carDetails.postId}
                  />
                </View>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <Text className='text-center text-xl mt-4'>No posts are added</Text>
        )
      ) : (
        <View style={{ flex: 1 }}>
          {userData.id === visitorData.id ? ( // Display favPosts only if visitor is viewing their own profile
            loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : favPosts.length > 0 ? (
              <FlatList
                data={favPosts}
                numColumns={2}
                showsHorizontalScrollIndicator={false}
                scrollEnabled={false}
                contentContainerStyle={style.container}
                renderItem={({ item }) => (
                  <View style={{ flex: 1 }}>
                    <View style={{ margin: 8 }}>
                      <PostCard
                        car={item.carDetails.carData}
                        imageUrls={item.carDetails.imageUrls}
                        ownerId={item.ownerId}
                        ownerData={item.ownerData || {}}
                        horizontal={false}
                        postId={item.carDetails.postId}
                      />
                    </View>
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
              />
            ) : (
              <Text className='text-center text-xl mt-4'>No favorite posts yet</Text>
            )
          ) : (
            <Text className='text-center text-xl mt-4'>This profile favorite posts are private</Text>
          )}
        </View>
      )}
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    marginBottom: 50,
    paddingHorizontal: 4,
    paddingTop: 4,
  },
});
