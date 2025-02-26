import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  RefreshControl,
  SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

interface Field {
  id: string;
  name: string;
  location: string;
  shape: string;
  size: string;
  soilType: string;
  crops: string[];
}

interface CropSuggestion {
  cropName: string;
  reason: string;
  bestPlantingMonth: string;
  estimatedYield: string;
  careInstructions: string;
}

interface FieldDetailsScreenProps {
  route: { params: { field: Field } };
  navigation: any;
}

const FieldDetailsScreen: React.FC<FieldDetailsScreenProps> = ({ route, navigation }) => {
  const { field } = route.params;
  const [suggestions, setSuggestions] = useState<CropSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchSuggestions = async () => {
    // Validate field ID before making the request
    if (!field?.id) {
      console.error('Field ID is undefined:', field);
      Alert.alert('Error', 'Invalid field data');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      
      // Log the request URL for debugging
      const savedSuggestionsUrl = `http://192.168.8.100:3000/api/suggestions/${field.id}/saved`;
      console.log('Fetching saved suggestions from:', savedSuggestionsUrl);

      // First try to get saved suggestions
      let response = await fetch(savedSuggestionsUrl);
      let responseText = await response.text();
      
      try {
        let data = JSON.parse(responseText);
        
        if (response.status === 404) {
          // If no saved suggestions, generate new ones
          const newSuggestionsUrl = `http://192.168.8.100:3000/api/suggestions/${field.id}`;
          console.log('Fetching new suggestions from:', newSuggestionsUrl);
          
          response = await fetch(newSuggestionsUrl);
          responseText = await response.text();
          data = JSON.parse(responseText);
        }

        if (data.success && Array.isArray(data.suggestions)) {
          setSuggestions(data.suggestions);
        } else {
          console.error('Invalid data format:', data);
          Alert.alert('Error', 'Invalid data format received from server');
        }
      } catch (parseError) {
        console.error('Response parsing error:', parseError);
        console.error('Raw response:', responseText);
        Alert.alert('Error', 'Failed to parse server response');
      }
    } catch (error) {
      console.error('Network error:', error);
      Alert.alert('Error', 'Failed to connect to the server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuggestions();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchSuggestions().finally(() => setRefreshing(false));
  }, []);

  const renderFieldSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Field Information</Text>
      <View style={styles.fieldCard}>
        <View style={styles.fieldHeader}>
          <Text style={styles.fieldName}>{field.name}</Text>
          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={16} color="#666" />
            <Text style={styles.locationText}>{field.location}</Text>
          </View>
        </View>

        <View style={styles.detailsGrid}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Size</Text>
            <Text style={styles.detailValue}>{field.size}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Shape</Text>
            <Text style={styles.detailValue}>{field.shape}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Soil Type</Text>
            <Text style={styles.detailValue}>{field.soilType}</Text>
          </View>
        </View>

        <View style={styles.cropsSection}>
          <Text style={styles.cropsLabel}>Current Crops</Text>
          <View style={styles.cropTags}>
            {field.crops.map((crop, index) => (
              <View key={index} style={styles.cropTag}>
                <Text style={styles.cropText}>{crop}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );

  const renderSuggestionsSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Crop Suggestions</Text>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2D6A4F" />
          <Text style={styles.loadingText}>Generating suggestions...</Text>
        </View>
      ) : (
        suggestions.map((suggestion, index) => (
          <View key={index} style={styles.suggestionCard}>
            <Text style={styles.cropName}>{suggestion.cropName}</Text>
            
            <View style={styles.suggestionDetail}>
              <Text style={styles.suggestionLabel}>Why Suitable:</Text>
              <Text style={styles.suggestionText}>{suggestion.reason}</Text>
            </View>

            <View style={styles.suggestionDetail}>
              <Text style={styles.suggestionLabel}>Best Planting Month:</Text>
              <Text style={styles.suggestionText}>{suggestion.bestPlantingMonth}</Text>
            </View>

            <View style={styles.suggestionDetail}>
              <Text style={styles.suggestionLabel}>Estimated Yield:</Text>
              <Text style={styles.suggestionText}>{suggestion.estimatedYield}</Text>
            </View>

            <View style={styles.suggestionDetail}>
              <Text style={styles.suggestionLabel}>Care Instructions:</Text>
              <Text style={styles.suggestionText}>{suggestion.careInstructions}</Text>
            </View>
          </View>
        ))
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#2D6A4F" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Field Details</Text>
        <TouchableOpacity 
          style={styles.editButton}
          onPress={() => navigation.navigate('EditField', { field })}
        >
          <Ionicons name="create-outline" size={24} color="#2D6A4F" />
        </TouchableOpacity>
      </View>

      {/* Scrollable Content */}
      <ScrollView
        style={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {renderFieldSection()}
        {renderSuggestionsSection()}
      </ScrollView>
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
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D6A4F',
  },
  editButton: {
    padding: 8,
  },
  scrollContent: {
    flex: 1,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2D6A4F',
    marginBottom: 16,
  },
  fieldCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
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
    marginBottom: 16,
  },
  fieldName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2D6A4F',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 16,
    color: '#666',
    marginLeft: 4,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  detailItem: {
    width: '50%',
    marginBottom: 16,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
  },
  cropsSection: {
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
    paddingTop: 16,
  },
  cropsLabel: {
    fontSize: 16,
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
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  cropText: {
    color: '#2D6A4F',
    fontSize: 14,
  },
  loadingContainer: {
    padding: 32,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 8,
    color: '#666',
    fontSize: 16,
  },
  suggestionCard: {
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
  cropName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D6A4F',
    marginBottom: 12,
  },
  suggestionDetail: {
    marginBottom: 12,
  },
  suggestionLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  suggestionText: {
    fontSize: 16,
    color: '#333',
  },
});

export default FieldDetailsScreen;