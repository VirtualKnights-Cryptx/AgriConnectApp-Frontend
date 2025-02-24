import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  SafeAreaView, 
  StyleSheet, 
  ScrollView, 
  ActivityIndicator,
  RefreshControl
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';

interface Field {
  _id: string;
  name: string;
  location: string;
  shape: string;
  size: string;
  soilType: string;
  crops: string[];
}

interface VirtualFieldsScreenProps {
  navigation: any;
}

const VirtualFieldsScreen: React.FC<VirtualFieldsScreenProps> = ({ navigation }) => {
  const [fields, setFields] = useState<Field[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();

  const fetchFields = async () => {
    try {
      const response = await fetch('http://192.168.8.101:3000/api/fields/');
      const data = await response.json();
      setFields(data);
    } catch (error) {
      console.error('Error fetching fields:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchFields();
    }
  }, [isFocused]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchFields().finally(() => setRefreshing(false));
  }, []);

  const renderFieldCard = (field: Field) => (
    <TouchableOpacity 
      key={field._id} 
      style={styles.fieldCard}
      onPress={() => navigation.navigate('FieldDetails', { field })}
    >
      <View style={styles.fieldHeader}>
        <Text style={styles.fieldName}>{field.name}</Text>
        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={16} color="#666" />
          <Text style={styles.locationText}>{field.location}</Text>
        </View>
      </View>

      <View style={styles.fieldDetails}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Size:</Text>
          <Text style={styles.detailValue}>{field.size}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Soil Type:</Text>
          <Text style={styles.detailValue}>{field.soilType}</Text>
        </View>
      </View>

      <View style={styles.cropsContainer}>
        <Text style={styles.cropsLabel}>Crops:</Text>
        <View style={styles.cropTags}>
          {field.crops.map((crop, index) => (
            <View key={index} style={styles.cropTag}>
              <Text style={styles.cropText}>{crop}</Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Fixed Header Section */}
      <View style={styles.fixedHeader}>
        {/* Header */}
        <View style={styles.header}>
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
          onPress={() => navigation.navigate('AddFieldDetails')}
        >
          <View style={styles.addFieldContent}>
            <Text style={styles.plusIcon}>+</Text>
            <Text style={styles.addFieldText}>Click here to add your field</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Scrollable Content */}
      <ScrollView
        style={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#2D6A4F" />
          </View>
        ) : fields.length === 0 ? (
          <View style={styles.noFieldsContainer}>
            <Text style={styles.noFieldsText}>No fields added yet</Text>
          </View>
        ) : (
          <View style={styles.fieldsContainer}>
            {fields.map(renderFieldCard)}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5F1',
  },
  fixedHeader: {
    backgroundColor: '#E8F5F1',
    zIndex: 1,
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
    paddingBottom: 8,
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
    padding: 12,
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
    padding: 12,
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
  scrollContent: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noFieldsContainer: {
    padding: 20,
    alignItems: 'center',
  },
  noFieldsText: {
    fontSize: 16,
    color: '#666',
  },
  fieldsContainer: {
    padding: 16,
  },
  fieldCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  fieldHeader: {
    marginBottom: 12,
  },
  fieldName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D6A4F',
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  fieldDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailItem: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
  },
  cropsContainer: {
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
    paddingTop: 12,
  },
  cropsLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  cropTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cropTag: {
    backgroundColor: '#E8F5F1',
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  cropText: {
    color: '#2D6A4F',
    fontSize: 14,
  },
});

export default VirtualFieldsScreen;