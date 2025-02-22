import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  ScrollView 
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AddHarvestModal } from '../components/AddHarvestModal';
import { CropItem, AddHarvestFormData } from './types';

interface CropItemProps {
  price: number;
  location: string;
  farmer: string;
}

const CropItemComponent: React.FC<CropItemProps> = ({ price, location, farmer }) => (
  <View style={styles.cropCard}>
    <Image 
      source={require('../../../assets/images/farmer.png')} 
      style={styles.cropImage}
    />
    <View style={styles.cropInfo}>
      <Text style={styles.title}>Main Field</Text>
      <Text style={styles.farmerName}>{farmer}</Text>
      <Text style={styles.location}>{location}</Text>
      <Text style={styles.price}>Rs.{price}/1kg</Text>
    </View>
    <TouchableOpacity style={styles.buyButton}>
      <Text style={styles.buyButtonText}>Buy</Text>
    </TouchableOpacity>
  </View>
);

export default function MarketplaceScreen() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleAddHarvest = (data: AddHarvestFormData) => {
    console.log('New harvest data:', data);

  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image 
            source={require('../../../assets/images/buyer.png')}
            style={styles.logo}
          />
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
        <CropItemComponent 
          price={25}
          farmer="Nethmal Gunawardane"
          location="Aluthgama"
        />
        <CropItemComponent 
          price={25}
          farmer="Nethmal Gunawardane"
          location="Aluthgama"
        />
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
    backgroundColor: '#00875A',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 24,
    height: 24,
  },
  languageSelector: {
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
});