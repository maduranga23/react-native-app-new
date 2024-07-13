import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('SignIn'); // Replace with your main screen after splash
    }, 3000); // 3 seconds
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>My App</Text>
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
    fontWeight: 'bold',
    color: '#fff'
  },
});

export default SplashScreen;
