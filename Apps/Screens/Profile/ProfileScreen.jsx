import { View, StyleSheet} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import UserProfile from '../../Components/ProfileComponents/UserProfile'
import ListofCars from '../../Components/ProfileComponents/ListOfcars'
export default function ProfileScreen({ route }) {
    const { userData } = route.params;
    
  return (
    <SafeAreaView style={{flex:1}}>
  <UserProfile userData={userData}/>
  <ListofCars  userData={userData}/>

    </SafeAreaView>
  )
}
