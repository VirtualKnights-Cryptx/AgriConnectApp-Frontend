import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import Dashboard from './dashboard';
import { Ionicons } from '@expo/vector-icons';

// Type definitions
type RootStackParamList = {
  Dashboard: undefined;
  MyField: undefined;
  Tools: undefined;
  Marketplace: undefined;
  Account: undefined;
};

const Tab = createBottomTabNavigator<RootStackParamList>();

// Placeholder screens
interface PlaceholderScreenProps {
  screenName: string;
}

const PlaceholderScreen: React.FC<PlaceholderScreenProps> = ({ screenName }) => (
  <View style={styles.placeholderContainer}>
    <Text style={styles.placeholderText}>{screenName}</Text>
    <Text style={styles.developmentText}>Under Development</Text>
  </View>
);

const MyFieldScreen: React.FC = () => <PlaceholderScreen screenName="My Field" />;
const ToolsScreen: React.FC = () => <PlaceholderScreen screenName="Tools" />;
const MarketplaceScreen: React.FC = () => <PlaceholderScreen screenName="Marketplace" />;
const AccountScreen: React.FC = () => <PlaceholderScreen screenName="Account" />;

const MenuBar: React.FC = () => {
  const navigation = useNavigation();
  
  return (
    <Tab.Navigator
      id={undefined}
      screenOptions={{
        tabBarStyle: styles.tabBarStyle,
        tabBarActiveTintColor: '#00A67E', // Green color from the image
        tabBarInactiveTintColor: '#666',
        headerShown: false,
        tabBarShowLabel: true,
        tabBarLabelStyle: styles.tabBarLabel
      }}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={Dashboard} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="trending-up" size={24} color={color} />
          ),
        }}
      />
      
      <Tab.Screen 
        name="MyField" 
        component={MyFieldScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="location-outline" size={24} color={color} />
          ),
          tabBarLabel: 'My Field'
        }}
      />

      <Tab.Screen 
        name="Tools" 
        component={ToolsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={24} color={color} />
          ),
        }}
      />
      
      <Tab.Screen 
        name="Marketplace" 
        component={MarketplaceScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart-outline" size={24} color={color} />
          ),
        }}
      />
      
      <Tab.Screen 
        name="Account" 
        component={AccountScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 80,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 8,
    paddingBottom: 8,
  },
  tabBarLabel: {
    fontSize: 12,
    marginTop: 2,
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  placeholderText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  developmentText: {
    fontSize: 16,
    color: '#666',
  },
});

export default MenuBar;