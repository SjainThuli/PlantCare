import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView
} from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { router } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const DashboardScreen = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.title}>Potato Care</Text>
        <View style={styles.headerIcons}>
          {/* Add search and notification icons */}
          <Text>🔍</Text>
          <Text style={{ marginLeft: 15 }}>🔔</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.scanButton}
       onPress={() => router.push('CameraScreen')}>
        <View style={styles.scanButtonContent}>
        <Ionicons 
        name="qr-code-outline" size={22} color="#067A46" style={styles.scanIcon} />
        <Text style={styles.scanButtonText}>Scan and diagnose the plant</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Popular diseases</Text>
        <Text style={styles.viewAll}>View all</Text>
      </View>

      <View style={styles.diseaseCards}>
        <View style={styles.diseaseCard}>
          <Image source={require('/Users/thulisjain/Desktop/PLANT_CARE_APP/PlantCareExpo/assets/images/early-blight.jpg')} style={styles.diseaseImage} />
          <Text style={styles.diseaseLabel}>Early Blight</Text>
        </View>
        <View style={styles.diseaseCard}>
          <Image source={require('/Users/thulisjain/Desktop/PLANT_CARE_APP/PlantCareExpo/assets/images/late-blight.jpg')} style={styles.diseaseImage} />
          <Text style={styles.diseaseLabel}>Late Blight</Text>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <Text style={styles.viewAll}>View all</Text>
      </View>

      <View style={styles.categories}>
        <View style={styles.categoryItem}>
          <Text style={styles.categoryTitle}><Ionicons name="leaf" size={20} color="#4CAF50" />
          Sweet Potato</Text>
          <Text style={styles.categoryCount}>2 Plants</Text>
        </View>
        <View style={styles.categoryItem}>
          <Text style={styles.categoryTitle}>🟣 Red Potato</Text>
          <Text style={styles.categoryCount}>1 Plant</Text>
        </View>
        <View style={styles.categoryItem}>
          <Text style={styles.categoryTitle}>🟤 Russet Potato</Text>
          <Text style={styles.categoryCount}>2 Plants</Text>
        </View>
        <View style={styles.categoryItem}>
          <Text style={styles.categoryTitle}>💜 Petite Potato</Text>
          <Text style={styles.categoryCount}>0 Plants</Text>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Alerts for today</Text>
        <Text style={styles.viewAll}>View all</Text>
      </View>

       <View style={styles.alertsBox}>
          <Ionicons name="alert-circle" size={24} color="#FF9800" />
          <Text style={styles.alertText1}>
            Potato prices up by RPMg are set on gs. We may be guaranteed to have them at the expense.
          </Text>
        </View>
        <View>
        <Text style={styles.alertText}>📈 Potato prices up by RS/kg amid crop...</Text>
        <Text style={styles.alertText}>💧 Water the field at 5pm and 5am everyday...</Text>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 50,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
  },
  scanButton: {
    backgroundColor: '#D1FADF',
    padding: 16,
    borderRadius: 10,
    marginVertical: 16,
    alignItems: 'center',
  },
  scanButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scanIcon: {
    marginRight: 10,
  },
  
  scanButtonText: {
    color: '#067A46',
    fontWeight: '500',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  viewAll: {
    color: '#27AE60',
  },
  diseaseCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  diseaseCard: {
    width: '48%',
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  diseaseImage: {
    width: 80,
    height: 80,
    marginBottom: 8,
  },
  diseaseLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryItem: {
    width: '48%',
    backgroundColor: '#F6F6F6',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  categoryTitle: {
    fontWeight: '500',
    marginBottom: 4,
  },
  categoryCount: {
    color: '#999',
    fontSize: 12,
  },
  alerts: {
    marginTop: 8,
  },
  alertText: {
    fontSize: 14,
    paddingVertical: 4,
  },
  alertText1: {
    fontSize: 14,
    color: '#E65100',
    marginLeft: 8,
    flex: 1,
  },
  alertsBox: {
    flexDirection: 'row',
    backgroundColor: '#FFF3E0',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
});

export default DashboardScreen;
