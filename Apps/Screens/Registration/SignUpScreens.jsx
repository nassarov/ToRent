import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import {useNavigation} from '@react-navigation/native';

export default function SignUpScreens() {
  const navigation=useNavigation();
  return (
    <View >
    <View >
  <Text>Sign Up</Text>
  </View>
  
  <View>
  <TextInput placeholder='Name'/>

   <TextInput placeholder='Email' />

   <TextInput placeholder='Password' />

   <TextInput placeholder='Confirm Password' />

   <TouchableOpacity onPress={()=>navigation.push('login')}><Text>SignUp</Text></TouchableOpacity>


  </View>
</View>
  )
}