import {  Dimensions, FlatList, Image,  StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar';
import theme from '../../theme/theme';
import { useColorScheme } from 'nativewind';
import { useGetSecondScreenPostQuery } from '../../redux/api/apiSlice';
import { UIActivityIndicator } from 'react-native-indicators';
import { getDataFromStorage } from '../../../Utilit/localStorageUtil';



const WorkSearch = ({navigation}) => {
  const { colorScheme } = useColorScheme()
  const height = Dimensions.get('window').height
  const width = Dimensions.get('window').width
  const [userInfo,setUserInfo]=useState({})
  const {data:SecondScreenpost,isLoading}=useGetSecondScreenPostQuery(userInfo)
//  localStoraged data getting
  useEffect(()=>{
     const fetchData = async () => {
      const data = await getDataFromStorage('user_info'); 
      setUserInfo(data);
    };
    fetchData();
   
  },[])

// flatList render item
  const Item = ({ item,index }) => (
    <TouchableOpacity onPress={()=>navigation.navigate('SitePage',{link:item?.gov_post_link})}
      className={`flex-row my-1.5 py-2.5 min-h-40 w-full border-0 rounded-md dark:bg-slate-900 ${index % 2 === 0 && 'flex-row-reverse'}`} style={{ elevation: 3, backgroundColor: item?.post_bg}}>
        <View className="w-4/12 h-40 p-1">
         <Image source={{uri:item?.thumbnail_path}} className="w-full h-full rounded-lg"/>
        </View>
      
        <View  className="w-8/12 items-start">
        <Text
          className="text-xl text-start dark:text-black ml-3"
          numberOfLines={2}
          style={{ fontFamily: theme.fonts.semiBold }}>{item.title}</Text>
        
        <Text
          className="text-lg leading-6  text-start dark:text-black ml-3 mt-2"
          numberOfLines={4}
          style={{ fontFamily: theme.fonts.regular }}>{item?.short_desc}</Text>
          
        </View>
      </TouchableOpacity>
);
   
  return (
    <SafeAreaView className='flex-1 bg-[#fff] dark:bg-black items-center'
    style={{width:width,height:height}}
    >
      <View className="w-96 items-center mb-1 pt-1 rounded-md dark:bg-black  "
      
      >
        {
          colorScheme=='dark'?<Image source={require('../../../assets/logo/logo-white.png')}
          className="w-2/5 h-12"
          /> :
          <Image source={require('../../../assets/logo/logo-dark.png')}
          className="w-2/5 h-12"
        />
        }
        
      </View>
      {
         isLoading?
          <UIActivityIndicator color='#d90429' size={40} className="py-3"/>
          :
        <FlatList
        data={SecondScreenpost}
        renderItem={({item,index}) => <Item item={item} index={index} />}
        keyExtractor={item => item.id}
        contentContainerStyle={{ width: width - 10, paddingHorizontal: 5 }}
        />
      }
      
        <StatusBar style='auto'/>
    </SafeAreaView>
  )
}

export default WorkSearch


