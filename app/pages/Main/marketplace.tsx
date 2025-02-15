import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const MarketPlace: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>marketplace</Text>
      <View style={styles.content}>
        <Text style={styles.testText}>marketplace</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#FFFFFF',
  },
  title: {
    marginTop: 16,
    fontSize: 32,
    fontWeight: '800',
    color: '#1A1A1A',
    letterSpacing: 0.7,
    marginBottom: 24,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  testText: {
    fontSize: 20,
    color: '#666',
    fontWeight: '500',
  }
});

export default MarketPlace;