import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import styles from "../../Components/ProfileComponents/profileStyle";
import Slider from "../../Components/HomeComponents/Slider";
import { Icon } from "react-native-elements";

export default function ListOfcars({ userPosts }) {
  const slide = false;
 console.log(userPosts)

  return (
    <ScrollView style={styles.infoBoxWrapper}>
    
      <View style={styles.infoBox}>
        <Slider cars={userPosts} slideway={slide} />
      </View>
    </ScrollView>
  );
}
