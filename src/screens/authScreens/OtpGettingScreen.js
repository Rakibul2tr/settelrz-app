import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import theme from '../../theme/theme'
import InputField from '../../components/common/InputField'
import Button from '../../components/common/Button'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useUserOtpVerifyMutation } from '../../redux/api/apiSlice'
import { UIActivityIndicator } from 'react-native-indicators'
import { getDataFromStorage } from '../../../Utilit/localStorageUtil'





const OtpGettingScreen = ({navigation}) => {
   const height = Dimensions.get('window').height
  const width = Dimensions.get('window').width
  const [userOtpVerify,{data,isLoading,isSuccess}]=useUserOtpVerifyMutation()
  const [otpGet,setOtpget]=useState('')
  const [userInfo,setUserInfo]=useState({})

 //local storage data getting
  useEffect(()=>{
   const fetchData = async () => {
      const data = await getDataFromStorage('user_info'); 
      setUserInfo(data);
    };
    fetchData();
   if(isSuccess){
     AsyncStorage.mergeItem('user_info',JSON.stringify({_token:data._token}));
     navigation.navigate('Category')
   }
  },[isSuccess])
  // otp sending hendell
  const sendOtpHendeler=()=>{
    userOtpVerify({
      email:userInfo.user_email,
      mail_otp:parseInt(otpGet),
    })
  }
 
 
  return (
    <SafeAreaView className='flex-1 bg-[#ffffff] dark:bg-black items-center'
      style={{width:width,height:height}}
    >
        <View
        className="items-center bg-black py-10"
        style={{width:width,height:height/5}}>
          <Image source={require('../../../assets/logo/logo-white.png')}
              className="w-2/5 h-12"
            />
        </View>
      
        <View className="bg-white -mt-5 rounded-t-3xl items-center flex-1 py-4"
          style={{width:width}} >
        <ScrollView scrollEnabled={true}
        contentContainerStyle={{paddingRight:10,marginTop:20}}>
          <Text className="dark:text-white text-2xl text-center py-4"
            style={{ fontFamily: theme.fonts.bold }}>Verify Your OTP</Text>
          <Text className="dark:text-white text-md text-center py-4"
            style={{ fontFamily: theme.fonts.montserratSB }}>{userInfo?.message?userInfo?.message:null}</Text>
          
          
            {/* sign up form start */}
            <View style={{ width: width - 30 ,marginBottom:10}}
              className={` items-center justify-start pt-2`}>
              

              {/* input item password*/}
              <View className="w-full bg-white flex-row items-center px-5 py-2 rounded-md mb-2 border border-gray-300">
                {/* <FontAwesome name="lock" size={24} color="#000000" /> */}
                <InputField placeholder={'Otp Number'}keyboardType={'number-pad'} onChangeText={(text)=>setOtpget(text)}/>
              </View>
              {
                 isLoading?<UIActivityIndicator color='#d90429' size={35} className="py-3"/>:
                 <View className="h-14 bg-[#d90429] flex-row items-center justify-center rounded-lg mt-6">
                  <Button title='Send'  customCss={`ml-3 w-10/12`} onPress={sendOtpHendeler} />
              </View>
              }
              

            </View>

            {/* bottom text */}
         {/* <View className="mt-1 h-8 ">
          <View className=" flex-row items-center justify-center">
            <Text className="text-black font-bold" style={{fontFamily:theme.fonts.medium}}>30 s After</Text>
            <TouchableOpacity className="ml-2"onPress={()=>navigation.navigate('Sign Up')}><Text className="text-[#d90429] text-lg"style={{fontFamily:theme.fonts.medium}}>Send Again</Text>
            </TouchableOpacity>
          </View>
        </View> */}
                  
        </ScrollView>
        </View>
      
        <StatusBar style='auto'/>
    </SafeAreaView>
  )
}

export default OtpGettingScreen

const styles = StyleSheet.create({
   
    
})

