import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, RefreshControl, ScrollView, SafeAreaView, Alert, Image } from 'react-native';
import Fontisto from '@expo/vector-icons/Fontisto';
import { Ionicons } from '@expo/vector-icons';
import FieldSelector, { Field } from '../components/fieldSelection';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';

interface FieldMetric {
  title: string;
  value: string | number;
  unit: string;
  icon: string | React.ReactNode;
}

interface Profile {
  name: string;
  email: string;
}

interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  rainfall: number;
  isRaining: boolean;
  location: string;
  weatherCondition: string;
  weatherIcon: string;
  ipDetails?: {
    city: string;
    country: string;
    district: string;
  };
}

const API_BASE_URL = 'https://agri-connect-backend2.vercel.app/api';

const AnalyticsCard: React.FC<{ metric: FieldMetric }> = ({ metric }) => (
  <View style={styles.metricCard}>
    <View style={styles.iconContainer}>
      {typeof metric.icon === 'string' ? (
        <Fontisto name={metric.icon as any} size={24} color="#0F8B8D" />
      ) : (
        metric.icon
      )}
    </View>
    <Text style={styles.metricTitle}>{metric.title}</Text>
    <Text style={styles.metricValue}>
      {metric.value}
      <Text style={styles.metricUnit}>{metric.unit}</Text>
    </Text>
  </View>
);

const Dashboard = () => {
  const [selectedField, setSelectedField] = useState<Field | null>(null);
  const [fields, setFields] = useState<Field[]>([]);
  const [isFieldSelectorVisible, setFieldSelectorVisible] = useState(false);
  const [profile, setProfile] = useState<Profile>({ name: '', email: '' });
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<string>('Loading location...');
  
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      fetchFields();
      profiledata();
      fetchCurrentLocationWeather();
    }
  }, [isFocused]);

  useEffect(() => {
    if (selectedField) {
      // Check if selectedField has a location property, if not, use name
      const locationValue = selectedField.location || selectedField.name;
      if (locationValue) {
        fetchWeatherByLocation(locationValue);
      }
    } else {
      fetchCurrentLocationWeather();
    }
  }, [selectedField]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    Promise.all([
      fetchFields(), 
      profiledata(),
      selectedField 
        ? fetchWeatherByLocation(selectedField.location || selectedField.name)
        : fetchCurrentLocationWeather()
    ])
      .finally(() => setRefreshing(false));
  }, [selectedField]);

  const profiledata = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetch(`${API_BASE_URL}/auth/get`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.user) {
        setProfile({
          name: data.user.name || 'User',
          email: data.user.email || ''
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      setProfile({ name: 'User', email: '' });
    } finally {
      setLoading(false);
    }
  };

  const fetchFields = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/fields/`);
      const data = await response.json();
      setFields(data);
    } catch (error) {
      console.error('Error fetching fields:', error);
    }
  };

  const fetchCurrentLocationWeather = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/weather/current`);
      setWeatherData(response.data);
      
      const locationName = response.data.ipDetails 
        ? `${response.data.ipDetails.city}, ${response.data.ipDetails.country}`
        : response.data.location;
        
      setCurrentLocation(locationName);
    } catch (error) {
      console.error('Error fetching current location weather:', error);
      Alert.alert('Error', 'Failed to get current weather data');
    }
  };

  const fetchWeatherByLocation = async (location: string) => {
    try {
      // Log the location being sent to API for debugging
      console.log('Fetching weather for location:', location);
      
      const response = await axios.get(`${API_BASE_URL}/weather/location`, {
        params: { location }
      });
      
      console.log('Weather response:', response.data);
      setWeatherData(response.data);
      setCurrentLocation(response.data.location || location);
    } catch (error) {
      console.error('Error fetching weather by location:', error);
      Alert.alert('Error', 'Failed to get field weather data');
    }
  };

  const handleFieldSelection = (field: Field) => {
    console.log('Field selected:', field);
    setSelectedField(field);
    setFieldSelectorVisible(false);
  };

  if (loading) {
    return (
      <View style={styles.profileContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!profile.name) {
    return (
      <View style={styles.profileContainer}>
        <Text>No profile data available</Text>
      </View>
    );
  }

  const metrics: FieldMetric[] = [
    {
      title: 'Wind Speed',
      value: weatherData ? weatherData.windSpeed.toFixed(1) : '--',
      unit: 'kph',
      icon: 'wind'
    },
    {
      title: 'Humidity',
      value: weatherData ? weatherData.humidity : '--',
      unit: '%',
      icon: 'blood-drop'
    },
    {
      title: weatherData?.isRaining ? 'Rainfall' : 'Weather',
      value: weatherData?.isRaining ? (weatherData.rainfall.toFixed(1)) : weatherData?.weatherCondition || '--',
      unit: weatherData?.isRaining ? 'mm' : '',
      icon: weatherData?.isRaining ? 'rains' : (
        weatherData?.weatherIcon ? (
          <Image 
            source={{ uri: weatherData.weatherIcon }} 
            style={styles.weatherIcon} 
          />
        ) : 'day-cloudy'
      )
    },
    {
      title: 'Temperature',
      value: weatherData ? weatherData.temperature.toFixed(1) : '--',
      unit: '°C',
      icon: 'day-sunny'
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hi! {profile.name},</Text>
            <Text style={styles.title}>Your Field Analytics</Text>
          </View>
          <TouchableOpacity style={styles.languageButton}>
            <Text style={styles.languageText}>English</Text>
            <Ionicons name="chevron-down-outline" size={16} color="#3D3D3D" />
          </TouchableOpacity>
        </View>

        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={20} color="#0F8B8D" />
          <Text style={styles.locationText}>{currentLocation}</Text>
          {weatherData?.weatherCondition && (
            <View style={styles.weatherConditionContainer}>
              <Text style={styles.weatherConditionText}>{weatherData.weatherCondition}</Text>
            </View>
          )}
        </View>

        <View style={styles.fieldSelector}>
          <TouchableOpacity 
            style={styles.selectorButton}
            onPress={() => setFieldSelectorVisible(true)}
          >
            <Text style={styles.selectorText}>
              {selectedField ? selectedField.name : 'Select Your Field'}
            </Text>
            <Ionicons name="chevron-down-outline" size={30} color="#666" />
          </TouchableOpacity>
        </View>

        <FieldSelector
          selectedField={selectedField}
          onSelectField={handleFieldSelection}
          isVisible={isFieldSelectorVisible}
          onClose={() => setFieldSelectorVisible(false)}
          fields={fields}
        />

        <View style={styles.metricsGrid}>
          {metrics.map((metric, index) => (
            <AnalyticsCard key={index} metric={metric} />
          ))}
        </View>

        <TouchableOpacity style={styles.revenueButton}>
          <View style={styles.revenueContent}>
            <View>
              <Text style={styles.revenueTitle}>Revenue Analysis</Text>
              <Text style={styles.revenueSubtitle}>Generate Report</Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={24} color="#0F8B8D" />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  profileContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    marginTop: 75,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  greeting: {
    fontSize: 19,
    fontWeight: '600',
    color: '#3D3D3D',
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00A67E',
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF6',
    padding: 8,
    borderRadius: 10,
    gap: 4,
    marginTop: -100,
  },
  languageText: {
    color: '#3D3D3D',
    fontWeight: '500',
    fontSize: 16,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: '#ECFDF6',
    padding: 10,
    borderRadius: 8,
    flexWrap: 'wrap',
  },
  locationText: {
    marginLeft: 8,
    color: '#3D3D3D',
    fontSize: 16,
    flex: 1,
  },
  weatherConditionContainer: {
    backgroundColor: '#D0FBE7',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginLeft: 8,
  },
  weatherConditionText: {
    color: '#3D3D3D',
    fontSize: 14,
    fontWeight: '500',
  },
  fieldSelector: {
    marginBottom: 35,
  },
  selectorButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectorText: {
    color: '#666',
    fontSize: 20,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 24,
  },
  metricCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    width: '47%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    marginBottom: 12,
    height: 30,
    justifyContent: 'center',
  },
  weatherIcon: {
    width: 50,
    height: 50,
    marginTop: -8,
    marginLeft: -8,
  },
  metricTitle: {
    color: '#666',
    fontSize: 16,
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  metricUnit: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  revenueButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  revenueContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  revenueTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  revenueSubtitle: {
    fontSize: 18,
    color: '#666',
    marginTop: 2,
  },
});

export default Dashboard;