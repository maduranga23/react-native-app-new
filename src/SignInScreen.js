import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import firebase from './firebase'; // Adjust the path as per your file structure
import { Ionicons } from '@expo/vector-icons';
const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSignIn = () => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        // Signed in successfully, navigate to Welcome screen
        navigation.navigate('Welcome');
      })
      .catch(error => {
        const errorMessage = error.message;
        Alert.alert('Error', errorMessage);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>My App</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="example@app.com"
          onChangeText={setEmail}
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
    <View style={styles.inputContainer}>
   
    <View style={styles.passwordInputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#C0C0C0"
        onChangeText={setPassword}
        value={password}
        secureTextEntry={!showPassword}
      />
      <TouchableOpacity onPress={toggleShowPassword} style={styles.passwordVisibilityButton}>
        <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={20} color="#C0C0C0" />
      </TouchableOpacity>
    </View>
  </View>
    
  <TouchableOpacity
  style={styles.fullWidthButton}
  onPress={handleSignIn}
>
  <Text style={styles.buttonText}>Sign In</Text>
</TouchableOpacity>

    
      <View style={styles.bottomTextContainer}>
      <Text style={styles.bottomText}>Don't have an account? <TouchableOpacity style={styles.textSign} onPress={() => navigation.navigate('SignUp')}>
        Sign Up</TouchableOpacity></Text>
           </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2A2A2A', 
    padding: 14,
  },
  text: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 100,
    color: '#fff'
  }, 
  inputContainer: {
    width: '100%',
    
    position: 'relative'
  },
  label: {
    color: '#C0C0C0',
    position: 'absolute',
    top: 0,
    marginTop: 10,
    marginLeft: 10,
    fontSize: 12
  },
  textSign:{
    color: '#FFD482',
    textDecorationLine: 'underline'
  },
  
  input: {
    width: '100%',
    height: 64,
  
    border: 'none',
    borderRadius: 10,
    backgroundColor: '#3D3D3D',
    marginBottom: 10,
    paddingHorizontal: 10,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 20,
    color: '#fff'
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
 
  passwordVisibilityButton: {
    position: 'absolute',
    right:0,
    marginRight:10,
  },
  fullWidthButton: {
    width: '100%',
    backgroundColor: '#FFD482',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    height: 48,
  },
  buttonText: {
    color: '#000',
    fontSize: 20,
    fontWeight: 600,
  },
  bottomTextContainer: {
    position: 'absolute',
    bottom: 20, // Adjust as needed
  },
  bottomText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 600,
  },
});

export default SignInScreen;
