import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Formik } from "formik";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'

export default function SignUpForToRent() {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const onSubmitMethod = (values) => {
    setLoading(true);
    console.log(values.phone_number);
  };
  return (
    <View
      className="items-center "
      style={{ paddingTop: StatusBar.currentHeight }}
    >
      <View style={{ width: wp(80) }}>
        <Text className="font-bold text-3xl ">Sign Up For ToRent</Text>
        <Text>
          Create a profile, Drive easy, Rent your favorite car and more
        </Text>
        <Text className="font-bold text-lg">Or</Text>
        <Text>
          Create a profile, Show your cars, Grow your business and more
        </Text>
        <Formik
          initialValues={{
            phone_number: "",
          }}
          onSubmit={(values) => {
            if (values.phone_number !== "") {
              onSubmitMethod(values);
            } else {
              ToastAndroid.show(
                "Please Enter your phone number",
                ToastAndroid.SHORT
              );
            }
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            setFieldValue,
            errors,
          }) => (
            <View>
              <TextInput
                placeholder="Phone Number"
                value={values?.phone_number}
                keyboardType="number-pad"
                onChangeText={handleChange("phone_number")}
                className="bg-gray-100 p-3 rounded-lg mt-5"
              />
              <TouchableOpacity
                onPress={handleSubmit}
                
                className="bg-purple-700 rounded-lg p-3 items-center justify-center mt-3 flex-row gap-x-2"
              >
                <Ionicons name="person-outline" size={24} color="black" />
                <Text className="text-white font-bold text-base ">
                  Use your phone number
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
        <Text className="text-center text-xl font-bold my-4">Or</Text>
        <TouchableOpacity
                onPress={()=>{}}
                className="bg-purple-700 rounded-lg p-3 items-center justify-center mt-3 "
              >
                <Text className="text-white font-bold text-base ">
                  Continue as a guest
                </Text>
              </TouchableOpacity>
  
      </View>
        <TouchableOpacity onPress={()=>navigation.push('signup')}>
          <View className="bg-gray-100 p-3 rounded-lg mt-5">
            <Text className="text-center text-xl">Next</Text>
          </View>
        </TouchableOpacity>
    </View>
  );
}
