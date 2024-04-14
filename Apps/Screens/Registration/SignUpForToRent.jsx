import React, { useState } from "react";
import { View, Text, StatusBar, TouchableOpacity } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Ionicons, EvilIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import PhoneInput from 'react-native-phone-number-input';

export default function SignUpForToRent() {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValidPhone, setIsValidPhone] = useState(true);

  // Function to handle real-time validation of the phone number
  const validatePhoneNumber = (text) => {
    // Check if any character in the input is not a digit
    const containsNonDigit = /\D/.test(text);
  
    const allowedPrefixes = ["81", "71", "70", "03", "76"];
    const isValidPrefix = allowedPrefixes.includes(text.slice(0, 2));
  
    // Check if the input contains only digits and the prefix is valid
    if (!containsNonDigit && text.length <= 8 && isValidPrefix) {
      setPhoneNumber(text);
      setIsValidPhone(true);
    } else {
      setIsValidPhone(false);
    }
  };
  

  // Function to handle submission of the phone number
  const onSubmitMethod = () => {
    if (phoneNumber) {
      console.log(phoneNumber);
      navigation.navigate("signup", { value: phoneNumber });
    } else {
      setIsValidPhone(false);
    }
  };

  return (
    <View style={{ alignItems: 'center' }}>
      <StatusBar />
      <View style={{ width: wp(80) }}>
        <Text style={{ fontWeight: 'bold', fontSize: 24, marginTop: 8, textAlign: 'center' }}>
          Sign Up For ToRent
        </Text>
        <Text>
          Create a profile, Drive easy, Rent your favorite car and more
        </Text>
        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Or</Text>
        <Text>
          Create a profile, Show your cars, Grow your business and more
        </Text>
        <PhoneInput
          defaultCode="LB"
          layout="first"
          value={phoneNumber}
          disableCountryChange={true}  
          disableArrowIcon={true} 
          containerStyle={{ backgroundColor: 'white', borderRadius: 10 }}
          textInputProps={{ 
            autoFocus: true,
            maxLength: 8,
            keyboardType: 'numeric',
          }}
          
          onChangeText={validatePhoneNumber}
        />
        {!isValidPhone && (
          <Text style={{ color: 'red', fontSize: 14, marginTop: 4 }}>
            Invalid phone number
          </Text>
        )}
        <TouchableOpacity
          onPress={onSubmitMethod}
          style={{ backgroundColor: 'purple', borderRadius: 10, padding: 12, alignItems: 'center', justifyContent: 'center', marginTop: 12, flexDirection: 'row' }}
        >
          <Ionicons name="person-outline" size={17} color="white" />
          <Text style={{ color: 'white', fontWeight: 'bold', marginLeft: 4 }}>
            Use your phone number
          </Text>
        </TouchableOpacity>

        <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginVertical: 16 }}>Or</Text>
        <TouchableOpacity
          onPress={() => {}}
          style={{ backgroundColor: 'purple', borderRadius: 10, padding: 12, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}
        >
          <EvilIcons name="arrow-right" size={24} color="white" />
          <Text style={{ color: 'white', fontWeight: 'bold', marginLeft: 4 }}>
            Continue as a guest
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row', marginTop: 12 }}>
        <Text>Already Have An Account?</Text>
        <TouchableOpacity>
          <Text style={{ color: 'purple' }}> Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
