import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface FieldMetric {
  title: string;
  value: string | number;
  unit: string;
  icon: string;
}

const AnalyticsCard: React.FC<{ metric: FieldMetric }> = ({ metric }) => (
  <View style={styles.metricCard}>
    <View style={styles.iconContainer}>
      <Ionicons name={metric.icon as any} size={24} color="#0F8B8D" />
    </View>
    <Text style={styles.metricTitle}>{metric.title}</Text>
    <Text style={styles.metricValue}>
      {metric.value}
      <Text style={styles.metricUnit}>{metric.unit}</Text>
    </Text>
  </View>
);

const Dashboard = () => {
  const [selectedField, setSelectedField] = useState<string>('');

  const metrics: FieldMetric[] = [
    {
      title: 'Wind Speed',
      value: '--',
      unit: 'kph',
      icon: 'wind-outline'
    },
    {
      title: 'Humidity',
      value: '--',
      unit: '%',
      icon: 'water-outline'
    },
    {
      title: 'Rainfall',
      value: '--',
      unit: 'mm',
      icon: 'rainy-outline'
    },
    {
      title: 'Temperature',
      value: '--',
      unit: '°C',
      icon: 'sunny-outline'
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hi! Nethmal,</Text>
          <Text style={styles.title}>Your Field Analytics</Text>
        </View>
        <TouchableOpacity style={styles.languageButton}>
          <Text style={styles.languageText}>English</Text>
          <Ionicons name="chevron-down-outline" size={16} color="#0F8B8D" />
        </TouchableOpacity>
      </View>

      <View style={styles.fieldSelector}>
        <TouchableOpacity style={styles.selectorButton}>
          <Text style={styles.selectorText}>Select Your Field</Text>
          <Ionicons name="chevron-down-outline" size={20} color="#666" />
        </TouchableOpacity>
      </View>

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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FAFA',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  greeting: {
    fontSize: 16,
    color: '#666',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0F8B8D',
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6F7F7',
    padding: 8,
    borderRadius: 20,
    gap: 4,
  },
  languageText: {
    color: '#0F8B8D',
    fontWeight: '500',
  },
  fieldSelector: {
    marginBottom: 24,
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
    fontSize: 16,
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
  },
  metricTitle: {
    color: '#666',
    fontSize: 14,
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
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  revenueSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
});

export default Dashboard;