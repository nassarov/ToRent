import { View, Text } from "react-native";
import React from "react";
import CarRentingScreen from "../Screens/HomeScreen/CarRentingScreen";
import HomeScreen from "../Screens/HomeScreen/HomeScreen";
import { createStackNavigator } from "@react-navigation/stack";
import Filter from "../Components/HomeComponents/Filter";
import CustomHeader2 from "../Components/CustomHeader2";
import TabNavigation from "./TabNavigation";
import PickImagesScreen from "../Screens/CarRegister/PickImagesScreen";

const Stack = createStackNavigator();
export default function HomeScreenNavigation({route}) {
  
  const { userRole } = route.params;
  console.log("HomeNAv",userRole);
  return (
    <Stack.Navigator initialRouteName="homescreen">
      <Stack.Screen
        name="carrenting"
        component={CarRentingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="homescreen"
        component={TabNavigation}
        initialParams={{userRole:userRole}}
        options={{ headerShown: false }}
        
      />
      <Stack.Screen
        name="filter"
        component={Filter}
        options={{ header:() => <CustomHeader2/>}}
     
      />
      <Stack.Screen 
      name="PickImagesScreen"
      component={PickImagesScreen}
      />
    </Stack.Navigator>
  );
}
