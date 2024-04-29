import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, FontAwesome5, Entypo, Fontisto, MaterialIcons } from '@expo/vector-icons';

import HomeScreen from "../Screens/HomeScreen/HomeScreen";
import CarRentingScreen from '../Screens/HomeScreen/CarRentingScreen';

const Tab = createBottomTabNavigator();



const AddIconWithBorder = ({ focused }) => (
  <View style={{
    alignItems: 'center',
    justifyContent: 'center',
    top: 10,
    borderWidth: focused ? 2 : 0, 
    borderColor: focused ? '#7F5AF0' : 'transparent',
    borderRadius: 12,
    padding: focused ? 5 : 0, 
  }}>
    <MaterialIcons name={focused ? 'add' : 'add'} size={24} color={focused ? '#7F5AF0' : '#A4A4A4'} />
  </View>
);

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          display: 'flex'
        },
        tabBarOptions: {
          style: {
            position: 'absolute',
            bottom: 25,
            left: 20,
            right: 20,
            elevation: 0,
            backgroundColor: "#DADADA",
            borderRadius: 15,
            height: 90,
            ...styles.shadow
          },
          activeTintColor: '#7F5AF0',
        }
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
              <AntDesign name={focused ? 'home' : 'home'} size={24} color={focused ? '#7F5AF0' : '#A4A4A4'} />
            </View>
          )
        }}
      />
      <Tab.Screen
        name="Car"
        component={CarRentingScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
              <FontAwesome5 name={focused ? 'car' : 'car'} size={24} color={focused ? '#7F5AF0' : '#A4A4A4'} />
            </View>
          )
        }}
      />
      <Tab.Screen
        name="Post"
        component={CarRentingScreen}
        options={{
          tabBarIcon: ({ focused }) => <AddIconWithBorder focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Notification"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
              <Fontisto name={focused ? 'bell' : 'bell-alt'} size={24} color={focused ? '#7F5AF0' : '#A4A4A4'} />
            </View>
          )
        }}
      />
      <Tab.Screen
        name="Profile"
        component={CarRentingScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', top: 10 }}>
              <Entypo name={focused ? 'user' : 'user'} size={24} color={focused ? '#7F5AF0' : '#A4A4A4'} />
            </View>
          )
        }}
      />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5
  }
})

export default TabNavigation;
