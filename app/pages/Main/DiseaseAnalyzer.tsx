import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

const BACKEND_URL = "http://192.168.8.143:5000/predict";

const DiseaseAnalyzer = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [plantType, setPlantType] = useState("");
  const [plantAge, setPlantAge] = useState("");
  const [loading, setLoading] = useState(false);  
  const [prediction, setPrediction] = useState(null);

  const pickImage = async (useCamera) => {
    setModalVisible(false);

    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "You need to allow access to photos!");
      return;
    }

    const result = await (useCamera
      ? ImagePicker.launchCameraAsync()
      : ImagePicker.launchImageLibraryAsync());

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage || !plantType || !plantAge){
      Alert.alert("Missing Data", "Please upload an image and fill all fields.");
      location.reload();
    }

    setLoading(true);
    setPrediction(null);

    let formData = new FormData();
    formData.append("image", {
      uri: selectedImage,
      name: "plant.jpg",
      type: "image/jpeg",
    });

    formData.append("plant_type", plantType);
    formData.append("plant_age", plantAge);

    try{
      console.log(formData);

      let response = await fetch(BACKEND_URL, {
        method: "POST",
        body: formData,
        headers: {
        },
      });
      

      let data = await response.json();
      setPrediction(data);
      console.log(data);
    }catch(error){
      console.log(error);
      Alert.alert("Error", "An error occurred while analyzing the image.");
    }

    setLoading(false);
  }; 

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton}>
        <Ionicons name="arrow-back-outline" size={24} color="#3D3D3D" />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.header}>AI & Other Tools</Text>
      <Text style={styles.subHeader}>Crop Disease Analyzer</Text>

      {/* Image Upload Box */}
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.imageBox}>
        {selectedImage ? (
          <Image source={{ uri: selectedImage }} style={styles.image} />
        ) : (
          <>
            <Ionicons name="cloud-upload-outline" size={40} color="#00A67E" />
            <Text style={styles.imageText}>Upload or capture your affected plant image</Text>
          </>
        )}
      </TouchableOpacity>

      {/* Plant Information Section */}
      <Text style={styles.label}>Plant Information <Text style={{ color: "red" }}>*</Text></Text>
      
      {/* Plant Type Picker */}
      <View style={styles.inputContainer}>
        <Picker selectedValue={plantType} onValueChange={setPlantType}>
          <Picker.Item label="Plant Type" value="" />
          <Picker.Item label="Tomato" value="tomato" />
          <Picker.Item label="Potato" value="potato" />
          <Picker.Item label="Cabbage" value="cabbage" />
        </Picker>
      </View>

      {/* Plant Age Picker */}
      <View style={styles.inputContainer}>
        <Picker selectedValue={plantAge} onValueChange={setPlantAge}>
          <Picker.Item label="Age of the Plant" value="" />
          <Picker.Item label="1-3 months" value="1-3 months" />
        <Picker.Item label="4-6 months" value="4-6 months" />
        <Picker.Item label="7-12 months" value="7-12 months" />
        <Picker.Item label="More than a year" value="More than a year" />
        </Picker>
      </View>

      {/* Analyse Button */}
      <TouchableOpacity onPress={analyzeImage} style={styles.button}>
        <Text style={styles.buttonText}>Analyse</Text>
      </TouchableOpacity>

      {/* Prediction Result */}
      {loading && <ActivityIndicator size={"large"} color={"#00A67E"} style={{marginTop: 20}} />}

      {prediction && (
        <View style={styles.resultBox}>
          <Text style={styles.resultText}>Disease:{prediction.class}</Text>
          <Text style={styles.resultText}>Confidence: {prediction.confidence}</Text>
          <Text style={styles.resultText}>Instructoin: {prediction.instructions}</Text>
        </View>
      )}

      {/* Image Selection Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => pickImage(true)} style={styles.modalButton}>
              <Text style={styles.modalText}>Take a Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => pickImage(false)} style={styles.modalButton}>
              <Text style={styles.modalText}>Upload from Device</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelButton}>
              <Text style={styles.modalText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2FBF6",
    padding: 20,
  },
  backButton: {
    position: "absolute",
    top: 55,
    left: 30,
  },
  header: {
    fontSize: 20,
    fontWeight: "500",
    color: "#3D3D3D",
    marginTop: 75,
    marginLeft: 12
  },
  subHeader: {
    fontSize: 28,
    fontWeight: "700",
    color: "#017B5E",
    marginBottom: 20,
    marginLeft: 10
  },
  imageBox: {
    width: "100%",
    height: 180,
    backgroundColor: "#E6F7F0",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    marginBottom: 20,
  },
  imageText: {
    color: "#1A1A1A",
    textAlign: "center",
    marginTop: 5,
    fontWeight: 600,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 5,
  },
  inputContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#00A67E",
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalButton: {
    paddingVertical: 15,
    width: "100%",
    alignItems: "center",
  },
  modalText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1A1A1A",
  },
  cancelButton: {
    marginTop: 10,
    paddingVertical: 10,
    width: "100%",
    alignItems: "center",
  },
  resultBox: {
    marginTop: 20, 
    backgroundColor: "#E6F7F0", 
    padding: 15, 
    borderRadius: 8 
  },
  resultText: { 
    fontSize: 16, 
    color: "#1A1A1A", 
  }
});

export default DiseaseAnalyzer;
