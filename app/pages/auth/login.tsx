import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  TextInput,
  SafeAreaView,
  Platform
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
interface Props {
  navigation: NativeStackNavigationProp<any>;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const image = require('../../../assets/images/GIcon.svg');


  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('https://agri-connect-backend2.vercel.app/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const result = await response.json();

      if (response.ok) { // Check HTTP status first
        // Store token
        await AsyncStorage.setItem('userToken', result.token);
        // Store user info
        await AsyncStorage.setItem('userInfo', JSON.stringify(result.user));
        
        navigation.navigate('MenuBar');
      } else {
        // Handle specific error messages from backend
        Alert.alert('Error', result.error || 'Login failed');
      }
    } catch (error) {
      Alert.alert(
        'Error',
        'Failed to connect to the server. Please check your internet connection.'
      );
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };
  const handleGoogleLogin = async () => {
    try {
      
      // Handle Google login logic
     
      // Handle error
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
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
        <Text style={styles.title}>Login To Your Account</Text>

        <TextInput
          style={styles.input}
          placeholder="Email or Username"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoCorrect={false}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />

        <TouchableOpacity 
          style={styles.forgotPassword}
          onPress={() => navigation.navigate('Password')}
        >
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity 
         style={[styles.loginButton, loading && styles.disabledButton]}
            onPress={handleLogin}
             disabled={loading}
           >
         <Text style={styles.loginButtonText}>
           {loading ? 'Logging in...' : 'Login'}
        </Text>
       </TouchableOpacity>

        <Text style={styles.orText}>Or Continue With</Text>

        <TouchableOpacity 
          style={styles.googleButton}
          onPress={handleGoogleLogin}
          disabled={loading}
        >
          <Ionicons name="logo-google" size={24} color="#333333" />
          <Text style={styles.googleButtonText}>Google</Text>
        </TouchableOpacity>

        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('BeforeRegister')}>
            <Text style={styles.registerLink}>Register Now</Text>
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
    paddingTop: 200,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3D3D3D',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#00A67E',
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#00A67E',
    borderRadius: 8,
    padding: 18,
    alignItems: 'center',
    marginBottom: 20,
    width: '50%',
    marginLeft: '25%',
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    width: '50%',
    marginLeft: '25%',
  },
  orText: {
    color: '#666666',
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 14,
  },
  googleButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DDDDDD',
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    width: '50%',
    marginLeft: '25%',
  },
  googleButtonText: {
    color: '#333333',
    fontSize: 16,
    fontWeight: '500',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    color: '#1E1E1E',
    fontSize: 18,
  },
  registerLink: {
    color: '#00A67E',
    fontSize: 18,
    fontWeight: '500',
  },
  disabledButton: {
    opacity: 0.7,
    backgroundColor: '#cccccc',
  },
});

export default LoginScreen;