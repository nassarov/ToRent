import { View, Text } from 'react-native'
import React from 'react'

export default function ProfileScreen({route}) {
    const {userData}=route.params;
    console.log(userData)
  return (
    <View>
      <Text>{userData.name+" "+userData.email}</Text>
    </View>
  )
}