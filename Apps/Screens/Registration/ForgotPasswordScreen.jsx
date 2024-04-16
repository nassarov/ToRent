import { View, Text, TextInput, TouchableOpacity,StyleSheet } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import Constants from "expo-constants";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import { useState } from "react";
import PhoneInput from 'react-native-phone-number-input';

export default function ForgotPasswordScreen() {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValidPhone, setIsValidPhone] = useState(true);

  // Function to handle real-time validation of the phone number
  const validatePhoneNumber = (text) => {
    const containsNonDigit = /\D/.test(text);
    const allowedPrefixes = ["81", "71", "70", "03", "76","78","79"];
    const isValidPrefix = allowedPrefixes.includes(text.slice(0, 2));
  
    if (!containsNonDigit && text.length <= 8 && isValidPrefix) {
      setIsValidPhone(true); 
      setPhoneNumber(text); 
    } else {
      setIsValidPhone(false);
    }
  };
  
  

  // Function to handle submission of the phone number
const onSubmitMethod = () => {
  if (isValidPhone) {
    if (phoneNumber.length === 8) { // Check if the phone number consists of exactly 8 digits
      const phoneNumberCCode = `+961${phoneNumber}`;
      console.log(phoneNumberCCode);
      navigation.navigate("signup", { value: phoneNumberCCode });
    } else {
      setIsValidPhone(false);
    }
  } else {
    setIsValidPhone(false);
  }
};

  return (
    <View style={styles.container}>
    <View
      className="flex-1 items-center"
      style={{ paddingTop: Constants.statusBarHeight }}
    >
      <View
        style={{
          width: widthPercentageToDP(80),
        }}
      >
        <Text className="font-bold text-3xl mb-5">
          Forgot Password? <Icon name="lock-closed" size={22} color="#7F5AF0" />
        </Text>
        <Text className='text-[#7F5AF0] mb-8'>
          Please input your email or phone number to recover your acount
        </Text>
        <Text className='text-[18px] font-semibold' >Email address OR Phone number </Text>
        <View className='mt-6' style={{height:heightPercentageToDP(9)}}>
        <PhoneInput 
          defaultCode="LB"
          layout="first"
          value={phoneNumber}
          countryPickerProps={{
            countryCodes: ['LB'],
          }}
          disableArrowIcon={true} 
          containerStyle={{ backgroundColor: 'white', borderRadius: 10 }}
          textInputProps={{ 
            autoFocus: true,
            maxLength: 8,
            keyboardType: 'numeric',
            selectionColor:'#C5C5C5'
          }}
          onChangeText={validatePhoneNumber}
        />   
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("changepassword")}>
          <Text>Recover Account</Text>
        </TouchableOpacity>
      </View>
    </View>
    </View>
  );
}
const styles = StyleSheet.create({
  input: {
    borderColor: "#7F5AF0",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    margin: 15,
    padding: 18,
    width: heightPercentageToDP(42),
    height: widthPercentageToDP(15),
    
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },

});