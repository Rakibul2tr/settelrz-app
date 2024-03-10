import {  Dimensions, FlatList, Image, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar';
import theme from '../../theme/theme';
import { useColorScheme } from 'nativewind';
import { useGetFirstScreenPostQuery } from '../../redux/api/apiSlice';
import { UIActivityIndicator } from 'react-native-indicators';
import { useDispatch } from 'react-redux';
import { reloadAsync } from 'expo-updates';
import { getDataFromStorage } from '../../../Utilit/localStorageUtil';


const HomeScreen = ({navigation}) => {
  const { colorScheme } = useColorScheme()
  const width = Dimensions.get('window').width
  const [userInfo,setUserInfo]=useState({})
  const [refreshing,setRefreshing]=useState(false)
  const dispatch=useDispatch()
  const {data:postData,isSuccess,isLoading}=useGetFirstScreenPostQuery(userInfo)

  // localStoraged data getting
  useEffect(()=>{
    const fetchData = async () => {
      const data = await getDataFromStorage('user_info'); 
      setUserInfo(data);
    };
    fetchData();
   if(isSuccess){
    console.log('Home Screen data fethc Successfull');
   }
  },[isSuccess])

  // screen refreshing
  const onRefresh =useCallback(async() => {
    // await reloadAsync();
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 2000);
  }, []);
// flatList render item
  const Item = ({ item }) => (
      <View className="flex-row p-3 my-1.5 max-h-40 w-full border border-gray-200 rounded-md bg-white dark:bg-slate-900 dark:border-gray-500" >
        <View className="w-2/5">
         <Image source={{uri:item?.thumbnail_path}} className="w-full h-full rounded-lg" alt='Wait'/>
        </View>
      
        <View  className="w-3/5 justify-between ml-2">
          <Text className="text-lg items-start dark:text-white pl-1" numberOfLines={3} style={{fontFamily:theme.fonts.bold}}>{item?.short_desc}</Text>
        <TouchableOpacity onPress={()=>navigation.navigate('SitePage',{link:item?.gov_post_link})}
          className="bg-[#d90429] w-24 p-1.5 px-1 ml-20 rounded-lg dark:bg-[theme.colors.background] dark:border-white dark:border">
            <Text className="text-center text-sm text-white dark:text-white "  style={{fontFamily:theme.fonts.bold}}>See Update</Text>
          </TouchableOpacity>
        </View>
      </View>
);
  return (
    <SafeAreaView className='flex-1 bg-[#ffffff] dark:bg-black items-center'
      style={{width:width,height:'100%'}}
    >
      <View className="items-center mb-1 dark:w-auto rounded-md bg-white  dark:bg-black "
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
        </View>
      <ScrollView nestedScrollEnabled={true} 
      refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text className="dark:text-white text-2xl text-center pb-2 px-2"style={{fontFamily:theme.fonts.bold}}>Visa Updates and Latest News</Text>
        {
        isLoading?
        <UIActivityIndicator color='#d90429' size={40} className="py-3"/>
        :
        <FlatList
        data={postData}
        renderItem={({item}) => <Item item={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={{ width: width - 10, paddingHorizontal: 5 }}
        nestedScrollEnabled={true}
        scrollEnabled={false}
        />
        }
      
       </ScrollView>
        <StatusBar style='auto'/>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
 
})
