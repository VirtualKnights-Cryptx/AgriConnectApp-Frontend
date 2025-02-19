import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationProp } from '@react-navigation/native';

interface ToolCardProps {
  title: string;
  icon: React.ReactNode;
  onPress: () => void;
}

const ToolCard: React.FC<ToolCardProps> = ({ title, icon, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <View style={styles.iconContainer}>
      {icon}
    </View>
    <Text style={styles.cardText}>{title}</Text>
  </TouchableOpacity>
);
interface ToolsProps {
  navigation: NavigationProp<any>;
}

const Tools: React.FC<ToolsProps> = ({ navigation }) => {
  const handleLanguageChange = () => {
    // Handle language change functionality
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Ionicons name="glasses-outline" size={24} color="#00A67E" />
        </View>
        <TouchableOpacity style={styles.languageButton} onPress={handleLanguageChange}>
          <Text style={styles.languageText}>English</Text>
          <Ionicons name="chevron-down" size={16} color="#00A67E" />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.title}>AI & Other Tools</Text>
        <Text style={styles.subtitle}>Smart Harvesting</Text>

        <View style={styles.gridContainer}>
          <View style={styles.row}>
            <ToolCard
              title="Crop Disease Analyzer"
              icon={<Ionicons name="scan-outline" size={28} color="#1A1A1A" />}
              onPress={() => navigation.navigate('DiseaseAnalyzer')}
            />
            <ToolCard
              title="AI ChatBot"
              icon={<Ionicons name="people-circle-outline" size={28} color="#1A1A1A" />}
              onPress={() => {}}
            />
          </View>
          <View style={styles.row}>
            <ToolCard
              title="Equipment Share"
              icon={<Ionicons name="cube-outline" size={28} color="#1A1A1A" />}
              onPress={() => {}}
            />
            <ToolCard
              title="Knowledge Share"
              icon={<Ionicons name="people-outline" size={28} color="#1A1A1A" />}
              onPress={() => {}}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2FBF6', // Light green background
  },
  header: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  logoContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#E6F7F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6F7F0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  languageText: {
    color: '#00A67E',
    marginRight: 4,
    fontSize: 14,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#00A67E',
    marginBottom: 32,
  },
  gridContainer: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    width: '48%',
    aspectRatio: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1A1A1A',
    textAlign: 'center',
  },
});

export default Tools;