import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export interface Field {
    id: number;
    name: string;
    location: string;
  }
  
  
  interface FieldSelectorProps {
    selectedField: Field | null;
    onSelectField: (field: Field) => void;
    isVisible: boolean;
    onClose: () => void;
    fields: Field[];
  }
  
  const FieldSelector: React.FC<FieldSelectorProps> = ({
    selectedField,
    onSelectField,
    isVisible,
    onClose,
    fields,
  }) => {
    const renderField = ({ item }: { item: Field }) => (
      <TouchableOpacity
        style={styles.fieldItem}
        onPress={() => {
          onSelectField(item);
          onClose();
        }}
      >
        <Text style={styles.fieldName}>{item.name}</Text>
        <Text style={styles.fieldLocation}>{item.location}</Text>
      </TouchableOpacity>
    );
  
    return (
      <Modal visible={isVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Field</Text>
              <TouchableOpacity onPress={onClose}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={fields}
              renderItem={renderField}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={styles.fieldList}
            />
          </View>
        </View>
      </Modal>
    );
  };
  
  const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: '#fff',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 16,
      maxHeight: '80%',
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#333',
    },
    fieldList: {
      paddingBottom: 16,
    },
    fieldItem: {
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
    },
    fieldName: {
      fontSize: 18,
      color: '#333',
      marginBottom: 4,
    },
    fieldLocation: {
      fontSize: 14,
      color: '#666',
    },
  });
  
  export default FieldSelector;
  