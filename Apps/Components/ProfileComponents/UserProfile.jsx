import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Touchable } from 'react-native';
import { Avatar, Title, Caption } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../../Components/ProfileComponents/profileStyle'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from "@react-navigation/native";
export default function UserProfile({ userData }) {
  const cities = userData.addresses.map(address => address.label);
  const UserRole = userData.role;
  const [role, setRole] = useState("");
  const navigation = useNavigation();
  useEffect(() => {
    handleRole();
  }, []);

  const handleRole = () => {
    if (UserRole === "1") {
      setRole("Car Owner");
    } else {
      setRole("Client");
    }
  }

  return (
    <View>
      <View style={{ flexDirection: 'row', marginTop: 15, alignItems: 'center' }}>
        <Avatar.Image
          source={{
            uri: "https://api.adorable.io/avatars/80/abott@adorable.png",
          }}
          size={80}
        />
        <View style={{ marginLeft: 10 }}>
          <Title style={styles.title}>{userData.name}</Title>
          <Caption style={styles.caption}>@{userData.name}</Caption>
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
          <Text style={{ color: "#777777" }}>{userData.phoneNumber}</Text>
        </View>

        <View style={styles.row}>
          <Icon name='email' color="#777777" size={20} style={{ paddingRight: 10 }} />
          <Text style={{ color: "#777777" }}>{userData.email}</Text>
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
