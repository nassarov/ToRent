import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, FontAwesome5, Entypo, Fontisto, MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import HomeScreen from "../Screens/HomeScreen/HomeScreen";
import CarRentingScreen from "../Screens/HomeScreen/CarRentingScreen";

const Tab = createBottomTabNavigator();

const AddIconWithBorder = ({ focused }) => (
  <View
    style={{
      alignItems: "center",
      justifyContent: "center",
      top: 10,
      borderWidth: focused ? 2 : 0,
      borderColor: focused ? "#7F5AF0" : "transparent",
      borderRadius: 12,
      padding: focused ? 5 : 0,
    }}
  >
    <MaterialIcons
      name="add"
      size={24}
      color={focused ? "#7F5AF0" : "#A4A4A4"}
    />
  </View>
);

const TabNavigation = () => {
  const insets = useSafeAreaInsets();  // Use safe area insets for better compatibility with iOS devices

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: true,
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          backgroundColor: "#DADADA",
          borderRadius: 15,
          height: 50,
          paddingBottom: Platform.OS === 'ios' ? 0 : 5, // Adding padding bottom for iOS
          ...styles.shadow,
        },
        tabBarActiveTintColor: "#7F5AF0",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="home"
              size={24}
              color={focused ? "#7F5AF0" : "#A4A4A4"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Car"
        component={CarRentingScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              name="car"
              size={24}
              color={focused ? "#7F5AF0" : "#A4A4A4"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Post"
        component={CarRentingScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => <AddIconWithBorder focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Notification"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Fontisto
              name="bell"
              size={24}
              color={focused ? "#7F5AF0" : "#A4A4A4"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={CarRentingScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Entypo
              name="user"
              size={24}
              color={focused ? "#7F5AF0" : "#A4A4A4"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};


const styles = StyleSheet.create({
    shadow: {
      shadowColor: "#7F5DF0",
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.5,
      elevation: 5,
    },
  });
  
  export default TabNavigation;