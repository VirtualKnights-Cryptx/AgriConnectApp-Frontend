import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  ScrollView,
  Alert 
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AddHarvestModal } from '../components/AddHarvestModal';
import axios from 'axios';
import { AddHarvestFormData } from './types';
import Ionicons from '@expo/vector-icons/Ionicons';
interface Harvest {
  id: string;
  fieldName: string;
  quantity: number;
  price: number;
  description: string;
  location: string;
  farmerName: string;
}

interface CropItemProps extends Harvest {
  onBuy: () => void;
}

const CropItemComponent: React.FC<CropItemProps> = ({ 
  fieldName, 
  price, 
  location, 
  farmerName,
  onBuy 
}) => (
  <View style={styles.cropCard}>
    <Image 
      source={require('../../../assets/images/farmer.png')} 
      style={styles.cropImage}
    />
    <View style={styles.cropInfo}>
      <Text style={styles.title}>{fieldName}</Text>
      <Text style={styles.farmerName}>{farmerName}</Text>
      <Text style={styles.location}>{location}</Text>
      <Text style={styles.price}>Rs.{price}/1kg</Text>
    </View>
    <TouchableOpacity style={styles.buyButton} onPress={onBuy}>
      <Text style={styles.buyButtonText}>Buy</Text>
    </TouchableOpacity>
  </View>
);

const API_BASE_URL = 'http://192.168.8.100:3000/api/products';

export default function MarketplaceScreen() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [harvests, setHarvests] = useState<Harvest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchHarvests();
  }, []);

  const fetchHarvests = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/`);
      setHarvests(response.data);
    } catch (error) {
      console.error('Error fetching harvests:', error);
      Alert.alert('Error', 'Failed to load harvests');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddHarvest = async (data: AddHarvestFormData) => {
    try {
      await axios.post(`${API_BASE_URL}/create`, data);
      Alert.alert('Success', 'Harvest listed successfully');
      fetchHarvests(); // Refresh the list
      setIsModalVisible(false);
    } catch (error) {
      console.error('Error adding harvest:', error);
      Alert.alert('Error', 'Failed to list harvest');
    }
  };

  const handleBuyHarvest = async (harvestId: string) => {
    try {
      await axios.post(`${API_BASE_URL}/harvests/${harvestId}/buy`, {
        quantity: 1 // You might want to add quantity selection
      });
      Alert.alert('Success', 'Purchase successful');
      fetchHarvests(); // Refresh the list
    } catch (error) {
      console.error('Error buying harvest:', error);
      Alert.alert('Error', 'Failed to complete purchase');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Ionicons name="glasses-outline" size={24} color="#00A67E" />
        
        </View>
        <View style={styles.languageSelector}>
          <Text>English</Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Buy Crop</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Get Services</Text>
        </TouchableOpacity>
      </View>

      {/* Crop Listings */}
      <ScrollView style={styles.cropList}>
        {isLoading ? (
          <Text style={styles.loadingText}>Loading harvests...</Text>
        ) : (
          harvests.map((harvest) => (
            <CropItemComponent 
              key={harvest.id}
              {...harvest}
              onBuy={() => handleBuyHarvest(harvest.id)}
            />
          ))
        )}
      </ScrollView>

      {/* Sell Button */}
      <TouchableOpacity 
        style={styles.sellButton}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={styles.sellButtonText}>Sell Your Harvest +</Text>
      </TouchableOpacity>

      {/* Add Harvest Modal */}
      <AddHarvestModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSubmit={handleAddHarvest}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  logoContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 24,
    height: 24,
  },
  languageSelector: {
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#00875A',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#00875A',
    fontWeight: '600',
  },
  cropList: {
    flex: 1,
    padding: 16,
  },
  cropCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cropImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  cropInfo: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  farmerName: {
    color: '#666',
    marginTop: 2,
  },
  location: {
    color: '#666',
  },
  price: {
    color: '#00875A',
    fontWeight: '600',
    marginTop: 4,
  },
  buyButton: {
    backgroundColor: '#00875A',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 6,
  },
  buyButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  sellButton: {
    backgroundColor: '#00875A',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  sellButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  loadingText: {
    textAlign: 'center',
    padding: 20,
    color: '#666',
  },
});