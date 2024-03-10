import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import theme from '../../theme/theme'
import { AntDesign } from '@expo/vector-icons';
import InputField from '../../components/common/InputField'
import Button from '../../components/common/Button'
import { UIActivityIndicator } from 'react-native-indicators'
import { getDataFromStorage } from '../../../Utilit/localStorageUtil'
import { useColorScheme } from 'nativewind'
import { usePasswordChangeMutation } from '../../redux/api/apiSlice'





const PasswordChange = ({ navigation }) => {
    const { colorScheme } = useColorScheme()
    const height = Dimensions.get('window').height
    const width = Dimensions.get('window').width
    const [userInfo, setUserInfo] = useState({})
    const [passwordChange,{isSuccess,isLoading}]=usePasswordChangeMutation()

 //local storage data getting
  useEffect(()=>{
   const fetchData = async () => {
      const data = await getDataFromStorage('user_info'); 
      setUserInfo(data);
    };
      fetchData();
      if (isSuccess) {
          console.log('update password');
         navigation.goBack()
      }
  }, [isSuccess])
    // user data state 
  const [password,setPassword]=useState({ 
    current_password:'',
    new_password:'',
    new_password_confirmation:''
  })
  // password change hendele
    const ChangePasswordHendeler = () => {
        passwordChange({
        token: userInfo?._token,
        current_password: password.current_password,
        new_password: password.new_password,
        new_password_confirmation:password.new_password_confirmation
      })
    console.log('pasword',password);
  }
 
 
  return (
    <SafeAreaView className='flex-1 bg-[#ffffff] dark:bg-black items-center'
      style={{width:width,height:height}}
    >
        {/* header logo  */}
        <View className="items-center pt-1 dark:w-auto rounded-md bg-white dark:bg-black relative"
            style={{width:width-20}}
        >
            {
            colorScheme=='dark'?<Image source={require('../../../assets/logo/logo-white.png')}
            className="w-2/5 h-12"
            /> :
            <Image source={require('../../../assets/logo/logo-dark.png')}
            className="w-2/5 h-12"
            />
            }
            
            <View className="bg-white w-20 dark:bg-slate-950  absolute left-2 top-3">
                <TouchableOpacity  onPress={()=>navigation.goBack()}>
                <AntDesign name="arrowleft" size={24} color={colorScheme=='dark'?'#fff':'#000'} />
                </TouchableOpacity>
            </View>
        </View>
      
        <View className="bg-white dark:bg-black rounded-t-3xl items-center flex-1 py-4"
          style={{width:width}} >
        <ScrollView scrollEnabled={true}
        contentContainerStyle={{paddingRight:10,marginTop:20}}>
          <Text className="dark:text-white text-2xl text-center py-4"
            style={{ fontFamily: theme.fonts.bold }}>Change Your Password</Text>
          <Text className="dark:text-white text-md text-center py-4"
            style={{ fontFamily: theme.fonts.montserratSB }}>{userInfo?.message?userInfo?.message:null}</Text>
          
          
            {/* sign up form start */}
            <View style={{ width: width - 30 ,marginBottom:10}}
              className={` items-center justify-start pt-2`}>
              

              {/* input item old password*/}
              <View className="w-full bg-white flex-row items-center px-5 py-2 rounded-md mb-2 border border-gray-300">
                <InputField placeholder={'Old password'} onChangeText={(text)=>setPassword({...password,current_password:text})}/>
              </View>
              {/* input item new password*/}
              <View className="w-full bg-white flex-row items-center px-5 py-2 rounded-md mb-2 border border-gray-300">
                <InputField placeholder={'New password'} onChangeText={(text)=>setPassword({...password,new_password:text})}/>
              </View>
              {/* input item Renew password*/}
              <View className="w-full bg-white flex-row items-center px-5 py-2 rounded-md mb-2 border border-gray-300">
                <InputField placeholder={'Conform password'} onChangeText={(text)=>setPassword({...password,new_password_confirmation:text})}/>
              </View>
              {
                isLoading?<UIActivityIndicator color='#d90429' size={35} className="py-3"/>:
                 <View className="h-14 bg-[#d90429] flex-row items-center justify-center rounded-lg mt-6">
                  <Button title='Seve'  customCss={`ml-3 w-11/12`} onPress={ChangePasswordHendeler} />
              </View>
              }
            </View>      
        </ScrollView>
        </View>
      
        <StatusBar style='auto'/>
    </SafeAreaView>
  )
}

export default PasswordChange

const styles = StyleSheet.create({
   
    
})

