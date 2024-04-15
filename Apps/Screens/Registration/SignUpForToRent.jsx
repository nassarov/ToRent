import React, { useState } from "react";
import { View, Text, StatusBar, TouchableOpacity } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Ionicons, EvilIcons , FontAwesome6} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import PhoneInput from 'react-native-phone-number-input';

export default function SignUpForToRent() {
  
  StatusBar.setBarStyle('light-content', true);

  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValidPhone, setIsValidPhone] = useState(true);

  // Function to handle real-time validation of the phone number
  const validatePhoneNumber = (text) => {
    const containsNonDigit = /\D/.test(text);
    const allowedPrefixes = ["81", "71", "70", "03", "76"];
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
  if (isValidPhone) { // Check if the phone number is valid
    if (phoneNumber.length === 8) { // Check if the phone number consists of exactly 8 digits
      console.log(phoneNumber);
      navigation.navigate("signup", { value: phoneNumber });
    } else {
      setIsValidPhone(false);
    }
  } else {
    setIsValidPhone(false);
  }
};

  return (
    <View style={{ alignItems: 'center' }}>
      <StatusBar />
      <View style={{ width: wp(80) }} className='items-center justify-center'>
        <Text className='mt-4' style={{ fontWeight: 'bold', fontSize: 24, marginTop: 8, textAlign: 'center' }}>
          Sign Up For ToRent
        </Text>
        <Text className='mt-4'>
          Create a profile, Drive easy, Rent your favorite car and more
        </Text>
        <Text className='mt-4' style={{ fontWeight: 'bold', fontSize: 18 }}>Or</Text>
        <Text className='mt-4 mb-4'>
          Create a profile, Show your cars, Grow your business and more
        </Text>
        <View className='mb-4'>
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
        )}</View>
        <TouchableOpacity className='bg-violet-600  ' 
          onPress={validatePhoneNumber&&onSubmitMethod}
          style={{ width:wp(70), borderRadius: 10, padding: 12, alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row' }}
        >
          <Ionicons name="person-sharp" size={24} color="white" />
          <Text style={{ color: 'white', fontWeight: 'bold' ,marginLeft: -14}}>
            Use Your Phone Number
          </Text>
        </TouchableOpacity>

        <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginVertical: 16 }}>Or</Text>
        <TouchableOpacity className='bg-violet-600 '
          onPress={() => {}}
          style={{ width:wp(70), borderRadius: 10, padding: 12, alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row' }}
        >
          <FontAwesome6 name="car-side" size={24} color="white" />
          <Text style={{ color: 'white', fontWeight: 'bold', marginLeft: -14 }}>
            Continue As A Guest
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row', marginTop: 12 }}>
        <Text>Already Have An Account?</Text>
        <TouchableOpacity>
          <Text className='text-violet-600'> Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}