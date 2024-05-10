import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Touchable } from 'react-native';
import { Avatar, Title, Caption } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../../Components/ProfileComponents/profileStyle'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getAuth, signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from '@expo/vector-icons';
export default function UserProfile({ userData }) {
  const profileimage = userData.profileImage;
  const UserRole = userData.role;
  const [cities, setCities] = useState([]);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const auth = getAuth();
  
  const [role, setRole] = useState("");
  const navigation = useNavigation();
  useEffect(() => {
    handleRole();
  }, []);

  useEffect(() => {
    navigation.addListener('focus',(e)=>{
      setCities(userData.addresses.map(address => address.label))
      setUserName(userData.name)
      setUserEmail(userData.email)
      setUserPhoneNumber(userData.phoneNumber)
      handleRole()
    })  
  },[navigation])

  const handleRole = () => {
    if (UserRole === "1") {
      setRole("Car Owner");
    } else {
      setRole("Client");
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.replace("Registration");
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };
  return (
    <View>
      <View style={{position:"absolute" , top: 1 , right:0 , padding:10, flexDirection:"row"}}>

      <TouchableOpacity onPress={handleLogout}>
          <Text style={{fontSize:16 , color:"red"}} >Logout </Text>
        </TouchableOpacity>
        <MaterialIcons name="logout" size={18} color="black" />
      </View>
      <View style={{ flexDirection: 'row', marginTop: 15, alignItems: 'center' }}>
        <Avatar.Image
          source={{
            uri: profileimage,
          }}
          size={80}
        />
        <View style={{ marginLeft: 10 }}>
          <Title style={styles.title}>{ userName }</Title>
          <Caption style={styles.caption}>@{userName}</Caption>
        </View>
      </View>

      <View style={[styles.userInfoSection , {marginTop:16}]}>
        {cities.map((label, index) => (
          <View key={index} style={styles.row}>
            <Icon name="map-marker-radius" color='#777777' size={20} style={{ paddingRight: 10 }} />
            <Text style={{ color: "#777777" }}>{index + 1}-{label}, Lebanon</Text>
          </View>
        ))}

        <View style={styles.row}>
          <Icon name='phone' color="#777777" size={20} style={{ paddingRight: 10 }} />
          <Text style={{ color: "#777777" }}>{userPhoneNumber}</Text>
        </View>

        <View style={styles.row}>
          <Icon name='email' color="#777777" size={20} style={{ paddingRight: 10 }} />
          <Text style={{ color: "#777777" }}>{userEmail}</Text>
        </View>

        <View style={styles.row}>
          <Icon name='account' color="#777777" size={20} style={{ paddingRight: 10 }} />
          <Text style={{ color: "#777777" }}>{role}</Text>
        </View>

        <View>

        <TouchableOpacity style={{width:110}}   onPress={() => navigation.navigate("EditProfile")}> 
      <View style={[styles.row, { alignItems: 'center' }]}>
        <Icon name='account-edit' color="#000" size={25} style={{ paddingRight: 10 }} />
        <Text style={{ color: "#777777" }}>Edit Profile</Text>
      </View>
      </TouchableOpacity>
      </View>

      </View>
    </View>
  );
};
