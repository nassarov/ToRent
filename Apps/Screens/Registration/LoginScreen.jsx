import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Modal,
} from "react-native";
import { Formik } from "formik";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getFirestore, getDoc } from "firebase/firestore";
import { app } from "../../../firebaseConfig";
import { Image } from "react-native";

export default function LoginScreen() {
  StatusBar.setBarStyle("dark-content", true);

  const [showPassword, setShowPassword] = useState(false);
  const [isCheckingCredentials, setIsCheckingCredentials] = useState(false);
  const navigation = useNavigation();
  const db = getFirestore(app);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (values) => {
    const { email, password } = values;
    if (!email || !password) {
      Alert.alert("Alert", "Please provide both email and password.");
      return;
    }

    setIsCheckingCredentials(true);
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnapshot = await getDoc(userDocRef);
      const userData = userDocSnapshot.data();
      navigation.replace("HomeScreenNavigation", { userData });
    } catch (error) {
      console.log("Error signing in:", error.message);
      if (error.code === "auth/invalid-email") {
        Alert.alert("Alert", "Please enter a valid email.");
      } else if (error.code === "auth/invalid-credential") {
        Alert.alert("Alert", "Please check your credentials.");
      }
    } finally {
      setIsCheckingCredentials(false);
    }
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={handleSubmit}
      validate={(values) => {
        const errors = {};
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
        return errors;
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.container}>
            <StatusBar backgroundColor={"#F6F6F6"} translucent={true} />
            <View>
              <View style={{ height: heightPercentageToDP(12) }}>
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
              <View style={{ height: heightPercentageToDP(12) }}>
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
                      name={!showPassword ? "eye-off" : "eye"}
                      size={25}
                      color="#7F5AF0"
                    />
                  </TouchableOpacity>
                </View>
                {errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
              </View>
              <View className="items-center">
                <TouchableOpacity
                  style={[
                    styles.loginButton,
                    isCheckingCredentials && { opacity: 0.5 },
                  ]}
                  onPress={handleSubmit}
                  disabled={isCheckingCredentials}
                >
                  <Text style={styles.loginButtonText}>
                    {isCheckingCredentials ? "Logging In..." : "Login"}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate("ForgotPasswordScreen")}
                >
                  <Text className="text-center text-violet-600">
                    Forgot Your Password?
                  </Text>
                </TouchableOpacity>
                <View className="flex-row justify-center mt-10">
                  <Text className="text-center">Don't Have an Account?</Text>
                  <TouchableOpacity
                    onPress={() => navigation.replace("SignUpForToRent")}
                  >
                    <Text className="text-violet-600"> Register</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            {/* Add a modal that displays*/}
            <Modal visible={isCheckingCredentials} transparent={true}>
              <View style={styles.modalContainer}>
              <Image
              source={require('../../../assets/torent-icon.gif')}
              style={{width: 300, height: 300}}
            />
            <Text className='text-[#7F5AF0] text-xl font-bold'>Logging You In...</Text>
              </View>
            </Modal>
          </View>
        </TouchableWithoutFeedback>
      )}
    </Formik>
  );
};

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
  loginButton: {
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
  loginButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginLeft: 15,
  },
  modalContainer: {
    flex: 1,
    height:"100%",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', // Semi-transparent background
  },
});
