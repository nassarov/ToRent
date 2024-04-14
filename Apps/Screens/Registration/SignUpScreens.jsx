import { View, Text , StyleSheet, TextInput, TouchableOpacity} from 'react-native'
import React from 'react'

const SignUpScreens = () => {
  return (
    <View >
        <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      </View>
      
      <View>
        <TextInput placeholder='Name'/>

       < TextInput placeholder='Email' />

       < TextInput placeholder='Password' />

       < TextInput placeholder='Confirm Password' />

       <TouchableOpacity onPress={{}}><Text>Sign Up</Text></TouchableOpacity>


      </View>
    </View>
  )
}

export default SignUpScreens

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start', 
      alignItems: 'center', 
      paddingTop: 50, 
    },

    title: {
      fontWeight: 'bold',
      fontSize: 30,
      textAlign: 'center',
    },
  })