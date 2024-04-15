import { View, Text } from 'react-native'
import React from 'react'

export default function ForgotPasswordScreen  () {
  return (
    <View>
      <Text>Forgot Password?</Text>
      <Text>Please input your email or phone number to recover your acount</Text>
      <Text>Email address OR Phone number </Text>
      <TextInput placeholder='Email/Phone number'></TextInput>
      <TouchableOpacity><Text>Recover Account</Text></TouchableOpacity>
    </View>
  )
}

