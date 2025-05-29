import { Image, StyleSheet, Text, TouchableOpacity, Dimensions, View } from 'react-native';
import React from 'react';
import { router } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
    <Image
      source={require('/Users/thulisjain/Desktop/PLANT_CARE_APP/PlantCareExpo/assets/images/early-blight.jpg')} // Make sure the image exists in assets folder
      style={styles.logo}
      resizeMode="contain"
    />
    <Text style={styles.title}>Potato Care</Text>
    <Text style={styles.subtitle}>Detect potato leaf diseases & get care tips.</Text>

    <TouchableOpacity style={styles.button} onPress={() => router.push('DashboardScreen', { screen: 'Explore' })}      >
      <Text style={styles.buttonText}>Diagnose Now</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.secondaryButton} onPress={() => router.push('Learn')}>
      <Text style={styles.secondaryButtonText}>Learn More</Text>
    </TouchableOpacity>
  </View>
  );
}
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefefe',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: width * 0.5,
    height: width * 0.5,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#3b3b3b',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#6e6e6e',
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginBottom: 15,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryButton: {
    borderColor: '#4CAF50',
    borderWidth: 2,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#4CAF50',
    fontSize: 18,
    fontWeight: '600',
  },
});

