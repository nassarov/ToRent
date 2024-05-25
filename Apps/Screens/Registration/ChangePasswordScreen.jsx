import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { Formik } from "formik";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";

export default function ChangePasswordScreen() {
  StatusBar.setBarStyle('dark-content', true);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Function to toggle confirm password visibility
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Formik
      initialValues={{
        password: "",
        confirmPassword: "",
      }}
      onSubmit={(values) => {
        
      }}
      validate={(values) => {
        const errors = {};
        if (!values.password) {
          errors.password = "Required";
        }
        if (!values.confirmPassword) {
          errors.confirmPassword = "Required";
        } else if (values.confirmPassword !== values.password) {
          errors.confirmPassword = "Passwords must match";
        }
        return errors;
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
        <View style={styles.container} className='mt-5 ' >
          <StatusBar backgroundColor={'#F6F6F6'} translucent={true}/>
          

          <Text style={styles.title}  className="font-bold text-3xl text-center ">Change Your Password</Text>
          <Text style={styles.subtext} className='text-center'>Please type in your new password of your account </Text>
          {/* Password with Eye Icon */}
          <View style={{ height: 80 }}>
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
          <View style={{ height: 80 }} className='mb-3 mt-3'>
            <View style={styles.passwordContainer}>
              <TextInput
                placeholder="Retype Password"
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
            )}
          </View>

          {/* Confirm Button */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleSubmit}
            >
              <Text style={styles.confirmButtonText}>Confirm</Text>
            </TouchableOpacity>
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
  },
  input: {
    borderColor: "#7F5AF0",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    margin: 15,
    padding: 18,
    marginBottom:5
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
  confirmButton: {
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
  confirmButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginLeft: 15,
    
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  title:{
    fontWeight:"bold",
    margin:15,
  },
  subtext:{
    color:"#7F5AF0",
margin:15,
  }

});
