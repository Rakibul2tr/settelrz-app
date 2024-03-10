
import React from 'react'
import LoginScreen from '../../screens/authScreens/LoginScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignupScreen from '../../screens/authScreens/SignupScreen';
import SignInScreen from '../../screens/authScreens/SignInScreen';
import OtpGettingScreen from '../../screens/authScreens/OtpGettingScreen';
import Categorys from '../../screens/authScreens/Categorys';

const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="Sign Up" component={SignupScreen} />
      <Stack.Screen name="OTP Screen" component={OtpGettingScreen} />
      {
        <Stack.Screen
        options={{animation:'slide_from_right'}}
        name="Category" component={Categorys} />
      }
      
    </Stack.Navigator>
  )
}

export default AuthNavigation

const screenOptions={ 
        headerShown:false,
        animation:'slide_from_right',
    }