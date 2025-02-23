import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

interface VirtualFieldsScreenProps {
  navigation?: any; 
}

const VirtualFieldsScreen: React.FC<VirtualFieldsScreenProps> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        {/* Language selector */}
        <View style={styles.languageContainer}>
          <Text style={styles.languageText}>English</Text>
        </View>
      </View>

      {/* Title Section */}
      <View style={styles.titleContainer}>
        <Text style={styles.subtitle}>Virtual Fields</Text>
        <Text style={styles.title}>Create Your Field</Text>
      </View>

      {/* Add Field Button */}
      <TouchableOpacity 
        style={styles.addFieldButton}
        onPress={() => {
          navigation.navigate('AddFieldDetails');
        }}
      >
        <View style={styles.addFieldContent}>
          <Text style={styles.plusIcon}>+</Text>
          <Text style={styles.addFieldText}>Click here to add your field</Text>
        </View>
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
    justifyContent: 'flex-end',
    padding: 16,
  },
  languageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageText: {
    color: '#2D6A4F',
    fontSize: 16,
  },
  titleContainer: {
    padding: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#2D6A4F',
    marginBottom: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D6A4F',
  },
  addFieldButton: {
    margin: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addFieldContent: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderWidth: 2,
    borderColor: '#4BA586',
    borderStyle: 'dashed',
    borderRadius: 8,
  },
  plusIcon: {
    fontSize: 32,
    color: '#4BA586',
    marginBottom: 8,
  },
  addFieldText: {
    color: '#4BA586',
    fontSize: 16,
  },
});

export default VirtualFieldsScreen;