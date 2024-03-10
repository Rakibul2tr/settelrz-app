import { View, Text, Image, TouchableOpacity, Button, StyleSheet, ScrollView, Switch, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from 'nativewind'
import theme from '../../theme/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserLogOutMutation } from '../../redux/api/apiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setLogout } from '../../redux/fetures/userHendelSlice/userHendelSlice';
import * as ImagePicker from 'expo-image-picker';
import { UIActivityIndicator } from 'react-native-indicators';
import { getDataFromStorage } from '../../../Utilit/localStorageUtil';
import { useToast } from 'react-native-toast-notifications';
import { TostMessageSuccess } from '../../components/common/TostMessage';


const Profile = ({navigation}) => {
  const { colorScheme, toggleColorScheme } = useColorScheme()
  const height = Dimensions.get('window').height
  const width = Dimensions.get('window').width
  const [userLogOut,{isSuccess,isLoading}]=useUserLogOutMutation()
  const [userToken,setUserToken]=useState({})
  const dispatch=useDispatch()
  const user = useSelector(state=>state.user)
  const [selectedImage, setSelectedImage] = useState(null);
  const toast = useToast();
  
 console.log('image',selectedImage);
  //  localStoraged data getting
  useEffect(()=>{
   const fetchData = async () => {
      const data = await getDataFromStorage('user_info'); 
      setUserToken(data);
    };
    fetchData();
    // local storage data clier and user (setLogour) false 
    if (isSuccess) {
      toast.show('LogOut Succesfull',TostMessageSuccess);
      AsyncStorage.clear().then(() => console.log('logout,Cleared storage'))
      dispatch(setLogout())
    }
  },[isSuccess])

  // profile image picker hendeler
    const teakImageHendel=async()=>{
      try {
      let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
        if (!result.canceled) {
          setSelectedImage(result.assets[0].uri);
          console.log('result',result);
        }
      } catch (error) {
        console.log('You did not select any image.',error);
      }
  }
  // log out henelar
  const logOutHendeler=async()=>{
    userLogOut({token:userToken?._token})
   
  }
   
  
  return (
    <SafeAreaView className="bg-[#fff] flex-1 relative dark:bg-black items-center"style={{width:width,height:height}}>
      <ScrollView>
          <View className=" items-center justify-start m-2">
            <View className="p-3 rounded-full border border-dotted border-[#d90429] dark:border-white relative ">
            <Image className="w-28 h-28 rounded-full relative" source={{uri:selectedImage?selectedImage:'https://lh3.googleusercontent.com/a/AAcHTtdXxfHQx236_jQQuId9-RWmqz2IAQlAtIZFC5v_66pMfw=s83-c-mo'}}/>
            <TouchableOpacity className="absolute bottom-1 right-2" onPress={teakImageHendel}>
              <AntDesign name="camerao" size={24} color="#d90429" />
            </TouchableOpacity>
          </View>
          <View className="flex-row items-center justify-center">
          <View className="items-center mr-2">
            <Text style={styles.menuText} className="text-xl dark:text-white ">Md:Rakibul Islam</Text>
            <Text style={styles.menuText} className="text-md dark:text-white ">bio</Text>
          </View>
        </View>

          </View>
          {/* line border */}
          <View style={{width:width-30}} className="border  dark:border-white border-[#b5b5b9] border-b-0"/>
          {/* menu list */}
        <View className="mt-5">
            {/* Profile item */}
            <TouchableOpacity className="flex-row items-center mx-3 mb-2 drop-shadow-md"style={styles.itemBorder}onPress={()=>navigation.navigate('ProfileInfo')}>
              <View className="bg-[#ec6484] p-3 rounded-full mr-3 drop-shadow-md">
                <AntDesign name="user" size={20} color="#fff" />
              </View>
              <View>
                <Text style={styles.menuText} className="text-lg dark:text-white ">Profile</Text>
              </View>
            </TouchableOpacity>
            {/* pasword change item */}
            <TouchableOpacity className="flex-row items-center mx-3 mb-2 drop-shadow-md"style={styles.itemBorder}onPress={()=>navigation.navigate('Password')}>
              <View className="bg-[#0b1524] p-3 rounded-full mr-3 drop-shadow-md">
                <MaterialIcons name="security" size={20} color="#fff" />
              </View>
              <View>
                <Text style={styles.menuText} className="text-lg dark:text-white ">Password Change</Text>
              </View>
            </TouchableOpacity>
             {/* About us item */}
            <TouchableOpacity className="flex-row items-center mx-3 mb-2 drop-shadow-md"style={styles.itemBorder}>
              <View className="bg-[#3EE99B] p-3 rounded-full mr-3">
                <AntDesign name="info" size={20} color="#fff" />
              </View>
              <View>
                <Text style={styles.menuText} className="text-lg dark:text-white ">About Us</Text>
              </View>
            </TouchableOpacity>
            {/* delete Account item */}
            <TouchableOpacity className="flex-row items-center mx-3 mb-2 drop-shadow-md"style={styles.itemBorder}>
              <View className="bg-[#f73a66] p-3 rounded-full mr-3">
                <AntDesign name="setting" size={20} color="#fff" />
              </View>
              <View>
                <Text style={styles.menuText} className="text-lg dark:text-white ">Delete Account</Text>
              </View>
            </TouchableOpacity>
              {/* LogOut item */}
              {
                isLoading?<UIActivityIndicator color='#d90429' size={35} className="py-3"/>:
                <TouchableOpacity className="flex-row items-center mx-3 mb-2 drop-shadow-md"style={styles.itemBorder} onPress={logOutHendeler}>
                <View className="bg-[#307CF2] p-3 rounded-full mr-3">
                  <AntDesign name="setting" size={20} color="#fff" />
                </View>
                <View>
                  <Text style={styles.menuText} className="text-lg dark:text-white ">Sign Out</Text>
                </View>
              </TouchableOpacity>
              }
            {/* light and dark button */}
            <TouchableOpacity className="flex-row items-center mx-3 mb-2 drop-shadow-md" style={styles.itemBorder}>
              <View className="bg-[#11d47e] p-3 rounded-full mr-3">
                  <FontAwesome name="moon-o" size={20} color="#fff" />
                </View>
                <View className="flex-row items-center">
                <Text style={styles.menuText} className="text-lg dark:text-white mx-5">Dark / Light Mode</Text>
                  <Switch trackColor={{false: '#d90429', true: '#fff'}} value={colorScheme=="dark"} onChange={toggleColorScheme}/>
                </View>
            </TouchableOpacity>
          </View>

          </ScrollView>
        </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({
  itemBorder: {
    borderBottomWidth:0.2,
    borderBottomColor: '#d4d4d9',
    paddingBottom: 8,
  },
  menuText: {
    fontFamily: theme.fonts.medium
    
  }
})