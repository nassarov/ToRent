import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { Formik } from "formik";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import Constants from "expo-constants";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

export default function SignUpScreen() {
  StatusBar.setBarStyle('dark-content', true);
  // StatusBar.setTranslucent(true);
  // StatusBar.setBackgroundColor('#F6F6F6');
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [value, setValue] = useState(null); // Add this line
  const [isFocus, setIsFocus] = useState(false); // Add this line
  const [selectedValue, setSelectedValue] = useState(null); // Add this line

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Function to toggle password visibility
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // DropDownMenu Data
  const DropDowndata = [
    { label: "Offer a car", value: "Offer" },
    { label: "Rent a car", value: "Rent" },
  ];

  // Moved renderLabel inside the SignUpScreen component
  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "blue" }]}>
          Why you are using the app
        </Text>
      );
    }
    return null;
  };

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
      }}
      onSubmit={(values) => {
        console.log(values);
        navigation.push('login');
      }}
      validate={(values) => {
        const errors = {};
        if (!values.name) {
          errors.name = "Required";
        }
        if (!values.email) {
          errors.email = "Required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }
        if (!values.password) {
          errors.password = "Required";
        }
        if (!values.confirmPassword) {
          errors.confirmPassword = "Required";
        } else if (values.confirmPassword !== values.password) {
          errors.confirmPassword = "Passwords must match";
        }
        if (values.role !== "Offer" && values.role !== "Rent") {
          errors.role = "Required: Choose one";
        }
        return errors;
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
        <View style={styles.container}>
          <StatusBar backgroundColor={'#F6F6F6'} translucent={true}/>
          {/* Input Fields */}
          <View>
            {/* Render Label */}

            {/* Name */}
            <View style={{height:heightPercentageToDP(12)}}>
            <TextInput
              placeholder="Name"
              style={styles.input}
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              value={values.name}
            />
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
            </View>

            {/* Email */}
            <View style={{height:heightPercentageToDP(12)}}>
            <TextInput
              placeholder="Email"
              style={styles.input}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
            </View>

            {/* Password with Eye Icon */}
            <View style={{height:heightPercentageToDP(12)}}>
            <View style={styles.passwordContainer}>
              <TextInput
                placeholder="Password"
                style={styles.input}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={togglePasswordVisibility}
              >
                <Icon
                  name={showPassword ? "eye-off" : "eye"}
                  size={25}
                  color="#7F5AF0"
                />
              </TouchableOpacity>
            </View>
            {errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
            </View>
            {/* Confirm Password with Eye Icon */}
            <View style={{height:heightPercentageToDP(12)}}>
            <View style={styles.passwordContainer}>
              <TextInput
                placeholder="Confirm Password"
                style={styles.input}
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                value={values.confirmPassword}
                secureTextEntry={!showConfirmPassword}
              />
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={toggleConfirmPasswordVisibility}
              >
                <Icon
                  name={showConfirmPassword ? "eye-off" : "eye"}
                  size={25}
                  color="#7F5AF0"
                />
              </TouchableOpacity>
            </View>
            {errors.confirmPassword && (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            )}</View>
            <View></View>
            {/* Dropdown Menu */}
            <View style={{height:heightPercentageToDP(12)}}>
              <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: "#7F5AF0" }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={DropDowndata}
                search={false}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={
                  !isFocus ? "Why you are using the app" : "Select one Role"
                }
                searchPlaceholder="Search..."
                value={values.role}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => {
                  handleChange("role")(item.value);
                  setIsFocus(false);
                }}
                renderLeftIcon={() => (
                  <AntDesign
                    style={styles.icon}
                    color={isFocus ? "blue" : "black"}
                    name="Safety"
                    size={20}
                  />
                )}
              />
              {errors.role && (
                <Text style={styles.errorText}>{errors.role}</Text>
              )}
            </View>

            {/* Sign Up Button */}
            <View className='items-center text-center justify-center'>
            <TouchableOpacity
              style={styles.signupButton}
              onPress={handleSubmit}
            >
              <Text style={styles.signupButtonText}>Sign Up</Text>
            </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: 50,
  },
  input: {
    borderColor: "#7F5AF0",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    margin: 15,
    padding: 18,
    width: heightPercentageToDP(42),
    height: widthPercentageToDP(15)
  },
  passwordContainer: {
    position: "relative",
  },
  iconContainer: {
    position: "absolute",
    right: 25,
    top: "50%",
    transform: [{ translateY: -10 }],
  },
  dropdownContainer: {
    width: heightPercentageToDP(42),
    borderColor: "#16213E",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    marginVertical: 15,
    color: "",
    margin: 15,
  },
  dropdown: {
    height: 50,
    borderColor: "#7F5AF0",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: heightPercentageToDP(42),
    height: widthPercentageToDP(15),
    margin: 15,
  },
  signupButton: {
    backgroundColor: "#7F5AF0",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    justifyContent: "center",
    alignItems: "center",
    margin: 15,
    width: heightPercentageToDP(32),
    height: widthPercentageToDP(18),
  },
  signupButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginLeft: 15,
  },

  icon: {
    marginRight: 5,
  },

  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
