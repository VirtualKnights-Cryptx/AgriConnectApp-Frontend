import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import App from './pages/splash';
import { NavigationContainer } from '@react-navigation/native';
import FarmerRegisterScreen from './pages/auth/register';
import LoginScreen from './pages/auth/login';
import Email from './pages/otp/Enteremail';
import Otp from  './pages/otp/OTP';
import Password from './pages/otp/Password';
import MenuBar from './pages/Main/menubar';
import BeforeRegisterScreen from './pages/auth/BeforeRegisterScreen';
import AddFieldDetailsScreen from './pages/Main/addfieldscreen';
import FieldDetailsScreen from './pages/Main/fielddetailsscreen';
import DiseaseAnalyzer from './pages/Main/DiseaseAnalyzer';
import PaymentSuccessScreen from './pages/payments/paymentsuccess';
import PaymentFailedScreen from './pages/payments/paymentfail';
import StripePaymentWrapper from './pages/payments/payment';

const Stack = createStackNavigator();
const NewStack = () => {
    return (
        
        <Stack.Navigator id={undefined} screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Splash" component={App} />
            <Stack.Screen name="FarmerRegister" component={FarmerRegisterScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Email" component={Email} />
            <Stack.Screen name="Otp" component={Otp} />
            <Stack.Screen name="Password" component={Password} />
            <Stack.Screen name="MenuBar" component={MenuBar} />
            <Stack.Screen name="BeforeRegister" component={BeforeRegisterScreen} />
            <Stack.Screen name="DiseaseAnalyzer" component={DiseaseAnalyzer} />
            <Stack.Screen name="AddFieldDetails" component={AddFieldDetailsScreen} />
            <Stack.Screen name="FieldDetails" component={FieldDetailsScreen} />
            <Stack.Screen name="PaymentSuccess" component={PaymentSuccessScreen} />
            <Stack.Screen name="PaymentFailed" component={PaymentFailedScreen} />
            <Stack.Screen name="PaymentScreen" component={StripePaymentWrapper} />
        </Stack.Navigator>
      
    );  
}
export default NewStack;