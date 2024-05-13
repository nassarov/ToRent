import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Dimensions } from "react-native";
import styles from "../../Components/ProfileComponents/profileStyle";
import Slider from "../../Components/HomeComponents/Slider";
import { Icon } from "react-native-elements";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import PostCard from "../../Components/HomeComponents/PostCard"; // Import your PostCard component here
const windowWidth = Dimensions.get('window').width;

export default function ListOfcars({ userPosts ,favPosts,visitorData ,userData}) {

  const slide = false;

  const [selected, setSelected] = useState(1);


  return (
    <View style={{ marginTop: 10, }}>
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
          onPress={() => setSelected(2)}>

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
  visitorData.id === userData.id ? (
    favPosts.length > 0 ? (
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
      <Text className='text-center text-xl mt-4'>No favorite posts yet </Text>
    )
  ) : (
    <Text className='text-center text-xl mt-4'>You are not allowed to view saved posts</Text>
  )
)}

    </View>
  );
}

const style = StyleSheet.create({
  container: {
    marginBottom:50,
    paddingHorizontal: 4,
    paddingTop: 4,
  },
  itemContainer: {
    flex: 1,
    margin: 4,
    width: (windowWidth - 16) /2, // Adjusted width to fit two columns
  },
});
