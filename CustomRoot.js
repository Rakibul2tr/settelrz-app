import { StatusBar } from "expo-status-bar";
import 'expo-dev-client';
import { NativeWindStyleSheet } from "nativewind";
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigation from './src/navigations/authNavigation/authNavigation';
import TabNavigator from "./src/navigations/mainNavigation/TabNavigator";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";

export const CustomRoot=() =>{
  const [userInfo,setUserInfo]=useState({})
const user = useSelector(state=>state.user)
console.log('user root screen',user?.isLoggedIn,userInfo);

//  localStoraged data getting
  useEffect(()=>{
    const localdata=async()=>{
    if(!AsyncStorage.getItem('user_info')){
      setUserInfo(false)
    }else{
      const jsonValue = await AsyncStorage.getItem('user_info');
      const parseValue=JSON.parse(jsonValue)
     setUserInfo(parseValue);
    }
   }
   localdata()
  },[])

  return (
    
      <NavigationContainer >
        {
          user?.isLoggedIn?<TabNavigator/>:<AuthNavigation />
        }
        <StatusBar style="auto" />
      </NavigationContainer>
    
  );
}
NativeWindStyleSheet.setOutput({
  default: "native",
});

