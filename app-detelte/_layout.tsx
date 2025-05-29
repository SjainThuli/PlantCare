import { Stack } from "expo-router";
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './HomeScreen';
import DashboardScreen from './(tabs)/DashboardScreen';
import ExploreScreen from './ExploreScreen';
import SavedScreen from './SavedScreen';
import ProfileScreen from './ProfileScreen';


const Tab = createBottomTabNavigator();

export default function App() {
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Home') iconName = 'home-outline';
            else if (route.name === 'Explore') iconName = 'compass-outline';
            else if (route.name === 'Saved') iconName = 'bookmark-outline';
            else if (route.name === 'Profile') iconName = 'person-outline';

            return <Ionicons name={iconName as any} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#22c55e',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Explore" component={DashboardScreen}  option={{ tabBarLabel: 'Dashboard' }}/>
        <Tab.Screen name="Saved" component={SavedScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>

  );
}

