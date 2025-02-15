import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  SafeAreaView,
  ScrollView,
  Platform
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Picker } from '@react-native-picker/picker';

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
  });

  const handleRegister = () => {
    // Handle registration logic here
    console.log(formData);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>63</Text>
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
              <Picker.Item label="Experience Level" value="" />
              {/* Add experience level options */}
            </Picker>
          </View>

          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={formData.insurancePreference}
              onValueChange={(value) => setFormData({...formData, insurancePreference: value})}
              style={styles.picker}
            >
              <Picker.Item label="Insurance & Loan Preferences" value="" />
              {/* Add insurance preferences options */}
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
    backgroundColor: '#00A67E',
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