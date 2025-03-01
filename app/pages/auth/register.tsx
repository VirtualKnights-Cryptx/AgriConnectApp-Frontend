import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  SafeAreaView,
  ScrollView,
  Platform,
  Alert
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  navigation: NativeStackNavigationProp<any>;
}

interface FormData {
  fullName: string;
  nicNumber: string;
  contactNumber: string;
  address: string;
  district: string;
  province: string;
  postalCode: string;
  experienceLevel: string;
  insurancePreference: string;
  email: string;     // Add this
  password: string;
}

const FarmerRegisterScreen: React.FC<Props> = ({ navigation }) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    nicNumber: '',
    contactNumber: '',
    address: '',
    district: '',
    province: '',
    postalCode: '',
    experienceLevel: '',
    insurancePreference: '',
    email: '',     
    password: '',
  });

  const handleRegister = async () => {
    try {
      // Validate required fields
      if (!formData.email || !formData.password || !formData.fullName || !formData.contactNumber) {
        Alert.alert('Error', 'Please fill in all required fields');
        return;
      }
  
      // Transform the data to match backend expectations
      const transformedData = {
        name: formData.fullName,
        email: formData.email,       
        phone: formData.contactNumber,
        location: `${formData.address}, ${formData.district}, ${formData.province}, ${formData.postalCode}`,
        password: formData.password  ,  
        insurancePreference: formData.insurancePreference,
        experienceLevel: formData.experienceLevel,
      };
  
      const response = await fetch('https://agri-connect-backend2.vercel.app/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transformedData),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        Alert.alert('Registration Successful', 'You have been registered successfully.');
        navigation.navigate('Login');
      } else {
        const errorData = await response.json();
        console.error(errorData);
        Alert.alert('Registration Failed', errorData.message || 'An error occurred during registration.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Registration Failed', 'An error occurred during registration.');
    }
  };


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

      <ScrollView style={styles.content}>
        <Text style={styles.title}>Create Your Account</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Details *</Text>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={formData.fullName}
            onChangeText={(text) => setFormData({...formData, fullName: text})}
          />
          <TextInput
            style={styles.input}
            placeholder="NIC Number"
            value={formData.nicNumber}
            onChangeText={(text) => setFormData({...formData, nicNumber: text})}
          />
          <TextInput
            style={styles.input}
            placeholder="Contact Number"
            value={formData.contactNumber}
            onChangeText={(text) => setFormData({...formData, contactNumber: text})}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location Information *</Text>
          <TextInput
            style={styles.input}
            placeholder="Address"
            value={formData.address}
            onChangeText={(text) => setFormData({...formData, address: text})}
          />

<View style={styles.section}>
  <Text style={styles.sectionTitle}>Account Details *</Text>
  <TextInput
    style={styles.input}
    placeholder="Email"
    value={formData.email}
    onChangeText={(text) => setFormData({...formData, email: text})}
    keyboardType="email-address"
  />
  <TextInput
    style={styles.input}
    placeholder="Password"
    value={formData.password}
    onChangeText={(text) => setFormData({...formData, password: text})}
    secureTextEntry
  />
</View>
          
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={formData.district}
              onValueChange={(value) => setFormData({...formData, district: value})}
              style={styles.picker}
            >
              <Picker.Item label="District" value="" />
              {/* Add district options */}
            </Picker>
          </View>

          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={formData.province}
              onValueChange={(value) => setFormData({...formData, province: value})}
              style={styles.picker}
            >
              <Picker.Item label="Province" value="" />
              {/* Add province options */}
            </Picker>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Postal Code"
            value={formData.postalCode}
            onChangeText={(text) => setFormData({...formData, postalCode: text})}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Technical & Financial</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={formData.experienceLevel}
              onValueChange={(value) => setFormData({...formData, experienceLevel: value})}
              style={styles.picker}
            >
             
              <Picker.Item label="Beginner (0-2 years)" value="beginner" />
              <Picker.Item label="Intermediate (3-5 years)" value="intermediate" />
              <Picker.Item label="Advanced (6-10 years)" value="advanced" />
              <Picker.Item label="Expert (10+ years)" value="expert" />
            </Picker>
          </View>

          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={formData.insurancePreference}
              onValueChange={(value) => setFormData({...formData, insurancePreference: value})}
              style={styles.picker}
            >
              
              
                <Picker.Item label="Crop Insurance" value="crop" />
                <Picker.Item label="Equipment Insurance" value="equipment" />
                <Picker.Item label="Comprehensive Coverage" value="comprehensive" />
                <Picker.Item label="Weather Insurance" value="weather" />
                <Picker.Item label="Not Interested" value="none" />

            </Picker>
          </View>
        </View>

        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}>Log In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0FFF9',
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
    backgroundColor: 'rgb(253, 253, 253)',
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
  },
  languageText: {
    color: '#00A67E',
    fontSize: 14,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 15,
    marginBottom: 12,
    fontSize: 16,
  },
  pickerContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 12,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
  },
  registerButton: {
    backgroundColor: '#00A67E',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  loginText: {
    color: '#666666',
    fontSize: 18,
    marginBottom: 20,
  },
  loginLink: {
    color: '#00A67E',
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 20,
  },
});

export default FarmerRegisterScreen;