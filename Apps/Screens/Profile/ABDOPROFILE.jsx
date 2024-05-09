import React, { useState } from "react";
import { View, Text, Image,  StyleSheet, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";

export default function ProfileScreensss({ route }) {
  const { userData } = route.params;
  const [profilePic, setProfilePic] = useState(userData.profilePic);

  const handleProfilePicChange = async () => {
    Alert.alert(
      "Change Profile Picture",
      "Do you want to change your profile picture?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: async () => {
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (permissionResult.granted === false) {
              alert("Permission to access camera roll is required!");
              return;
            }

            const pickerResult = await ImagePicker.launchImageLibraryAsync({
              allowsEditing: true,
              aspect: [4, 3],
              quality: 1,
            });

            if (!pickerResult.cancelled && pickerResult.uri) {
              console.log("Selected image URI:", pickerResult.uri);
              setProfilePic(pickerResult.uri); // Update profile pic with selected image URI
              console.log("Profile picture updated.");
            }else {
              console.log("Image selection cancelled:", pickerResult.cancelled);
              console.log("Selected image URI:", pickerResult.uri);
              // Inform the user that the image selection was cancelled
              Alert.alert("Image Selection Cancelled", "You did not select any image.");
            }
            
          }
        }
      ],
      { cancelable: false }
    );
  };

  return userData.role === "0" || userData.role === "1" ? (
    <View style={{ paddingTop: Constants.statusBarHeight }}>
      <TouchableOpacity onPress={handleProfilePicChange}>
        <Image source={{ uri: profilePic }} style={styles.profilePic} />
      </TouchableOpacity>
      <Text>{userData.name}</Text>
    </View>
  ) : (
    <View>
      <Text>Only Logged In users can see their profile page</Text>
      <TouchableOpacity>
        <Text>LogIn</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50, // Make it round
  },
});
