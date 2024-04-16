import { View, Text,SafeAreaView } from 'react-native'
import React from 'react'

export default function VerificationCodeScreen (){
  return (
    <SafeAreaView style={{flex: 1 }}>
<View style={{flex:1 , padding:16}}>

<Text style={{marginVertical: 12}}>Enter Verification code</Text>
<Text>We are automatically detecting SMS</Text>

<View style={{marginVertical : 22, width:50}}>


{/* <OtpInput
numberOfDigits={4}
onTextChange={(text) =>console.log(text)}
focusColor={"red"}
focusStickBlinkingDuration={400}
theme={{
  pinCodeContainerStyle:{
    width:58,
    height:58,
    borderRadius:12,
  }
}}
/> */}
</View>

  
</View>
    </SafeAreaView>
  )
}

