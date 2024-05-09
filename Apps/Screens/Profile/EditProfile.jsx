import { View, Text , TouchableOpacity , ImageBackground , TextInput , StyleSheet} from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import styles from '../../Components/ProfileComponents/profileStyle';
export default function EditProfile() {
  return (
    <View style={styles.container}>
      <View style={{margin:20}}></View>
      <View style={{alignItems:"center"}}>
        <TouchableOpacity>
          <View
          style={{
            height:100,
            width:100,
            borderRadius:15,
            justifyContent:"center",
            alignItems:"center",
          }}
          >
<ImageBackground

source={{
  uri: "https://api.adorable.io/avatars/80/abott@adorable.png",
}}
style={{height:100 , width:100}}
imageStyle={{borderRadius:15}}
>
<View style={{
  flex:1,
  justifyContent:"center",
  alignItems:"center"
}}>
  <Icon
  name='camera' size={35} color="#fff" style={{
    opacity:0.7,
    alignItems:"center",
    borderWidth:1,
    borderColor:"#fff",
    borderRadius:10,
  }}
  />
</View>
</ImageBackground>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}