import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { useColorScheme } from 'nativewind';
import theme from '../../theme/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCategoryDataQuery, useSetUserCategoryMutation } from '../../redux/api/apiSlice';
import { useDispatch } from 'react-redux';
import { setLogin } from '../../redux/fetures/userHendelSlice/userHendelSlice';
import { UIActivityIndicator } from 'react-native-indicators';
import { getDataFromStorage } from '../../../Utilit/localStorageUtil';




const colors = [
    ['#EF5937', '#f29f75'],
    ['#F5BB2C', '#ffce52'],
    ['#2ec27b', '#51f7af'],
    ['#372CB6', '#686ff9'],
    ['#E53A5B',  '#f75179'],
    ['#d5e22c','#e2ef37'],
    ['#54e22c', '#79ee58'],
    ['#EF5937', '#F08954'], 
    ['#4ED695', '#37E99B'], 
  ];
  

const Categorys = () => {
    const { colorScheme } = useColorScheme()
    const height = Dimensions.get('window').height
    const width = Dimensions.get('window').width 
    const [userInfo,setUserInfo]=useState({})
    const {data:categoryArray,isLoading,isSuccess,isError}=useCategoryDataQuery(userInfo)
    const dispatch = useDispatch()
    const [setUserCategory,{data:Data,isSuccess:issuccess}]=useSetUserCategoryMutation()
    
    
    console.log('category page',userInfo);
//  localStoraged data getting
  useEffect(()=>{
     const fetchData = async () => {
      const data = await getDataFromStorage('user_info'); 
      setUserInfo(data);
    };
    fetchData();
    
    // user category successfull 
    if(issuccess){
      dispatch(setLogin({isLoggedIn:true}))
    }else if(isError){
      console.log('category error',categoryArray);
    }
  },[issuccess,isError])

// console.log('category ',userInfo);

  const categorySelectHendal=async(selected)=>{
    setUserCategory({userInfo:userInfo,user_category_id:selected.id})
   await AsyncStorage.setItem('user_category',JSON.stringify(selected));
    
  }
  
  

    // flatlist item
  const Item = ({ item,cardBgColor }) => (
    <LinearGradient
    style={{ width:(width/2.1)-12,margin:6 }}
       start={{ x: -1, y: 0 }}
       end={{ x: 1, y: 0 }}
        className=" h-40 rounded-xl"
        colors={cardBgColor}>
      <TouchableOpacity
        onPress={()=>categorySelectHendal(item)}
        className="w-full h-full items-center justify-center">
            {/* <View className="border border-white w-12 h-12 items-center justify-center rounded-full">
              <FontAwesome name={item?.icon} size={24} color="#fff" />
            </View> */}
         <Text
          className="text-white text-lg text-center px-1"
          numberOfLines={1}
          style={{fontFamily:theme.fonts.bold}}
          >
            {item?.name}
        </Text>
        </TouchableOpacity>
    </LinearGradient>
  );
    return (
    <SafeAreaView className="flex-1 items-center justify-center bg-[rgb(255,255,255)] dark:bg-black" style={{width:width,height:height}}>

       {/* top header and title */}
        <View
        className="w-full items-center pt-1  dark:bg-black rounded-bl-xl rounded-br-xl ">
        {
            colorScheme == 'dark' ?
          <Image source={require('../../../assets/logo/logo-white.png')}
          className="w-2/5 h-12"
          /> :
          <Image source={require('../../../assets/logo/logo-dark.png')}
          className="w-2/5 h-12"
        />
        }
        </View>
        {/* category section */}
      <ScrollView nestedScrollEnabled={true} indicatorStyle={colorScheme=='dark'?'white':'black'}>
          <Text className="dark:text-white text-3xl text-center pb-2"
            style={{fontFamily:theme.fonts.bold}}
          >Choose A Category</Text>
          {
            isLoading?
          <UIActivityIndicator color='#d90429' size={40} className="py-3"/>
          :
          <FlatList
            data={categoryArray}
            numColumns={2}
            renderItem={({item,index}) => {
              const randomIndex = Math.floor(Math.random() * colors.length);
              const cardBgColor = colors[randomIndex];  
              return (
                <Item item={item} index={index} cardBgColor={cardBgColor}/>
              )
            }}
            keyExtractor={item => item.id.toString()}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            nestedScrollEnabled={true}
            scrollEnabled={false}
            contentContainerStyle={{ }}
           />
          }
          
        </ScrollView>
        <StatusBar style='auto'/>
    </SafeAreaView>
  )
}

export default Categorys

const styles = StyleSheet.create({

})

//style={{backgroundColor:(index%3)-1==0?'black':'red'}}