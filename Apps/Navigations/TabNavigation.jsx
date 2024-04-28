import { View, Text, KeyboardAvoidingView } from 'react-native'
import React from 'react'
// import HomeScreen from '../Screens/HomeScreen/HomeScreen';
// import ProfileScreen from '../Screens/Profile/ProfileScreen';
// import BookingScreen from '../Screens/Booking/BookingScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import HomeScreenNavigation from './HomeScreenNavigation';

const Tab = createBottomTabNavigator();

export default function TabNaviagtion() {
    return (
            // color:"#8E3FFF"
        <View className="flex-1">
         <Tab.Navigator className="" 
         screenOptions={{headerShown:false, headerBackground:'light',tabBarActiveTintColor:"#8E3FFF",
          tabBarStyle: {
            height: 55, 
            paddingBottom: 0, 
            paddingTop: 5, 
            },}}
         >
             <Tab.Screen name="home" component={HomeScreenNavigation} 
             options={{tabBarLabel:
                 ({color})=>(
                 <Text style={{color:color,fontSize:12, marginBottom:5,
                }}>Home</Text>
                 ),
                 tabBarIcon:({color,size}) =>(
                    <FontAwesome5 name="home" size={24} color={color}/>
                ),
                

               }}   
             />
              {/* <Tab.Screen name="booking" component={BookingScreen} 
             options={{tabBarLabel:
                 ({color})=>(
                 <Text style={{color:color,fontSize:12, marginBottom:5}}>Booking</Text>
                 ),
                 tabBarIcon:({color,size}) =>(
                    <Ionicons name="bookmarks" size={24} color={color} />
                 )
                 }} 
             />
             <Tab.Screen name="profile" component={ProfileScreen}
             options={{tabBarLabel:
                 ({color})=>(
                     <Text style={{color:color,fontSize:12, marginBottom:5}}>Profile</Text>
                 ),
                 tabBarIcon:({color,size}) =>(
                     <Octicons name="feed-person" size={24} color={color} />
                 )
              }}
             /> */}
         </Tab.Navigator>
         </View>
     )}