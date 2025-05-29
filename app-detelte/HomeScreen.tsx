import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { router } from 'expo-router';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/images/icon.png')} // ✅ Place this image in assets/images folder at project root
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Potato Care</Text>
      <Text style={styles.subtitle}>Detect potato leaf diseases & get care tips.</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/DashboardScreen')} // ✅ Navigates to dashboard/index.tsx
      >
        <Text style={styles.buttonText}>Diagnose Now</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => router.push('/learn')} // ✅ Navigates to learn.tsx
      >
        <Text style={styles.secondaryButtonText}>Learn More</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

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
