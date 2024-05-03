import React from "react";
import { View, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, FontAwesome5, Entypo, Fontisto, MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HomeScreen from "../Screens/HomeScreen/HomeScreen";
import CarRentingScreen from '../Screens/HomeScreen/CarRentingScreen';
import CarRegistrationScreen from "../Screens/CarRegister/CarRegistrationScreen";
import CustomHeader2 from "../Components/CustomHeader2";

const Tab = createBottomTabNavigator();

const CustomTabButton = ({ children, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        top: -15,
        justifyContent: "center",
        alignItems: "center",
        ...styles.shadow,
      }}
      onPress={onPress}
    >
      <View style={{
        width: 50,
        height: 50,
        borderRadius: 20,
        backgroundColor: "#7F5AF0",
      }}>
        {children}
      </View>
    </TouchableOpacity>
  );
}

const TabNavigation = ({ route }) => {
  
  const { userRole } = route.params;
  console.log("HomeTabNAv",userRole);
  const insets = useSafeAreaInsets();  // Use safe area insets for better compatibility with iOS devices
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
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
      {userRole === '1' && (
        <Tab.Screen
          name="Post"
          component={CarRegistrationScreen}
          options={{
            headerShown: true,
            header: () => <CustomHeader2 text={'Add Your Car'} />,
            tabBarIcon: ({ focused }) =>
              (<MaterialIcons focused={focused} name="add" size={28} color="white" />),
            tabBarButton: (props) => (
              <CustomTabButton {...props} />
            ),
          }}
        />
      )}
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
