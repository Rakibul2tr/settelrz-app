import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import theme from '../../theme/theme'
import InputField from '../../components/common/InputField'
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Button from '../../components/common/Button'
import { useUserRegisterMutation } from '../../redux/api/apiSlice'
import { UIActivityIndicator } from 'react-native-indicators'
import { saveDataToStorage } from '../../../Utilit/localStorageUtil'



const SignupScreen = ({navigation}) => {
  const height = Dimensions.get('window').height
  const width = Dimensions.get('window').width
  const [userRegister,{data,isLoading,isSuccess,isError}]=useUserRegisterMutation()
  const [validText,setValidText]=useState(null)

 // user data state 
  const [userInfo,setUserInfo]=useState({ 
    email:'',
    password:'',
    fullName:'',
    password_confirmation:''
  })
  const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
 
  
  // Registation handeler
  const signUpHendaler=()=>{
    if(strongRegex.test(userInfo.password)){
    setValidText('Strong Pasword');
    userRegister({
    name:userInfo.fullName,
    email:userInfo.email,
    password:userInfo.password,
    password_confirmation:userInfo.password_confirmation
    })
  }else{
    setValidText('! Password must be at least 8 characters uppercase lowercase,number,symbols')
  }
  
  }
 useEffect(()=>{
   if(isSuccess){
     // user information seve in loacal storage
     saveDataToStorage('user_info',data)
    navigation.navigate('OTP Screen')
  }else if(isError){
     console.log('data error',data?.message);
  }
 },[isSuccess])

 
 
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
        contentContainerStyle={{paddingRight:10}}>
          <Text className="dark:text-white text-2xl text-center py-4"
            style={{ fontFamily: theme.fonts.bold }}>Create Your Account</Text>
          
          
            {/* sign up form start */}
            <View style={{ width: width - 30 ,marginBottom:10}}
              className={` items-center justify-start pt-2`}>
              
              {/* input item name */}
              <View className="w-full bg-white flex-row items-center px-5 py-2 rounded-md mb-2 border border-gray-300">
                <FontAwesome name="user" size={24} color="#000000" />
                <InputField placeholder={'Full Name'} onChangeText={(text)=>setUserInfo({...userInfo,fullName:text})}/>
              </View>

              {/* input item email*/}
              <View className="w-full bg-white flex-row items-center px-5 py-2 rounded-md mb-2 border border-gray-300">
                <MaterialCommunityIcons name="email-outline" size={24} color="#000000" />
                <InputField placeholder={'Email'}keyboardType={'email-address'}onChangeText={(text)=>setUserInfo({...userInfo,email:text})}/>
              </View>

            
              
              {/* input item password*/}
              <View className="w-full bg-white flex-row items-center px-5 py-2 rounded-md mb-2 border border-gray-300">
                <FontAwesome name="lock" size={24} color="#000000" />
                <InputField placeholder={'Password'}onChangeText={(text)=>setUserInfo({...userInfo,password:text})}/>
              </View>
              {
                validText?<Text className="dark:text-white text-red-500 text-xs text-start py-1 w-full"
            style={{  }}>{validText}</Text>:null
              }
              {/* input item conform password*/}
              <View className="w-full bg-white flex-row items-center px-5 py-2 rounded-md mb-2 border border-gray-300">
                <FontAwesome name="lock" size={24} color="#000000" />
                <InputField placeholder={'Conform Password'}onChangeText={(text)=>setUserInfo({...userInfo,password_confirmation:text})}/>
              </View>
          
              
              {
               isLoading?
               <UIActivityIndicator color='#d90429' size={35} className="py-3"/>:
               <View className="h-14 bg-[#d90429] flex-row items-center justify-center rounded-lg mt-6">
                  <Button title='Sign Up'  customCss={`ml-3 w-10/12`} onPress={signUpHendaler}/>
              </View>
              }
              

          </View>
             {/* bottom text */}
          <View className="mt-1 h-8 ">
            <View className=" flex-row items-center justify-center">
              <Text className="text-black" style={{fontFamily:theme.fonts.medium}}>Are You dont Account?</Text>
              <TouchableOpacity className="ml-2"onPress={()=>navigation.navigate('Login')}><Text className="text-[#d90429] text-lg"style={{fontFamily:theme.fonts.medium}}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
          
        </ScrollView>
        </View>
      
        <StatusBar style='auto'/>
    </SafeAreaView>
  )
}

export default SignupScreen

const styles = StyleSheet.create({
   
    genderCharcle:{
        width:20,
        height:20,
        borderRadius:20,
        borderWidth:1,
        borderColor:'#000'
    },
})

//  const data = [
//       {key:'1', value:'Mobiles'},
//       {key:'2', value:'Appliances'},
//       {key:'3', value:'Cameras'},
//       {key:'4', value:'Computers'},
//       {key:'5', value:'Vegetables'},
//       {key:'6', value:'Diary Products'},
//       {key:'7', value:'Drinks'},
//   ]