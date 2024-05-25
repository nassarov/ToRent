import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  ActivityIndicator,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import styles from "../../Components/ProfileComponents/profileStyle";
import * as ImagePicker from "expo-image-picker";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { app } from "../../../firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import userProfile from "../../../assets/Profile/DPI.jpg";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

export default function EditProfile({ route }) {
  const navigation = useNavigation();
  const db = getFirestore(app);
  const storage = getStorage()
  const { userData } = route.params;
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState(userData.name);
  const [showButtons, setShowButtons] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const onApply = async () => {
    setLoading(true);
    setModalVisible(true);
    try {
      if (profileImage) {
        const imageUrl = await uploadImageToStorage(
          profileImage,
          userData.email
        );

        const querySnapshot = await getDocs(
          query(collection(db, "users"), where("email", "==", userData.email))
        );

        querySnapshot.forEach(async (doc) => {
          await updateDoc(doc.ref, {
            name: name,
            profileImage: imageUrl,
          });
        });

        userData.name = name;
        userData.profileImage = imageUrl;
        
      } else {
        
        const querySnapshot = await getDocs(
          query(collection(db, "users"), where("email", "==", userData.email))
        );
        querySnapshot.forEach(async (doc) => {
          await updateDoc(doc.ref, {
            name: name,
          });
        });

        userData.name = name;
      }
      setLoading(false);
      setModalVisible(false);
      navigation.goBack({ userData: userData });
    } catch (error) {
      console.error("Error updating profile:", error);
      setLoading(false);
      setModalVisible(false);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.4,
    });

    if (!result.cancelled) {
      setProfileImage(result.assets[0].uri);
    }
  };
  const uploadImageToStorage = async (image) => {
    try {
      const response = await fetch(image);
      const blob = await response.blob();
      const storageRef = ref(storage, `profile_Images/${userData.email}`);
      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
      
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error; 
    }
  };

  const renderButtons = () => {
    if (showButtons) {
      return (
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <TouchableOpacity style={styles.panelButton} onPress={pickImage}>
            <Text style={styles.panelButtonTitle}>Choose Photo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.panelButton, { marginLeft: 10 }]}
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
        <TouchableOpacity onPress={() => setShowButtons(true)}>
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
              source={
                profileImage
                  ? { uri: profileImage }
                  : userData.profileImage
                  ? { uri: userData.profileImage }
                  : userProfile
              }
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

       <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <View className='flex-1 items-center justify-center bg-slate-200'>
            <Text>Updating Your Profile's Data </Text>
            <ActivityIndicator size="large" color="#7F5DF0" />
          </View>
        </Modal>
        
    </View>
  );
}
