import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  AntDesign,
  FontAwesome5,
  Entypo,
  Fontisto,
  MaterialIcons,
} from "@expo/vector-icons";
import HomeScreen from "../Screens/HomeScreen/HomeScreen";
import CarRegistrationScreen from "../Screens/CarRegister/CarRegistrationScreen";
import CustomHeader2 from "../Components/CustomHeader2";
import ProfileScreen from "../Screens/Profile/ProfileScreen";
import Notification from "../Screens/Notification/Notification";
import Trips from "../Screens/Trips/Trips";

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
      <View
        style={{
          width: 50,
          height: 50,
          borderRadius: 20,
          backgroundColor: "#7F5AF0",
        }}
      >
        {children}
      </View>
    </TouchableOpacity>
  );
};

const TabNavigation = ({ route }) => {
  const { userData } = route.params;
  const [newNotifications, setNewNotifications] = useState(0);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          flex: 1,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          backgroundColor: "#DADADA",
          borderRadius: 15,
          height: 50,
          paddingBottom: Platform.OS === "ios" ? 0 : 5, // Adding padding bottom for 
          ...styles.shadow,
        },
        tabBarActiveTintColor: "#7F5AF0",
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        initialParams={{ userData: userData }}
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
        name="TripsTab"
        component={Trips}
        initialParams={{ userData: userData }}
        options={{
          headerShown: true,
          header: () => <CustomHeader2 text={" Trips"} />,
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              name="car"
              size={24}
              color={focused ? "#7F5AF0" : "#A4A4A4"}
            />
          ),
        }}
      />
      {userData.role === "1" && (
        <Tab.Screen
          name="Post"
          // component={CarRegistrationScreen}
          component={CarRegistrationScreen}
          initialParams={{ userData: userData }}
          options={{
            headerShown: true,
            header: () => <CustomHeader2 text={"Add Your Car"} />,
            tabBarIcon: ({ focused }) => (
              <MaterialIcons
                focused={focused}
                name="add"
                size={28}
                color="white"
              />
            ),
            tabBarButton: (props) => <CustomTabButton {...props} />,
          }}
        />
      )}
      <Tab.Screen
      name="NotificationTab"
      component={Notification}
      initialParams={{ userData:userData, setNewNotifications }}
      options={{
        headerShown: true,
        tabBarBadge:newNotifications,
        header: () => <CustomHeader2 text={"Notifications"} />,
        tabBarIcon: ({ focused }) => (
          <View>
            <Fontisto
              name="bell"
              size={24}
              color={focused ? "#7F5AF0" : "#A4A4A4"}
            />
            {/* {newNotifications && <Badge status="error" containerStyle={{ position: 'absolute', top: -4, right: -4 }} />} */}
          </View>
        ),
      }}
    />

      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        initialParams={{ userData: userData, visitorData: userData }}
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
