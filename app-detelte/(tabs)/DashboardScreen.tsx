import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function DashboardScreen() {
  const navigation = useNavigation();

  return (
    <ScrollView className="bg-white flex-1 px-4 pt-12">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-2xl font-bold">Potato Care</Text>
        <View className="flex-row space-x-4">
          <TouchableOpacity>
            <Feather name="search" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Diagnose Button */}
      <TouchableOpacity className="bg-green-100 p-4 rounded-xl flex-row justify-center items-center mb-4">
        <Ionicons name="scan-circle-outline" size={24} color="#16a34a" />
        <Text className="text-green-700 font-medium ml-2">
          Scan and diagnose the plant
        </Text>
      </TouchableOpacity>

      {/* Popular Diseases */}
      <View className="mb-4">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-lg font-semibold">Popular diseases</Text>
          <TouchableOpacity>
            <Text className="text-green-700">View all</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row space-x-4">
          <View className="bg-gray-100 rounded-lg p-2 w-32 items-center">
            <Image
              source={require('../assets/images/icon.png')}
              className="h-20 w-full rounded"
              resizeMode="contain"
            />
            <Text className="text-sm text-gray-700 mt-1">Early Blight</Text>
          </View>

          <View className="bg-gray-100 rounded-lg p-2 w-32 items-center">
            <Image
              source={require('../assets/images/icon.png')}
              className="h-20 w-full rounded"
              resizeMode="contain"
            />
            <Text className="text-sm text-gray-700 mt-1">Late Blight</Text>
          </View>
        </View>
      </View>

      {/* Categories */}
      <View className="mb-4">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-lg font-semibold">Categories</Text>
          <TouchableOpacity>
            <Text className="text-green-700">View all</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row flex-wrap justify-between">
          {[
            { name: 'Sweet Potato', count: 2 },
            { name: 'Red Potato', count: 1 },
            { name: 'Russet Potato', count: 2 },
            { name: 'Petite Potato', count: 2 },
          ].map((item, index) => (
            <View
              key={index}
              className="bg-gray-100 w-[47%] p-4 mb-2 rounded-xl"
            >
              <Text className="text-sm font-medium">{item.name}</Text>
              <Text className="text-xs text-gray-500">{item.count} Plants</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Alerts */}
      <View className="mb-4">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-lg font-semibold">Alerts for today</Text>
          <TouchableOpacity>
            <Text className="text-green-700">View all</Text>
          </TouchableOpacity>
        </View>

        <View className="space-y-2">
          <View className="bg-yellow-50 p-3 rounded-lg">
            <Text className="font-medium">
              Potato prices up by RS/kg amid crop...
            </Text>
            <Text className="text-sm text-gray-500">With crop movement slowed due to...</Text>
          </View>

          <View className="bg-yellow-50 p-3 rounded-lg">
            <Text className="font-medium">
              Water the field at 5pm and 5am everyday...
            </Text>
            <Text className="text-sm text-gray-500">We have 2–3 weeks more of dry heat...</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
