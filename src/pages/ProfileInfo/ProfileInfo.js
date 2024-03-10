import {  Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar';
import theme from '../../theme/theme';
import { useColorScheme } from 'nativewind';
import { AntDesign } from '@expo/vector-icons';
import { useGetUserDataQuery } from '../../redux/api/apiSlice';
import { UIActivityIndicator } from 'react-native-indicators';
import { getDataFromStorage } from '../../../Utilit/localStorageUtil';


const ProfileInfo = ({navigation}) => {
  const { colorScheme } = useColorScheme()
  const width = Dimensions.get('window').width
  const [storedData, setStoredData] = useState({});
  const {data:postData}=useGetUserDataQuery(storedData)
   
  //  localStoraged data getting
  useEffect(()=>{
   const fetchData = async () => {
      const data = await getDataFromStorage('user_info'); 
      setStoredData(data);
    };
    fetchData();
  },[])
  return (
    <SafeAreaView className='flex-1 bg-[#ffffff] dark:bg-black items-center justify-center'
      style={{width:width,height:'100%'}}
    >
       {/* header logo  */}
        <View className="items-center mb-1 pt-1 dark:w-auto rounded-md bg-white dark:bg-black relative"
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
      <ScrollView nestedScrollEnabled={true}>
          {/* banner image and title */}
          <Text className="dark:text-white text-2xl text-center pb-2"style={{fontFamily:theme.fonts.bold}}>Access all your personal info</Text>
       
              {/* information section */}
        <View className=' items-center w-full border-0.5 border-slate-700  rounded-md py-3 bg-[#fdf9f9] dark:bg-slate-700 dark:border-slate-50'style={{ width:width-16,margin:6 }}> 
         {
        postData?Object.entries(postData).map(([key,value],index) => 
        <View key={key} className="flex-row items-center justify-start  rounded-md"style={[styles.informItem,{backgroundColor:index %2==0?'#000':'red'}]}>
            <Text className="w-2/5 text-white"style={styles.informText}>{key}</Text>
            <Text className="w-3/5 text-white "style={styles.informText}>{value?.name?value?.name:value}</Text>
         </View>):<UIActivityIndicator color='#d90429' size={35} className="py-3"/>
        }   
        </View>

        {/* button Express interest */}
        <View className="items-center py-4">
            <TouchableOpacity onPress={()=>navigation.navigate('Profile Update')}
            className="bg-[#d90429] justify-center rounded-lg dark:border-white dark:border h-12"
            style={{ width:width/1.5,}}>
                <Text className="text-center text-lg text-white dark:text-white "  style={{fontFamily:theme.fonts.bold}}>Edit Information</Text>
            </TouchableOpacity>
        </View>
       </ScrollView>
        <StatusBar style='auto'/>
    </SafeAreaView>
  )
}

export default ProfileInfo
  const width = Dimensions.get('window').width
const styles = StyleSheet.create({
     informItem: {
        width: width-40,
        margin: 2,
        marginVertical:3,
        padding:5,

    },
    informText: {
        fontSize: 17,
        fontFamily: theme.fonts.medium,
        padding:6,
        
    }
})

