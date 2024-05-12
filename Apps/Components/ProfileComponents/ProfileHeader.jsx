import { View, Text, Alert } from 'react-native';
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { getAuth, signOut } from "firebase/auth";
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function ProfileHeader({ userData }) {
    const navigation = useNavigation();
    const [userName, setUserName] = useState("");
    const auth = getAuth();

    useEffect(() => {
        if (userData && userData.name) {
            setUserName(userData.name);
        }
        navigation.addListener("focus", (e) => {
            if (userData && userData.name) {
                setUserName(userData.name);
            }
        });
    }, [userData, navigation]);

    const handleLogout = () => {
        Alert.alert(
            "Logout",
            "Are you sure you want to log out?",
            [
                {
                    text: "No",
                    onPress: () => console.log("Logout cancelled"),
                    style: "cancel"
                },
                {
                    text: "Yes",
                    onPress: async () => {
                        try {
                            await signOut(auth);
                            navigation.replace("Registration");
                        } catch (error) {
                            console.error("Failed to sign out:", error);
                        }
                    }
                }
            ]
        );
    };

    return (
        <View style={{ paddingHorizontal: 15, paddingTop: 10, height: 55 }}>
            <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: "center" }}>
                <Text style={{ fontSize: 22, fontWeight: "500", color: "black" }}>@{userName}</Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity onPress={handleLogout}>
                        <Text style={{ fontSize: 18, color: "red" }}>Logout </Text>
                    </TouchableOpacity>
                    <MaterialIcons name="logout" size={18} color="gray" />
                </View>
            </View>
        </View>
    );
}
