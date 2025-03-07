import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  ImageBackground,
  Platform,
  Dimensions
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
const { width } = Dimensions.get('window');

interface Props {
  navigation: NativeStackNavigationProp<any>;
}

const BeforeRegisterScreen: React.FC<Props> = ({ navigation }) => {
  const categories = [
    {
      id: 1,
      title: 'Farmer',
      image: require('../../../assets/images/farmer.png'),
      route: 'FarmerRegister'
    },
    {
      id: 2,
      title: 'Buyer',
      image: require('../../../assets/images/buyer.png'),
      route: 'BuyerRegister'
    },
    {
      id: 3,
      title: 'Service Provider',
      image: require('../../../assets/images/service-provider.png'),
      route: 'ServiceProviderRegister'
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
        <Ionicons name="glasses-outline" size={24} color="#FFFFFF" />
        </View>
        <TouchableOpacity style={styles.languageButton}>
          <Text style={styles.languageText}>English</Text>
          <Ionicons name="chevron-down-outline" size={16} color="#3D3D3D" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.subtitle}>Let's get started</Text>
        <Text style={styles.title}>Select Your Category</Text>

        <View style={styles.categoriesContainer}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={styles.categoryCard}
              onPress={() => navigation.navigate(category.route)}
            >
              <ImageBackground
                source={category.image}
                style={styles.categoryImage}
                imageStyle={styles.categoryImageStyle}
              >
                <Text style={styles.categoryTitle}>{category.title}</Text>
              </ImageBackground>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    marginTop:30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 20 : 0,
  },
  logoContainer: {
    backgroundColor: '#029972',
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF6',
    padding: 8,
    borderRadius: 10,
    gap: 4,
    marginTop: 0,
  },
  languageText: {
    color: '#3D3D3D',
    fontWeight: '500',
    fontSize: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  subtitle: {
    fontSize: 24,
    color: '#3D3D3D',
    fontWeight: 600,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#017B5E',
    marginBottom: 24,
  },
  categoriesContainer: {
    flex: 1,
    gap:-30,
  },
  categoryCard: {
    height: 180,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 10,
  },
  categoryImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    padding: 10,
  },
  categoryImageStyle: {
    borderRadius: 12,
  },
  categoryTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 40,
  },
  loginText: {
    color: '#1E1E1E',
    fontSize: 18,
  },
  loginLink: {
    color: '#00A67E',
    fontSize: 18,
    fontWeight: '500',
  },
});

export default BeforeRegisterScreen;