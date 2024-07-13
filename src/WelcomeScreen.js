import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, Button } from 'react-native';
import axios from 'axios';
import { Ionicons } from "@expo/vector-icons";

const WelcomeScreen = ({ navigation }) => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://thronesapi.com/api/v2/Characters')
      .then(response => {
        const characters = response.data;
        setCharacters(characters);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  return (
    <View style={styles.container}>

<TouchableOpacity
        onPress={() => navigation.navigate('Profile')}
        style={styles.settingsButton}
      >
        <Ionicons
          name={"settings"}
          size={30}
          color="#C0C0C0"
          marginTop={20}
        />
      </TouchableOpacity>

    
      <View style={styles.listContainer}>
      <Text style={styles.text}>Welcome to the Game of Thrones Character List!</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={characters}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Text style={styles.name}>{item.fullName}</Text>
              <Text style={styles.title}>{item.title}</Text>
            </View>
          )}
          keyExtractor={item => item.id}
        />
      )}
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
    marginBottom: 10,
    color: '#fff',
    textAlign: 'center'
  }, 
  listContainer: {
marginTop: 30
  },
 
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff'
  },
  title: {
    fontSize: 16,
    color: '#666',
    color: '#fff'
  },
 
});

export default WelcomeScreen;
