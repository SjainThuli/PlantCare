// import React from 'react';
// import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { router, useRouter } from 'expo-router';

// export default function ResultScreen() {
//   const router = useRouter();
//   const { imageUri, predictionData } = router.query;

//   return (
//     <View style={styles.container}>
//       <Image source={{ uri: imageUri }} style={styles.image} />

//       <View style={styles.resultContainer}>
//         <Text style={styles.successText}>✅ Hurray, we identified the leaf!</Text>
//         <Text style={styles.title}>{predictionData.prediction || 'Healthy Leaf'}</Text>

//         <View style={styles.tagsContainer}>
//           <Text style={styles.tag}>Outdoor</Text>
//           <Text style={styles.tag}>Price / kg</Text>
//           <Text style={styles.tag}>Healthy Leaf</Text>
//         </View>

//         <ScrollView>
//           <Text style={styles.sectionTitle}>Description</Text>
//           <Text style={styles.description}>
//             {predictionData.description || "From Wikipedia, the free encyclopedia: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eu..."}
//           </Text>

//           <View style={styles.detailsContainer}>
//             <View style={styles.detailItem}>
//               <Ionicons name="expand" size={24} color="#4caf50" />
//               <Text style={styles.detailLabel}>Height</Text>
//               <Text style={styles.detailValue}>Small</Text>
//             </View>

//             <View style={styles.detailItem}>
//               <Ionicons name="water" size={24} color="#2196f3" />
//               <Text style={styles.detailLabel}>Water</Text>
//               <Text style={styles.detailValue}>333ml</Text>
//             </View>

//             <View style={styles.detailItem}>
//               <Ionicons name="sunny" size={24} color="#ff9800" />
//               <Text style={styles.detailLabel}>Light</Text>
//               <Text style={styles.detailValue}>Normal</Text>
//             </View>

//             <View style={styles.detailItem}>
//               <Ionicons name="cloudy" size={24} color="#9c27b0" />
//               <Text style={styles.detailLabel}>Humidity</Text>
//               <Text style={styles.detailValue}>56%</Text>
//             </View>
//           </View>
//         </ScrollView>

//         <TouchableOpacity style={styles.saveButton}>
//           <Text style={styles.saveButtonText}>Save this plant</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   image: {
//     width: '100%',
//     height: '40%',
//   },
//   resultContainer: {
//     flex: 1,
//     backgroundColor: '#fff',
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//     marginTop: -30,
//     padding: 20,
//   },
//   successText: {
//     color: 'green',
//     fontSize: 16,
//     fontWeight: '500',
//     marginBottom: 10,
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   tagsContainer: {
//     flexDirection: 'row',
//     marginVertical: 10,
//     gap: 10,
//     flexWrap: 'wrap',
//   },
//   tag: {
//     backgroundColor: '#eee',
//     borderRadius: 15,
//     paddingHorizontal: 12,
//     paddingVertical: 5,
//     fontSize: 12,
//     color: '#555',
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: '600',
//     marginTop: 20,
//     marginBottom: 5,
//     color: '#333',
//   },
//   description: {
//     color: '#666',
//     fontSize: 14,
//     marginBottom: 15,
//   },
//   detailsContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//     marginVertical: 10,
//   },
//   detailItem: {
//     width: '45%',
//     backgroundColor: '#f7f7f7',
//     padding: 10,
//     borderRadius: 10,
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   detailLabel: {
//     fontSize: 14,
//     color: '#777',
//     marginTop: 5,
//   },
//   detailValue: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginTop: 3,
//   },
//   saveButton: {
//     backgroundColor: '#4caf50',
//     paddingVertical: 15,
//     borderRadius: 12,
//     marginTop: 20,
//     alignItems: 'center',
//   },
//   saveButtonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  ScrollView, 
  Alert,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';

type PredictionData = {
  prediction: string;
  confidence?: number;
  description?: string;
};

export default function ResultScreen() {
  const params = useLocalSearchParams();
  
  // Safely parse the prediction data
  const predictionData: PredictionData = params.predictionData 
    ? JSON.parse(params.predictionData as string)
    : { prediction: 'Unknown', description: 'No diagnosis available' };

  const imageUri = params.imageUri as string;
  
  const [saving, setSaving] = React.useState(false);
  const [imageLoaded, setImageLoaded] = React.useState(false);

  if (!imageUri) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="warning" size={48} color="#ff9800" />
        <Text style={styles.errorText}>No image data available</Text>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      Alert.alert('Saved', 'Diagnosis saved to your history');
    }, 1500);
  };

  const confidencePercentage = predictionData.confidence 
    ? `${(predictionData.confidence * 100).toFixed(1)}% confidence` 
    : '';

  return (
    <View style={styles.container}>
      {!imageLoaded && (
        <View style={styles.imagePlaceholder}>
          <ActivityIndicator size="large" color="#4caf50" />
        </View>
      )}
      <Image 
        source={{ uri: imageUri }} 
        style={styles.image} 
        onLoad={() => setImageLoaded(true)}
      />

      <View style={styles.resultContainer}>
        <Text style={styles.successText}>✅ Analysis Complete</Text>
        <Text style={styles.title}>{predictionData.prediction}</Text>
        {confidencePercentage && (
          <Text style={styles.confidenceText}>{confidencePercentage}</Text>
        )}

        <ScrollView style={styles.scrollContainer}>
          <Text style={styles.sectionTitle}>Details</Text>
          <Text style={styles.description}>
            {predictionData.description || 'Detailed analysis not available.'}
          </Text>

          <View style={styles.detailsContainer}>
            <View style={styles.detailItem}>
              <Ionicons name="leaf" size={24} color="#4caf50" />
              <Text style={styles.detailLabel}>Status</Text>
              <Text style={styles.detailValue}>
                {predictionData.prediction?.includes('Healthy') ? 'Healthy' : 'Diseased'}
              </Text>
            </View>

            <View style={styles.detailItem}>
              <Ionicons name="medkit" size={24} color="#f44336" />
              <Text style={styles.detailLabel}>Treatment</Text>
              <Text style={styles.detailValue}>
                {predictionData.prediction?.includes('Healthy') ? 'None needed' : 'Consult specialist'}
              </Text>
            </View>
          </View>
        </ScrollView>

        <TouchableOpacity 
          style={styles.saveButton}
          onPress={handleSave}
          disabled={saving}
        >
          {saving ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.saveButtonText}>Save Diagnosis</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imagePlaceholder: {
    width: '100%',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: '100%',
    height: 300,
  },
  resultContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    padding: 25,
    paddingBottom: 20,
  },
  successText: {
    color: '#4caf50',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  confidenceText: {
    color: '#666',
    fontSize: 14,
    marginBottom: 15,
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 10,
    color: '#333',
  },
  description: {
    color: '#666',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 20,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  detailItem: {
    width: '48%',
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
  },
  detailLabel: {
    fontSize: 14,
    color: '#777',
    marginTop: 8,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 5,
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#4caf50',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  errorText: {
    fontSize: 18,
    color: '#333',
    marginVertical: 20,
  },
  backButton: {
    backgroundColor: '#4caf50',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});