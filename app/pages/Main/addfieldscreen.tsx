import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

interface AddFieldDetailsScreenProps {
  navigation: any; 
}

const AddFieldDetailsScreen: React.FC<AddFieldDetailsScreenProps> = ({ navigation }) => {
  const [location, setLocation] = useState('');
  const [fieldSize, setFieldSize] = useState('50-100 Acres');
  const [soilType, setSoilType] = useState('Select');
  const [crops, setCrops] = useState('Add Crops');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Field Details</Text>
      </View>

      {/* Form Fields */}
      <View style={styles.formContainer}>
        {/* Location Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Location"
            value={location}
            onChangeText={setLocation}
          />
          <Ionicons name="location-outline" size={20} color="#666" style={styles.inputIcon} />
        </View>

        {/* Field Shape Selector */}
        <View style={styles.shapeContainer}>
          <Text style={styles.label}>Field Shape :</Text>
          <View style={styles.shapeSelector}>
            <TouchableOpacity style={styles.shapeArrow}>
              <Ionicons name="chevron-back" size={24} color="#666" />
            </TouchableOpacity>
            <View style={styles.shapePreview}>
              <View style={styles.rectangleShape} />
              <Text style={styles.shapeText}>Rectangle</Text>
            </View>
            <TouchableOpacity style={styles.shapeArrow}>
              <Ionicons name="chevron-forward" size={24} color="#666" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Field Size and Soil Type */}
        <View style={styles.rowContainer}>
          <TouchableOpacity style={[styles.dropdown, { flex: 1, marginRight: 8 }]}>
            <Text style={styles.label}>Field Size:</Text>
            <Text style={styles.dropdownText}>{fieldSize}</Text>
            <Ionicons name="chevron-down" size={20} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.dropdown, { flex: 1, marginLeft: 8 }]}>
            <Text style={styles.label}>Soil Type:</Text>
            <Text style={styles.dropdownText}>{soilType}</Text>
            <Ionicons name="chevron-down" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Exists Crops */}
        <TouchableOpacity style={styles.cropsButton}>
          <Text style={styles.label}>Exists Crops:</Text>
          <View style={styles.cropsContent}>
            <Text style={styles.cropsText}>{crops}</Text>
            <Ionicons name="add-circle-outline" size={24} color="#4BA586" />
          </View>
        </TouchableOpacity>
      </View>

      {/* Add Field Button */}
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Add Field</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5F1',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 8,
    color: '#333',
  },
  formContainer: {
    padding: 16,
  },
  inputContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  inputIcon: {
    marginLeft: 8,
  },
  shapeContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  shapeSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  shapeArrow: {
    padding: 8,
  },
  shapePreview: {
    alignItems: 'center',
  },
  rectangleShape: {
    width: 100,
    height: 60,
    backgroundColor: '#2D6A4F',
    borderRadius: 8,
    marginBottom: 8,
  },
  shapeText: {
    fontSize: 16,
    color: '#666',
  },
  rowContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  dropdown: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
  },
  dropdownText: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  cropsButton: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
  },
  cropsContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  cropsText: {
    fontSize: 16,
    color: '#666',
  },
  addButton: {
    backgroundColor: '#2D6A4F',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default AddFieldDetailsScreen;