import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  StatusBar,
  Alert,
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { Formik } from "formik";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, app } from "../../../firebaseConfig";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export default function SignUpScreen({ route }) {
  StatusBar.setBarStyle("dark-content", true);

  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(route.params?.value);
  const [userid, setUserid] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false); // State to track if signing up is in progress

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
    { label: "Offer a car", value: "1" },
    { label: "Rent a car", value: "0" },
  ];

  // Function to handle signup
  const handelSignUp = async (values) => {
    setIsSigningUp(true); // Set isSigningUp to true when signing up
    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Firestore: Add additional user data
      const db = getFirestore(app);
      const userRef = doc(db, "users", user.uid);
      setUserid(user.uid);
      await setDoc(userRef, {
        name: values.name,
        email: email,
        phoneNumber: values.phoneNumber,
        role: values.role,
      });

      console.log(userCredential);
      if (values.role === "1") {
        navigation.push("address");
      } else {
        Alert.alert("Success", "You have successfully signed up!");
        navigation.push("login");
      }
    } catch (error) {
      console.log("Error in signup:", error.message);
      // Handle errors here
    } finally {
      setIsSigningUp(false); // Reset isSigningUp to false after signup process finishes
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          role: "",
          phoneNumber: phoneNumber,
          userid: userid,
        }}
        onSubmit={(values) => {
          console.log(values);
          handelSignUp(values);
        }}
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.name = "Required";
          }
          if (!email) {
            errors.email = "Required";
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
            errors.email = "Invalid email address";
          }
          if (!password) {
            errors.password = "Required";
          }
          if (!values.confirmPassword) {
            errors.confirmPassword = "Required";
          } else if (values.confirmPassword !== password) {
            errors.confirmPassword = "Passwords must match";
          }
          if (values.role !== "1" && values.role !== "0") {
            errors.role = "Required: Choose one";
          }
          return errors;
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <View style={styles.container}>
            <StatusBar backgroundColor={"#F6F6F6"} translucent={true} />
            {/* Input Fields */}
            <View>
              <Text className="text-lg text-center">
                Phone Number: {values.phoneNumber}
              </Text>

              {/* Name */}
              <View style={{ height: heightPercentageToDP(12) }}>
                <TextInput
                  placeholder="Name"
                  style={styles.input}
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  value={values.name}
                />
                {errors.name && (
                  <Text style={styles.errorText}>{errors.name}</Text>
                )}
              </View>

              {/* Email */}
              <View style={{ height: heightPercentageToDP(12) }}>
                <TextInput
                  placeholder="Email"
                  style={styles.input}
                  onChangeText={(text) => setEmail(text)}
                  onBlur={handleBlur("email")}
                  value={email}
                />
                {errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
              </View>

              {/* Password with Eye Icon */}
              <View style={{ height: heightPercentageToDP(12) }}>
                <View style={styles.passwordContainer}>
                  <TextInput
                    placeholder="Password"
                    style={styles.input}
                    onChangeText={(text) => setPassword(text)}
                    onBlur={handleBlur("password")}
                    value={password}
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
              <View style={{ height: heightPercentageToDP(12) }}>
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
                )}
              </View>

              {/* Dropdown Menu */}
              <View style={{ height: heightPercentageToDP(12) }}>
                <Dropdown
                  style={[
                    styles.dropdown,
                    isFocus && { borderColor: "#7F5AF0" },
                  ]}
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
              <View className="items-center text-center justify-center">
                <TouchableOpacity
                  style={[styles.signupButton, isSigningUp && { opacity: 0.5 }]}
                  onPress={() => handleSubmit()}
                  disabled={isSigningUp}
                >
                  <Text style={styles.signupButtonText}>
                    {isSigningUp ? "Signing Up..." : "Sign Up"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </Formik>
    </TouchableWithoutFeedback>
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
    height: widthPercentageToDP(15),
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
