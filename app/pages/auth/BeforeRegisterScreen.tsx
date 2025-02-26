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
        <Ionicons name="glasses-outline" size={24} color="#00A67E" />
        </View>
        <TouchableOpacity style={styles.languageButton}>
          <Text style={styles.languageText}>English</Text>
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
    backgroundColor: '#F0FFF9',
  },
  header: {
    marginTop:20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 20 : 0,
  },
  logoContainer: {
    backgroundColor: '#FFFFFF',
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
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageText: {
    color: '#00A67E',
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  subtitle: {
    fontSize: 18,
    color: '#333333',
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00A67E',
    marginBottom: 24,
  },
  categoriesContainer: {
    flex: 1,
    gap: 10,
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
    marginBottom: 20,
  },
  loginText: {
    color: '#666666',
    fontSize: 22,
  },
  loginLink: {
    color: '#00A67E',
    fontSize: 20,
    fontWeight: '500',
  },
});

export default BeforeRegisterScreen;