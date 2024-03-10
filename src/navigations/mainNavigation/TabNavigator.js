
import React, { useEffect, useState } from 'react'
import HomeScreen from '../../screens/mainScreens/HomeScreen';
import WorkSearch from '../../screens/mainScreens/WorkSearch';
import Services from '../../screens/mainScreens/Services';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import Profile from '../../screens/mainScreens/Profile';
import {  View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SitePage from '../../pages/SitePage/SitePage';
import { getFocusedRouteNameFromRoute, useRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CategoryPage from '../../pages/CategoryPage/CategoryPage';
import CategorySingle from '../../pages/CategoryPage/CategorySingle';
import ExpressInterest from '../../pages/CategoryPage/ExpressInterest';
import ProfileInfo from '../../pages/ProfileInfo/ProfileInfo';
import ProfileUpdate from '../../pages/ProfileInfo/ProfileUpdate';
import { useGetUserDataQuery } from '../../redux/api/apiSlice';
import { getDataFromStorage } from '../../../Utilit/localStorageUtil';
import PasswordChange from '../../pages/PasswordChange/PasswordChange';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const [storedData, setStoredData] = useState({});
  const {data:postData}=useGetUserDataQuery(storedData)

 //  localStoraged user category data getting
  useEffect(()=>{
    const fetchData = async () => {
      const data = await getDataFromStorage('user_info'); 
      setStoredData(data);
    };
    fetchData();
  },[])
  return (
    <Tab.Navigator
       screenOptions={{
         tabBarStyle: { maxHeight:50,
         backgroundColor:'#000000',borderTopWidth:0,borderTopColor:'#000'},
         tabBarHideOnKeyboard:true,
       }} >
      <Tab.Screen
        options={option.home}
        name="Home" >
         {(props)=><HomeStack {...props} />}
      </Tab.Screen>
       {
       postData?.category?.name=='Others'?null:
        <Tab.Screen  options={option.workSearch} name="WorkStack">
        {(props)=><WorkStack {...props} />}
      </Tab.Screen>
       }
      

      <Tab.Screen options={option.service} name="ServiceStack">
        {(props)=><ServiceStack {...props} />}
      </Tab.Screen>

      <Tab.Screen options={option.profile} name="Profile">
          {(props)=><ProfileStack {...props} />}
      </Tab.Screen>
      

    </Tab.Navigator>
  )
}

export default TabNavigator;

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown:false }}>
      <Stack.Screen
        options={{animation:'slide_from_right'}}
        name="HomeScreen" component={HomeScreen} />
      <Stack.Screen
        options={{animation:'slide_from_right'}}
        name="SitePage" component={SitePage} />
    </Stack.Navigator>
  );
} 
function WorkStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown:false }}>
      <Stack.Screen
        options={{animation:'slide_from_right'}}
        name="Work Search" component={WorkSearch} />
      <Stack.Screen
        options={{animation:'slide_from_right'}}
        name="SitePage" component={SitePage} />
    </Stack.Navigator>
  );
} 
function ServiceStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      
      <Stack.Screen  options={{animation:'slide_from_right'}}
        name="Services" component={Services} />
      
      <Stack.Screen options={{animation:'slide_from_right'}}
        name="Category Page" component={CategoryPage} />
      
      <Stack.Screen options={{animation:'slide_from_right'}}
        name="Single page" component={CategorySingle} />
      
      <Stack.Screen options={{animation:'slide_from_right'}}
        name="Express" component={ExpressInterest}  />
    </Stack.Navigator>
  );
} 
function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      
      <Stack.Screen  options={{animation:'slide_from_right'}}
        name="Profile stack" component={Profile} />
      <Stack.Screen  options={{animation:'slide_from_right'}}
        name="ProfileInfo" component={ProfileInfo} />
      <Stack.Screen  options={{animation:'slide_from_right'}}
        name="Profile Update" component={ProfileUpdate} />
      <Stack.Screen  options={{animation:'slide_from_right'}}
        name="Password" component={PasswordChange} />
      
    </Stack.Navigator>
  );
} 





const option = {
  
  home:({ route }) => ({
            tabBarShowLabel: false,
            headerShown: false,
            tabBarInactiveTintColor: '#fff',
            tabBarActiveTintColor:'#ffffff',
            tabBarIcon:({color})=>(
              <View className="">
                {
                  color == '#ffffff' ? <FontAwesome5 name="book" size={24} color={color} />:<Feather name="book" size={26} color={'#fff'} />
                    
                }
                  
              </View>
            ),
          tabBarStyle: ((route) => {
              
              const routeName = getFocusedRouteNameFromRoute(route) ?? ""
              if (routeName === 'SitePage') {
                return { display: "none" }
              }
            return {
                 maxHeight:50,
                 backgroundColor: '#000000',
                 border:0
              }
            })(route),
            }),
 
  workSearch:({ route }) => ({
            tabBarShowLabel: false,
            headerShown: false,
            tabBarInactiveTintColor: '#fff',
            tabBarActiveTintColor:'#ffffff',
            tabBarIcon:({color})=>(
              <View className="">
               {
                  color == '#ffffff' ? <MaterialCommunityIcons name="arrow-top-right-bold-box" size={28} color={color} /> :
                    <MaterialCommunityIcons name="arrow-top-right-bold-box-outline" size={28} color={color} />
                }
                  
              </View>
            ),
          tabBarStyle: ((route) => {
              
              const routeName = getFocusedRouteNameFromRoute(route) ?? ""
              if (routeName === 'SitePage') {
                return { display: "none",maxHeight:0 }
              }
            return {
                 maxHeight:50,
                 backgroundColor:'#000000'
              }
            })(route),
            }),
  service: {
    tabBarShowLabel: false,
    headerShown: false,
    tabBarInactiveTintColor: '#fff',
     tabBarActiveTintColor:'#ffffff',
      tabBarIcon:({color})=>(
      <View >
        {
          color == '#ffffff' ? <AntDesign name="appstore1" size={26} color={color} /> :
            <AntDesign name="appstore-o" size={26} color={color} />
        }
         
      </View>
     ),
      
  },
  
  profile: {
    tabBarShowLabel: false,
    headerShown: false,
    tabBarInactiveTintColor: '#fff',
     tabBarActiveTintColor:'#ffffff',
    tabBarIcon:({color})=>(
      <View >
        {
          color == '#ffffff' ? <FontAwesome5 name="user-alt" size={26} color={color} /> :
            <FontAwesome5 name="user" size={26} color={color} />
        }
         
       </View>
    ),
  },
  
}
  
