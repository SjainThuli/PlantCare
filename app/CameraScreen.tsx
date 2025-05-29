// import React, { useState } from 'react';
// import { View, Text, Button, Image, StyleSheet, ActivityIndicator } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import axios from 'axios';
// import { router } from 'expo-router';

// export default function CameraScreen() {
//   const [image, setImage] = useState(null);
//   const [data, setData] = useState(null);
//   const [uploading, setUploading] = useState(false);

//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setImage(result.assets[0]);
//       sendImage(result.assets[0]);
//     }
//   };

//   const sendImage = async (imageData) => {
//     setUploading(true);
//     const formData = new FormData();
//     formData.append('image', {
//       uri: imageData.uri,
//       type: 'image/jpeg',  // or imageData.type
//       name: 'photo.jpg',
//     });

//     try {
//       const response = await axios.post(
//         'http://127.0.0.1:5001/predict', // <-- Replace with your API URL
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         }
//       );

//       console.log(response.data);
//       // setData(response.data);
//       router.push({
//         pathname: '/ResultScreen', 
//         query: { 
//           imageUri: imageData.uri,
//           predictionData: JSON.stringify(response.data) 
//       },
//         });
//     } catch (error) {
//       console.error('Upload failed:', error.response ? error.response.data : error.message);
//     } finally {
//       setUploading(false);
//     }
//   };

//   const clearData = () => {
//     setImage(null);
//     setData(null);
//   };

//   return (
//     <View style={styles.container}>
//       <Button title="Pick an image" onPress={pickImage} />
//       {uploading && <ActivityIndicator size="large" color="#be6a77" style={{ marginTop: 20 }} />}
//       {image && (
//         <Image source={{ uri: image.uri }} style={styles.image} />
//       )}
//       {data && (
//         <View style={styles.result}>
//           <Text style={styles.label}>Label: {data.prediction}</Text>
//           {/* <Text style={styles.confidence}>Confidence: {(parseFloat(data.confidence) * 100).toFixed(2)}%</Text> */}
//           <Button title="Clear" onPress={clearData} color="#be6a77" />
//         </View>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fafafa',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 20,
//   },
//   image: {
//     width: 300,
//     height: 300,
//     marginTop: 20,
//     borderRadius: 15,
//   },
//   result: {
//     marginTop: 20,
//     alignItems: 'center',
//   },
//   label: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   confidence: {
//     fontSize: 18,
//     marginBottom: 10,
//   },
// });

import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { router } from 'expo-router';

export default function CameraScreen() {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    // Request permissions first
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (!permissionResult.granted) {
      alert('Permission to access photos is required!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      allowsMultipleSelection: false,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImage(result.assets[0]);
      await sendImage(result.assets[0]);
    }
  };

  const sendImage = async (imageData) => {
    setUploading(true);
    const formData = new FormData();
    formData.append('image', {
      uri: imageData.uri,
      type: imageData.mimeType || 'image/jpeg',
      name: 'photo.jpg',
    });

    try {
      const response = await axios.post(
        'http://127.0.0.1:5001/predict',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          timeout: 10000,
        }
      );

      // Navigate to ResultScreen with all data
      router.navigate({
        pathname: '/ResultScreen',
        params: {
          imageUri: imageData.uri,
          predictionData: JSON.stringify(response.data),
        },
      });
    } catch (error) {
      console.error('Upload failed:', error);
      Alert.alert(
        'Upload Failed',
        error.response?.data?.message || error.message || 'Something went wrong'
      );
    } finally {
      setUploading(false);
    }
  };

  const clearData = () => {
    setImage(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Plant Disease Detection</Text>
      <Text style={styles.subtitle}>Select an image to analyze</Text>
      
      <Button 
        title="Select Image" 
        onPress={pickImage} 
        disabled={uploading}
        color="#be6a77"
      />

      {uploading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#be6a77" />
          <Text style={styles.loadingText}>Analyzing image...</Text>
        </View>
      )}

      {image && !uploading && (
        <>
          <Image source={{ uri: image.uri }} style={styles.image} />
          <Button 
            title="Clear" 
            onPress={clearData} 
            color="#be6a77"
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    marginVertical: 20,
    borderRadius: 12,
    maxWidth: 400,
  },
  loadingContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
  },
});