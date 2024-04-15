import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Formik } from 'formik';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
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
          
          {/* Input Fields */}
          <View>
            {/* Email */}
            <TextInput
              placeholder='Email'
              style={styles.input}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

            {/* Password with Eye Icon */}
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
                <Icon name={showPassword ? 'eye-off' : 'eye'} size={25} color="#7F5AF0" />
              </TouchableOpacity>
            </View>
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

            

            {/*  Login Button */}
            <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity >
              <Text className='text-center'>Forgot Your Password?</Text>
            </TouchableOpacity>

            <View className='flex-row justify-center mt-10'>
              <Text className='text-center'>Don't Have an Account?</Text>
              <TouchableOpacity onPress={() => navigation.replace('signup')}><Text className='text-violet-600'> Register</Text></TouchableOpacity>
              
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
    borderColor: '#16213E',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#F6F6F6',
    margin: 15,
    padding: 20,
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
    backgroundColor: '#7F5AF0',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginLeft: 15,
  },
});



  