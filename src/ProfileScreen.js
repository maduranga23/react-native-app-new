import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import firebase from "./firebase"; // Adjust the path as per your file structure

const ProfileScreen = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const user = firebase.auth().currentUser;
    if (user) {
      setUserName(user.displayName);
      setUserEmail(user.email);
    }
  }, []);

  const handleLogout = () => {
    firebase.auth().signOut()
      .then(() => {
        Alert.alert('Success', 'Logged out successfully');
        navigation.navigate('SignIn'); // Ensure you have a SignInScreen in your navigation stack
      })
      .catch(error => {
        Alert.alert('Error', error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>My App</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={userName}
          editable={false}
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          editable={false}
          value={userEmail}
          autoCapitalize="none"
        />
      </View>
      <View style={styles.bottomTextContainer}>
        <TouchableOpacity
          style={styles.fullWidthButton}
          onPress={handleLogout}
        >
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2A2A2A",
    padding: 14,
  },
  text: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 100,
    color: "#fff",
  },
  inputContainer: {
    width: "100%",
    position: "relative",
  },
  label: {
    color: "#C0C0C0",
    position: "absolute",
    top: 0,
    marginTop: 10,
    marginLeft: 10,
    fontSize: 12,
  },
  input: {
    width: "100%",
    height: 64,
    border: "none",
    borderRadius: 10,
    backgroundColor: "#3D3D3D",
    marginBottom: 10,
    paddingHorizontal: 10,
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
    color: "#fff",
  },
  fullWidthButton: {
    width: "100%",
    backgroundColor: "#FFD482",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    height: 48,
  },
  buttonText: {
    color: "#000",
    fontSize: 20,
    fontWeight: "600",
  },
  bottomTextContainer: {
    position: "absolute",
    bottom: 20,
    width: '100%',
    marginLeft: 14,
    marginRight: 14 // Adjust as needed
  },
  bottomText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "600",
  },
});

export default ProfileScreen;
