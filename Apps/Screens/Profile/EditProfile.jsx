import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ImageBackground,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import styles from "../../Components/ProfileComponents/profileStyle";
import * as ImagePicker from "expo-image-picker";

import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { app } from "../../../firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import userProfile from '../../../assets/Profile/DPI.jpg';
export default function EditProfile({ route }) {
  const navigation = useNavigation();
  const db = getFirestore(app);
  const { userData } = route.params;
  const [ProfileImage, setProfileImage] = useState(null);
  const [name, setName] = useState(userData.name);
  const [showButtons, setShowButtons] = useState(false);

  const onApply = async () => {
    console.log(1);
    let id = "";
    const querySnapshot = await getDocs(
      query(collection(db, "users"), where("email", "==", userData.email))
    );
    querySnapshot.forEach((doc) => {
      id = doc.id;
    });
    console.log(id);

    // Update user data using the retrieved ID
    if (id !== "") {
      await updateDoc(doc(db, "users", id), {
        // Update the fields you want here
        name: name,
        // Add more fields as needed
      });
      console.log("User data updated successfully!");
      userData.name = name;
      navigation.replace("HomeScreenStack", { userData: userData });
    } else {
      console.log("User not found!");
    }
  };
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [16, 12],
      quality: 0.5,
      
    });
  
    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }

    
  };

  const renderButtons = () => {
    if (showButtons) {
      return (
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <TouchableOpacity
           style={styles.panelButton}
            onPress={pickImage}
          >
            <Text style={styles.panelButtonTitle}>Choose Photo</Text>
          </TouchableOpacity>
         
          <TouchableOpacity
            style={[styles.panelButton , {marginLeft:10} ]}
            onPress={() => setShowButtons(false)}
            
          >
            <Text style={styles.panelButtonTitle}>Cancel</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <View style={{ margin: 20 }}></View>
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity
       
          onPress={() => setShowButtons(true)}
        >
          <View
            style={{
              height: 100,
              width: 100,
              borderRadius: 15,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ImageBackground
            
                source={ProfileImage? {uri: ProfileImage} : userProfile }
                setImage={setProfileImage}
              style={{ height: 100, width: 100 }}
              imageStyle={{ borderRadius: 15 }}
              
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Icon
                  name="camera"
                  size={35}
                  color="#fff"
                  style={{
                    opacity: 0.7,
                    alignItems: "center",
                    borderWidth: 1,
                    borderColor: "#fff",
                    borderRadius: 10,
                  }}
                />
              </View>
            </ImageBackground>
          </View>
        </TouchableOpacity>
        <Text style={{ marginTop: 10, fontSize: 18, fontWeight: "bold" }}>
          {name}
        </Text>

        <View style={styles.action}>
          <FontAwesome name="user-o" size={20} />
          <TextInput
            placeholder="Username"
            placeholderTextColor="#666666"
            value={name}
            onChangeText={(text) => setName(text)}
            style={styles.TextInput}
          ></TextInput>
        </View>

        {renderButtons()}

        <TouchableOpacity
          style={styles.ApplyButton}
          onPress={() => {
            onApply();
          }}
        >
          <Text style={styles.ApplyButtonText}>Apply</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
