import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';

export interface AddHarvestFormData {
  fieldName: string;
  quantity: string;
  price: string;
  description: string;
  location: string;
}

interface AddHarvestModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: AddHarvestFormData) => void;
}

export const AddHarvestModal: React.FC<AddHarvestModalProps> = ({
  visible,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<AddHarvestFormData>({
    fieldName: '',
    quantity: '',
    price: '',
    description: '',
    location: '',
  });

  const validateForm = () => {
    if (!formData.fieldName || !formData.quantity || !formData.price || !formData.location) {
      Alert.alert('Error', 'Please fill in all required fields');
      return false;
    }
    if (isNaN(Number(formData.price)) || isNaN(Number(formData.quantity))) {
      Alert.alert('Error', 'Price and quantity must be valid numbers');
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
      setFormData({
        fieldName: '',
        quantity: '',
        price: '',
        description: '',
        location: '',
      });
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add Your Harvest</Text>
          
          <ScrollView style={styles.formContainer}>
            <Text style={styles.label}>Field Name *</Text>
            <TextInput
              style={styles.input}
              value={formData.fieldName}
              onChangeText={(text) => setFormData({ ...formData, fieldName: text })}
              placeholder="Enter field name"
            />

            <Text style={styles.label}>Quantity (kg) *</Text>
            <TextInput
              style={styles.input}
              value={formData.quantity}
              onChangeText={(text) => setFormData({ ...formData, quantity: text })}
              placeholder="Enter quantity"
              keyboardType="numeric"
            />

            <Text style={styles.label}>Price per kg (Rs.) *</Text>
            <TextInput
              style={styles.input}
              value={formData.price}
              onChangeText={(text) => setFormData({ ...formData, price: text })}
              placeholder="Enter price"
              keyboardType="numeric"
            />

            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={formData.description}
              onChangeText={(text) => setFormData({ ...formData, description: text })}
              placeholder="Enter description"
              multiline
              numberOfLines={4}
            />

            <Text style={styles.label}>Location *</Text>
            <TextInput
              style={styles.input}
              value={formData.location}
              onChangeText={(text) => setFormData({ ...formData, location: text })}
              placeholder="Enter location"
            />
          </ScrollView>

          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.button, styles.cancelButton]} 
              onPress={onClose}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.submitButton]} 
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};


const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  formContainer: {
    maxHeight: '80%',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  cancelButton: {
    backgroundColor: '#f5f5f5',
  },
  submitButton: {
    backgroundColor: '#00875A',
  },
  cancelButtonText: {
    color: '#333',
    textAlign: 'center',
    fontWeight: '600',
  },
  submitButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
  },
});
