import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  SafeAreaView, 
  StyleSheet, 
  TextInput, 
  Modal,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

// Types
interface Field {
  name: string;
  location: string;
  shape: string;
  size: string;
  soilType: string;
  crops: string[];
}

interface FieldShape {
  type: string;
  component: JSX.Element;
}

interface DropdownOption {
  label: string;
  value: string;
}

interface AddFieldDetailsScreenProps {
  navigation: any;
}

// API Configuration
const API_BASE_URL = 'http://192.168.8.100:3000'; // Replace with your actual API URL

// API Service
const fieldService = {
  async createField(field: Field): Promise<{ success: boolean; message: string }> {
    const response = await fetch(`${API_BASE_URL}/api/fields/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(field),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to create field');
    }
    
    return data;
  },
};

const AddFieldDetailsScreen: React.FC<AddFieldDetailsScreenProps> = ({ navigation }) => {
  // State Management
  const [fieldName, setFieldName] = useState('');
  const [location, setLocation] = useState('');
  const [fieldSize, setFieldSize] = useState('Select Size');
  const [soilType, setSoilType] = useState('Select Type');
  const [crops, setCrops] = useState<string[]>([]);
  const [currentShapeIndex, setCurrentShapeIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [newCrop, setNewCrop] = useState('');
  
  // Modal States
  const [showSizeDropdown, setShowSizeDropdown] = useState(false);
  const [showSoilDropdown, setShowSoilDropdown] = useState(false);
  const [showCropModal, setShowCropModal] = useState(false);

  // Options Data
  const fieldSizes: DropdownOption[] = [
    { label: '< 50 Acres', value: '< 50 Acres' },
    { label: '50-100 Acres', value: '50-100 Acres' },
    { label: '100-200 Acres', value: '100-200 Acres' },
    { label: '200-500 Acres', value: '200-500 Acres' },
    { label: '> 500 Acres', value: '> 500 Acres' },
  ];

  const soilTypes: DropdownOption[] = [
    { label: 'Clay Soil', value: 'Clay' },
    { label: 'Sandy Soil', value: 'Sandy' },
    { label: 'Silt Soil', value: 'Silt' },
    { label: 'Peat Soil', value: 'Peat' },
    { label: 'Loam Soil', value: 'Loam' },
    { label: 'Chalk Soil', value: 'Chalk' },
  ];

  const shapes: FieldShape[] = [
    {
      type: 'Rectangle',
      component: <View style={[styles.shape, styles.rectangle]} />
    },
    {
      type: 'Square',
      component: <View style={[styles.shape, styles.square]} />
    },
    {
      type: 'Other',
      component: <View style={[styles.shape, styles.other]} />
    }
  ];

  // Handlers
  const handlePrevShape = () => {
    setCurrentShapeIndex((prev) => (prev === 0 ? shapes.length - 1 : prev - 1));
  };

  const handleNextShape = () => {
    setCurrentShapeIndex((prev) => (prev === shapes.length - 1 ? 0 : prev + 1));
  };

  const handleAddCrop = () => {
    if (newCrop.trim()) {
      setCrops([...crops, newCrop.trim()]);
      setNewCrop('');
      setShowCropModal(false);
    }
  };

  const handleRemoveCrop = (cropToRemove: string) => {
    setCrops(crops.filter(crop => crop !== cropToRemove));
  };

  const handleAddField = async () => {
    try {
      if (!fieldName || !location || fieldSize === 'Select Size' || soilType === 'Select Type') {
        Alert.alert('Error', 'Please fill in all required fields');
        return;
      }

      setIsLoading(true);

      const fieldData = {
        name: fieldName,
        location: location,
        shape: shapes[currentShapeIndex].type,
        size: fieldSize,
        soilType: soilType,
        crops: crops,
      };

      const result = await fieldService.createField(fieldData);
      Alert.alert('Success', result.message);
      navigation.goBack();
    } catch (error) {
      console.error('Error adding field:', error);
      Alert.alert('Error', error instanceof Error ? error.message : 'Failed to add field');
    } finally {
      setIsLoading(false);
    }
  };

  // Render Helpers
  const renderDropdownModal = (
    visible: boolean,
    onClose: () => void,
    options: DropdownOption[],
    onSelect: (value: string) => void
  ) => (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={styles.modalOverlay} 
        activeOpacity={1} 
        onPress={onClose}
      >
        <View style={styles.dropdownModal}>
          <FlatList
            data={options}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => {
                  onSelect(item.value);
                  onClose();
                }}
              >
                <Text style={styles.dropdownItemText}>{item.label}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );

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
        {/* Field Name Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Field Name"
            value={fieldName}
            onChangeText={setFieldName}
          />
          <Ionicons name="create-outline" size={20} color="#666" style={styles.inputIcon} />
        </View>

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
          <Text style={styles.label}>Field Shape:</Text>
          <View style={styles.shapeSelector}>
            <TouchableOpacity style={styles.shapeArrow} onPress={handlePrevShape}>
              <Ionicons name="chevron-back" size={24} color="#666" />
            </TouchableOpacity>
            <View style={styles.shapePreview}>
              {shapes[currentShapeIndex].component}
              <Text style={styles.shapeText}>{shapes[currentShapeIndex].type}</Text>
            </View>
            <TouchableOpacity style={styles.shapeArrow} onPress={handleNextShape}>
              <Ionicons name="chevron-forward" size={24} color="#666" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Field Size and Soil Type */}
        <View style={styles.rowContainer}>
          <TouchableOpacity 
            style={[styles.dropdown, { flex: 1, marginRight: 8 }]}
            onPress={() => setShowSizeDropdown(true)}
          >
            <Text style={styles.label}>Field Size:</Text>
            <Text style={styles.dropdownText}>{fieldSize}</Text>
            <Ionicons name="chevron-down" size={20} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.dropdown, { flex: 1, marginLeft: 8 }]}
            onPress={() => setShowSoilDropdown(true)}
          >
            <Text style={styles.label}>Soil Type:</Text>
            <Text style={styles.dropdownText}>{soilType}</Text>
            <Ionicons name="chevron-down" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Crops Section */}
        <View style={styles.cropsButton}>
          <Text style={styles.label}>Existing Crops:</Text>
          <View style={styles.cropsList}>
            {crops.map((crop, index) => (
              <View key={index} style={styles.cropTag}>
                <Text style={styles.cropTagText}>{crop}</Text>
                <TouchableOpacity onPress={() => handleRemoveCrop(crop)}>
                  <Ionicons name="close-circle" size={20} color="#666" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
          <TouchableOpacity 
            style={styles.addCropButton}
            onPress={() => setShowCropModal(true)}
          >
            <Text style={styles.addCropText}>Add Crop</Text>
            <Ionicons name="add-circle-outline" size={24} color="#4BA586" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Add Field Button */}
      <TouchableOpacity 
        style={[styles.addButton, isLoading && styles.disabledButton]}
        onPress={handleAddField}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.addButtonText}>Add Field</Text>
        )}
      </TouchableOpacity>

      {/* Modals */}
      {renderDropdownModal(
        showSizeDropdown,
        () => setShowSizeDropdown(false),
        fieldSizes,
        setFieldSize
      )}

      {renderDropdownModal(
        showSoilDropdown,
        () => setShowSoilDropdown(false),
        soilTypes,
        setSoilType
      )}

      {/* Add Crop Modal */}
      <Modal
        visible={showCropModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowCropModal(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setShowCropModal(false)}
        >
          <View style={styles.cropModal}>
            <Text style={styles.modalTitle}>Add New Crop</Text>
            <TextInput
              style={styles.cropInput}
              placeholder="Enter crop name"
              value={newCrop}
              onChangeText={setNewCrop}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowCropModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleAddCrop}
              >
                <Text style={styles.confirmButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    disabledButton: {
        opacity: 0.7
      },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
      },
      dropdownModal: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        width: '80%',
        maxHeight: '50%',
      },
      dropdownItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E8E8E8',
      },
      dropdownItemText: {
        fontSize: 16,
        color: '#333',
      },
      cropModal: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 20,
        width: '80%',
      },
      modalTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 16,
      },
      cropInput: {
        borderWidth: 1,
        borderColor: '#E8E8E8',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        marginBottom: 16,
      },
      modalButtons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
      },
      modalButton: {
        padding: 12,
        borderRadius: 8,
        marginLeft: 12,
      },
      cancelButton: {
        backgroundColor: '#E8E8E8',
      },
      confirmButton: {
        backgroundColor: '#2D6A4F',
      },
      cancelButtonText: {
        color: '#333',
        fontSize: 16,
      },
      confirmButtonText: {
        color: 'white',
        fontSize: 16,
      },
      cropsList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 8,
        marginBottom: 12,
      },
      cropTag: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E8F5F1',
        borderRadius: 16,
        padding: 8,
        marginRight: 8,
        marginBottom: 8,
      },
      cropTagText: {
        color: '#2D6A4F',
        marginRight: 4,
      },
      addCropButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
      },
      addCropText: {
        color: '#4BA586',
        fontSize: 16,
        marginRight: 8,
      },
    
    shape: {
        width: 100,
        height: 60,
        backgroundColor: '#2D6A4F',
        marginBottom: 8,
      },
        rectangle: {
            borderRadius: 8,
            transform: [{rotate: '15deg'}],
        },
        square: {
            borderRadius: 0,
            transform: [{rotate: '45deg'}],
            width: 80,
            height: 80,
        },
        other: {
            borderRadius: 12,
            transform: [{rotate: '-15deg'}],
            width: 120,
            height: 80,

        },
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