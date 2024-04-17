import { View, Text, StyleSheet, TextInput, TouchableOpacity ,StatusBar} from 'react-native';
import React, { useState } from 'react';
import { Formik } from 'formik';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

export default function LoginScreen() {
  StatusBar.setBarStyle('dark-content', true);

  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();
  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Formik
      initialValues={{  email: '', password: '' }}
      onSubmit={(values) => {
        console.log(values);
        navigation.navigate('homescreen')
        // You can add your form submission logic here
      }}
      validate={(values) => {
        const errors = {};
      
        if (!values.email) {
          errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
          errors.email = 'Invalid email address';
        }
        if (!values.password) {
          errors.password = 'Required';
        }
        
        return errors;
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
        <View style={styles.container}>
          <StatusBar backgroundColor={'#F6F6F6'} translucent={true}/>
          {/* Input Fields */}
          <View >
            {/* Email */}
            <View style={{height:heightPercentageToDP(12)}}>
            <TextInput
              placeholder='Email'
              style={styles.input}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
          </View>
            {/* Password with Eye Icon */}
            <View style={{height:heightPercentageToDP(12)}}>
            <View style={styles.passwordContainer}>
              <TextInput
                placeholder='Password'
                style={styles.input}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity style={styles.iconContainer} onPress={togglePasswordVisibility}>
                <Icon name={!showPassword ? 'eye-off' : 'eye'} size={25} color="#7F5AF0" />
              </TouchableOpacity>
            </View>
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

            </View>

            {/*  Login Button */}
            <View className='items-center'>
            <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('forgotpassword')}>
              <Text className='text-center text-violet-600'>Forgot Your Password?</Text>
            </TouchableOpacity>

            <View className='flex-row justify-center mt-10'>
              <Text className='text-center'>Don't Have an Account?</Text>
              <TouchableOpacity onPress={() => navigation.replace('signup')}><Text className='text-violet-600'> Register</Text></TouchableOpacity>
              </View>
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
    justifyContent: 'flex-start',
    paddingTop: 50,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
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
    position: 'relative',
  },
  iconContainer: {
    position: 'absolute',
    right: 25,
    top: '50%',
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
    color: 'red',
    fontSize: 12,
    marginLeft: 15,
  },
});



  