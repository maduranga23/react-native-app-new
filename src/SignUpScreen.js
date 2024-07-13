import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  CheckBox,
  TextInput,
  Button,
  Alert,
} from "react-native";
import firebase from "./firebase"; // Adjust the path as per your file structure
import { Ionicons } from "@expo/vector-icons";
const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [conditionsMet, setConditionsMet] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    number: false,
  });

  const handlePasswordChange = (value) => {
    setPassword(value);

    // Check conditions
    const lengthCondition = value.length >= 8;
    const lowercaseCondition = /[a-z]/.test(value);
    const uppercaseCondition = /[A-Z]/.test(value);
    const numberCondition = /[0-9]/.test(value);

    setConditionsMet({
      length: lengthCondition,
      lowercase: lowercaseCondition,
      uppercase: uppercaseCondition,
      number: numberCondition,
    });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        user
          .updateProfile({
            displayName: name,
          })
          .then(() => {
            // Profile updated successfully, navigate to Welcome screen or any other screen
            navigation.navigate("Welcome");
          })
          .catch((error) => {
            const errorMessage = error.message;
            Alert.alert("Error", errorMessage);
          });
      })
      .catch((error) => {
        const errorMessage = error.message;
        Alert.alert("Error", errorMessage);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>My App</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Example Application"
          onChangeText={setName}
          value={name}
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email Address"
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
            onChangeText={handlePasswordChange}
            value={password}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            onPress={toggleShowPassword}
            style={styles.passwordVisibilityButton}
          >
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={20}
              color="#C0C0C0"
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.passwordInputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#C0C0C0"
            onChangeText={setConfirmPassword}
            value={confirmPassword}
            secureTextEntry={!showConfirmPassword}
          />
          <TouchableOpacity
            onPress={toggleShowConfirmPassword}
            style={styles.passwordVisibilityButton}
          >
            <Ionicons
              name={showConfirmPassword ? "eye-off" : "eye"}
              size={20}
              color="#C0C0C0"
            />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.fullWidthButton} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <View style={styles.bottomTextContainer}>
        <Text style={styles.bottomText}>
          Have an account?{" "}
          <TouchableOpacity
            style={styles.textSign}
            onPress={() => navigation.goBack()}
          >
            Sign In
          </TouchableOpacity>
        </Text>
      </View>

      <View style={styles.checkboxContainer}>
        <View style={styles.checkboxRow}>
          <View style={styles.checkbox}>
            <CheckBox value={conditionsMet.lowercase} disabled />
            <Text style={styles.textWhite}>One lowercase character</Text>
          </View>
          <View style={styles.checkbox}>
            <CheckBox value={conditionsMet.uppercase} disabled />
            <Text style={styles.textWhite}>One uppercase character</Text>
          </View>
        </View>

        <View style={styles.checkboxRow}>
          <View style={styles.checkbox}>
            <CheckBox value={conditionsMet.number} disabled />
            <Text style={styles.textWhite}>One number</Text>
          </View>
          <View style={styles.checkbox}>
            <CheckBox value={conditionsMet.length} disabled />
            <Text style={styles.textWhite}>8 characters minimum</Text>
          </View>
        </View>
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
  textSign: {
    color: "#FFD482",
    textDecorationLine: "underline",
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
    fontWeight: 400,
    lineHeight: 20,
    color: "#fff",
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },

  passwordVisibilityButton: {
    position: "absolute",
    right: 0,
    marginRight: 10,
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
    fontWeight: 600,
  },
  bottomTextContainer: {
    position: "absolute",
    bottom: 20, // Adjust as needed
  },
  bottomText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: 600,
  },
  checkboxContainer: {
    marginTop: 20,
  },
  checkboxRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
    color: "#fff",
  },
  checkbox: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,

    borderRadius: "50%",
  },
  textWhite: {
    color: "#fff",
    marginLeft: 10,
  },
});

export default SignUpScreen;
