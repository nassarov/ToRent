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
import { Ionicons, Entypo, EvilIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function SignUpForToRent() {
  const navigation = useNavigation();
  const onSubmitMethod = (values) => {
    console.log(values)
    navigation.navigate('signup',{values});
    
  };
  return (
    <View
      className="items-center "
      
    >
      <StatusBar />
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
                className="bg-gray-300 p-3 rounded-lg mt-5 border-[1px] border-gray-400"
                
                
              />
              <TouchableOpacity
                onPress={handleSubmit}
                className="bg-purple-700 rounded-lg p-3 items-center justify-center mt-3 flex-row "
              >
                <Ionicons name="person-outline" size={17} color="white" />
                <Text className="text-white font-bold text-base ml-1">
                  Use your phone number
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
        <Text className="text-center text-xl font-bold my-4">Or</Text>
        <TouchableOpacity
          onPress={() => {}}
          className="bg-purple-700 rounded-lg p-3 items-center justify-center  flex-row"
        >
          <EvilIcons name="arrow-right" size={24} color="white" />
          <Text className="text-white font-bold text-base ml-1">
            Continue as a guest
          </Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row mt-3">
        <Text>Already Have An Account?</Text>
        <TouchableOpacity>
          <Text className="text-purple-700"> Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
