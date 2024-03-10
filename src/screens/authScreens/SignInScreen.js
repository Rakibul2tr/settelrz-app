import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import theme from '../../theme/theme'
import InputField from '../../components/common/InputField'
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Button from '../../components/common/Button'
import { useLoginUserMutation } from '../../redux/api/apiSlice'
import { useDispatch } from 'react-redux'
import { UIActivityIndicator } from 'react-native-indicators'
import { setLogin } from '../../redux/fetures/userHendelSlice/userHendelSlice'
import { saveDataToStorage } from '../../../Utilit/localStorageUtil'
import { useToast } from 'react-native-toast-notifications'
import { TostMessageError, TostMessageSuccess } from '../../components/common/TostMessage'



const SignInScreen = ({navigation}) => {
   const height = Dimensions.get('window').height
  const width = Dimensions.get('window').width
  const [loginUser,{data:loginData,isLoading,isSuccess,isError}]=useLoginUserMutation()
  const [isSecureText,setisSecureText]=useState(true)
  const dispatch = useDispatch()
  const toast = useToast();


  const [state,setState]=useState({ 
    email:'',
    password:'',
  })
  // login button hendeler
  const loginHendeler=async()=>{
    loginUser({email:state.email,password:state.password})
  }
  
 // local storage data set and user (setLogin) true
  useEffect(()=>{
    if (isSuccess) {
    toast.show('Login Succesfull',TostMessageSuccess);
    saveDataToStorage('user_info',loginData)
    dispatch(setLogin())
    } else if (isError) {
     toast.show('Something is wrong.',TostMessageError);
  }
  },[isSuccess,isError])

  //password hide show handeler
  const passwordHideShow=()=>{
      setisSecureText(false)
      setTimeout(()=>setisSecureText(true),3000)
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
            style={{ fontFamily: theme.fonts.bold }}>Sign In Your Account</Text>
          
          
            {/* sign up form start */}
            <View style={{ width: width - 30 ,marginBottom:10}}
              className={` items-center justify-start pt-2`}>
              

              {/* input item email*/}
              <View className="w-full bg-white flex-row items-center px-3 py-2 rounded-md mb-2 border border-gray-300">
                <MaterialCommunityIcons name="email-outline" size={24} color="#000000" />
                <InputField 
                placeholder={'Email'}
                keyboardType={'email-address'}
                onChangeText={(text)=>setState({...state,email:text})}/>
              </View>

              {/* input item password*/}
              <View className="w-full bg-white flex-row items-center px-3 py-2 rounded-md mb-2 border border-gray-300 position-relative ">
                <FontAwesome name="lock" size={24} color="#000000" />
                <InputField 
                placeholder={'Password'}
                secureTextEntry={isSecureText}
                onChangeText={(text)=>setState({...state,password:text})}/>
                <TouchableOpacity className="position-absolute right-10 "onPress={passwordHideShow}>
                  <FontAwesome name="eye" size={24} color={isSecureText?'#000':'#ccc'} />
                </TouchableOpacity>
              </View>
              {
                isLoading? <UIActivityIndicator color='#d90429' size={35} className="py-3"/>:
                <View className="h-14 bg-[#d90429] flex-row items-center justify-center rounded-lg mt-6">
                  <Button title='Sign In'  customCss={`ml-3 w-10/12`} onPress={loginHendeler}/>
              </View>
              }
              

            </View>

            {/* bottom text */}
         <View className="mt-1 h-8 ">
          <View className=" flex-row items-center justify-center">
            <Text className="text-black" style={{fontFamily:theme.fonts.medium}}>Are You don't Account?</Text>
            <TouchableOpacity className="ml-2"onPress={()=>navigation.navigate('Sign Up')}><Text className="text-[#d90429] text-lg"style={{fontFamily:theme.fonts.medium}}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
                  
        </ScrollView>
        </View>
      
        <StatusBar style='auto'/>
    </SafeAreaView>
  )
}

export default SignInScreen

const styles = StyleSheet.create({
   
    
})

