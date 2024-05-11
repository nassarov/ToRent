import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import styles from "../../Components/ProfileComponents/profileStyle";
import Slider from "../../Components/HomeComponents/Slider";
import { Icon } from "react-native-elements";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import PostCard from "../../Components/HomeComponents/PostCard"; // Import your PostCard component here

export default function ListOfcars({ userPosts }) {
  const [selected, setSelected] = useState(1);

  return (
    <View style={{ marginTop: 20, }}>
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
            name="car-rental"
            size={24}
            color={selected === 2 ? "black" : "#6B6B6B"}
            style={{ alignSelf: "center" }}
          />
        </TouchableOpacity>
      </View>

      {selected === 1 ? (
        <FlatList
          data={userPosts}
          numColumns={2}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={true}
          renderItem={({ item }) => (
            <View style={{ flex: 1 }}>
              <View style={{ margin: 8 }}>
                <PostCard

                  car={item.carDetails.carData}
                  imageUrls={item.carDetails.imageUrls}
                  ownerId={item.ownerId}
                  ownerData={item.ownerData || {}}
                  horizontal={false}
                />
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={{justifyContent:"center" , alignItems:"center"}}>

        <Text style={{alignSelf:"center"}} >There are no rented cars yet!</Text>
        </View>
      )}
    </View>
  );
}
