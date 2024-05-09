import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import styles from "../../Components/ProfileComponents/profileStyle";
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
export default function EditProfile({ route }) {
  const navigation = useNavigation();
  const db = getFirestore(app);
  const { userData } = route.params;

  const [name, setName] = useState(userData.name);

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
      userData.name=name
      navigation.replace("HomeScreenStack", { userData: userData });
    } else {
      console.log("User not found!");
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ margin: 20 }}></View>
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity>
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
              source={{
                uri: "https://api.adorable.io/avatars/80/abott@adorable.png",
              }}
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
