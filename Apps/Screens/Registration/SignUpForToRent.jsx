import React, { useState } from "react";
import { View, Text, StatusBar, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from "react-native";
import { heightPercentageToDP, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Ionicons, EvilIcons , FontAwesome6} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import PhoneInput from 'react-native-phone-number-input';
import { getAuth } from "firebase/auth";
import { collection, query, where, getDocs, getFirestore } from "firebase/firestore";
import { Alert } from "react-native";

const auth = getAuth();
const db = getFirestore();  // Assuming you've already initialized Firestore

export default function SignUpForToRent() {
  
  StatusBar.setBarStyle('dark-content', true);

  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValidPhone, setIsValidPhone] = useState(true);
  const [phoneInUse, setPhoneInUse] = useState(false);

  // Function to handle real-time validation of the phone number
  const validatePhoneNumber = (text) => {
    const containsNonDigit = /\D/.test(text);
    const allowedPrefixes = ["81", "71", "70", "03", "76","78","79"];
    const isValidPrefix = allowedPrefixes.includes(text.slice(0, 2));
  
    if (!containsNonDigit && text.length <= 8 && isValidPrefix) {
      setIsValidPhone(true);
      setPhoneNumber(text);
      checkPhoneNumberInUse(`+961${text}`);
    } else {
      setIsValidPhone(false);
    }
  };
  
  const checkPhoneNumberInUse = async (fullPhoneNumber) => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("phoneNumber", "==", fullPhoneNumber));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      setPhoneInUse(true);
    } else {
      setPhoneInUse(false);
    }
  };
  

  // Function to handle submission of the phone number
  const onSubmitMethod = () => {
    if (isValidPhone && !phoneInUse) {
      const phoneNumberCCode = `+961${phoneNumber}`;
      navigation.navigate("signup", { value: phoneNumberCCode });
    } else {
      Alert.alert("Phone Number In Use", "The phone number entered is already associated with another account.");
    }
  };

  return (

    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View style={{ alignItems: 'center' }}>

      <StatusBar backgroundColor={'#F6F6F6'} translucent={true}/>
      <View style={{ width: wp(80) }} className='items-center justify-center mt-14'>
        <Text className='mt-4' style={{ fontWeight: 'bold', fontSize: 24, marginTop: 8, textAlign: 'center' }}>
          Sign Up For ToRent
        </Text>
        {/* <Text className='mt-4'>
          Create a profile, Drive easy, Rent your favorite car and more
        </Text>
        <Text className='mt-4' style={{ fontWeight: 'bold', fontSize: 18 }}>Or</Text>
        <Text className='mt-4 mb-4'>
          Create a profile, Show your cars, Grow your business and more
        </Text> */}
        <Text className='mt-10 text-center from-neutral-700 text-lg'>
        Welcome to ToRent! Create a profile to unlock all features and start renting your favorite cars, and more.
      </Text>
      
        <View className='mt-6' style={{height:heightPercentageToDP(9)}}>
        <PhoneInput 
          defaultCode="LB"
          layout="first"
          value={phoneNumber}
          countryPickerProps={{
            countryCodes: ['LB'],
          }}
          disableArrowIcon={false} 
          containerStyle={{ backgroundColor: 'white', borderRadius: 10 }}
          textInputProps={{ 
            autoFocus: true,
            maxLength: 8,
            keyboardType: 'numeric',
            selectionColor:'#C5C5C5'
          }}
          onChangeText={validatePhoneNumber}
        />
        {!isValidPhone && (
          <Text style={{ color: 'red', fontSize: 14, marginTop: 4 }} >
            Invalid phone number
          </Text>
        )}</View>
        <View className='my-12'>
        <TouchableOpacity className='bg-[#7F5AF0]  ' 
          onPress={validatePhoneNumber&&onSubmitMethod}
          style={{height:wp(18), width:wp(70), borderRadius: 10, padding: 12, alignItems: 'center', justifyContent: 'space-evenly', flexDirection: 'row' }}
        >
          <Ionicons name="person-sharp" size={24} color="white" />
          <Text style={{ color: 'white', fontWeight: 'bold' }}>
            Use Your Phone Number
          </Text>
        </TouchableOpacity>

        <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', marginVertical: 16 }}>Or</Text>

        <Text className='mt-4 mb-4 text-center'>
        Not ready to create an account yet?
      </Text>

        <TouchableOpacity className='bg-[#7F5AF0] '
          onPress={() => navigation.navigate("Home")}
          style={{height:wp(18), width:wp(70), borderRadius: 10, padding: 12, alignItems: 'center', justifyContent: 'space-evenly', flexDirection: 'row' }}
        >
          <FontAwesome6 name="car-side" size={24} color="white" />
          <Text style={{ color: 'white', fontWeight: 'bold'}}>
            Continue As A Guest
          </Text>
        </TouchableOpacity>
        </View>
      </View>

      <View style={{ flexDirection: 'row', marginTop: 28 }}>
        <Text className='text-[16px] font-semibold'>Already Have An Account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("login")}>
          <Text className='text-violet-600 text-[18px] mt-[-2px] '> Login</Text>
        </TouchableOpacity>
      </View>

    </View>

    </TouchableWithoutFeedback>
  );
}