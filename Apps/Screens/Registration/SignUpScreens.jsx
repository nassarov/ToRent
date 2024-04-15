import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
import { Formik } from 'formik';

export default function SignUpScreen () {


    const [showPassword, setShowPassword] = useState(false);
  
    // Function to toggle password visibility
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
  
  
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
    // Function to toggle password visibility
    const toggleConfirmPasswordVisibility = () => {
      setShowConfirmPassword(!showConfirmPassword);
    };
  
  return (
    <Formik
      initialValues={{ name: '', email: '', password: '', confirmPassword: '', carType: 'rent' }}
      onSubmit={(values) => {
        console.log(values);
        // You can add your form submission logic here
      }}
      validate={(values) => {
        const errors = {};
        if (!values.name) {
          errors.name = 'Required';
        }
        if (!values.email) {
          errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
          errors.email = 'Invalid email address';
        }
        if (!values.password) {
          errors.password = 'Required';
        }
        if (!values.confirmPassword) {
          errors.confirmPassword = 'Required';
        } else if (values.confirmPassword !== values.password) {
          errors.confirmPassword = 'Passwords must match';
        }
        return errors;
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
        <View style={styles.container}>
          {/* Title */}
          {/* <Text style={styles.title}>Sign Up</Text> */}

          {/* Input Fields */}
          <View>
            {/* Name */}
            <TextInput
              placeholder='Name'
              style={styles.input}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
            />
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

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

            {/* Confirm Password with Eye Icon */}
            <View style={styles.passwordContainer}>
              <TextInput
                placeholder='Confirm Password'
                style={styles.input}
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                value={values.confirmPassword}
                secureTextEntry={!showConfirmPassword}
              />
              <TouchableOpacity style={styles.iconContainer} onPress={toggleConfirmPasswordVisibility} >
                <Icon   name={showConfirmPassword ? 'eye-off' : 'eye'}
              size={25}
              color="#7F5AF0"
              />
              </TouchableOpacity>
            </View>
            {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

            {/* Dropdown Menu */}
            <View style={styles.dropdownContainer}>
            <Picker
              selectedValue={values.carType}
              style={styles.dropdown}
              onValueChange={(itemValue) => handleChange('carType')(itemValue)}
            >
              <Picker.Item label="Why are you using the app" value="" enabled={false} />
              <Picker.Item label="Rent a Car" value="rent" />
              <Picker.Item label="Offer a Car" value="offer" />
            </Picker>
          </View>


            {/* Sign Up Button */}
            <TouchableOpacity style={styles.signupButton} onPress={handleSubmit}>
              <Text style={styles.signupButtonText}>Sign Up</Text>
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
  dropdownContainer: {
    width: '100%',
    borderColor: '#16213E',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#F6F6F6',
    marginVertical: 15,
  },
  dropdown: {
    height: 50,
    width: '100%',
  },
  signupButton: {
    backgroundColor: '#7F5AF0',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
  },
  signupButtonText: {
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


