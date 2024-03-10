import {  Dimensions, Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar';
import theme from '../../theme/theme';
import { useColorScheme } from 'nativewind';
import { AntDesign } from '@expo/vector-icons';
import InputField from '../../components/common/InputField';
import DatePicker from 'react-native-date-picker';
import { Foundation } from '@expo/vector-icons';
import { SelectList } from 'react-native-dropdown-select-list';
import { useGetUserDataQuery } from '../../redux/api/apiSlice';
import { getDataFromStorage } from '../../../Utilit/localStorageUtil';




const ProfileUpdate = ({navigation}) => {
  const { colorScheme } = useColorScheme()
  const height = Dimensions.get('window').height
  const width = Dimensions.get('window').width
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const [storedData, setStoredData] = useState({});
  const {data:postData}=useGetUserDataQuery(storedData)
   
  let day = date?.getDate();
  let month = date?.getMonth() + 1;
  let year = date?.getFullYear();
  const fulldate=`${year}-${month}-${day}`
  // console.log('post data',postData);
  //  localStoraged data getting
  useEffect(()=>{
   const fetchData = async () => {
      const data = await getDataFromStorage('user_info'); 
      setStoredData(data);
    };
    fetchData();
     setState({
        email:postData?.email,
        name:postData?.name,
        phone_number:postData?.phone_number,
        gender:postData?.gender ,
        birthdate: fulldate?fulldate:postData?.birthdate,
        country:postData?.country,
        userType:postData?.userType,
      })
  },[postData])
   const [state,setState]=useState({ 
    email:postData?.email,
    name:postData?.name,
    phone_number:postData?.phone_number,
    gender:postData?.gender ,
    birthdate: fulldate?fulldate:postData?.birthdate,
    country:postData?.country,
    userType:postData?.userType,
   })
  
  
  const updateHendeler = () => {
    console.log('user data state',state);
    // navigation.navigate('Profile Update')
  }
  
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
      <ScrollView nestedScrollEnabled={true}contentContainerStyle={{width:width,paddingHorizontal:5,alignItems:'center'}}>
        {/* banner image and title */}
          <Text className="dark:text-white text-2xl text-center pb-2"style={{fontFamily:theme.fonts.bold}}>Update Your Profile</Text>
          <Text className="dark:text-white text-lg text-center pb-2"style={{fontFamily:theme.fonts.medium}}>Keep your profile updated so that you can access our services even faster</Text>

        {/* user info */}
        <View className="py-4 items-center w-11/12 dark:border-0.5 dark:border-slate-100 px-3">

                {/* input item name */}
            <View className="w-full items-start">
                <Text style={styles.lableText}className="dark:text-white">First Name</Text>
            </View>
            <View className="w-full bg-white py-1 rounded-md mb-2 border border-gray-300">
                <InputField  defaultValue={state.name}onChangeText={(text)=>setState({...state,name:text})}/>
            </View>   

                {/* input item email */}
            <View className="w-full items-start">
                <Text style={styles.lableText}className="dark:text-white">Email</Text>
            </View>
            <View className="w-full bg-white py-1 rounded-md mb-2 border border-gray-300">
                <InputField defaultValue={state?.email}onChangeText={(text)=>setState({...state,email:text})}/>
            </View>   

                {/* input item phone */}
            <View className="w-full items-start">
                <Text style={styles.lableText}className="dark:text-white">Phone Number</Text>
            </View>
            <View className="w-full bg-white py-1 rounded-md mb-2 border border-gray-300">
                <InputField placeholder={'Phone Number'}defaultValue={postData?.phone_number}onChangeText={(text)=>setState({...state,phone_number:text})}/>
            </View>  

              {/* input item gender */}
            <View className="w-full items-start">
                <Text style={styles.lableText}className="dark:text-white">Gender</Text>
            </View>
            <View className="flex-row items-center justify-start w-full ml-3 my-3">
                  {
                    GenderArray.map((item,index)=>
                    <View key={index} className="flex-row items-center mr-4">
                        <TouchableOpacity onPress={()=>setState({...state,gender:item.value})}>
                        <View style={[styles.genderCharcle,{backgroundColor:state.gender==item.lable||postData?.gender==item.lable?'red':null}]}/>
                      </TouchableOpacity>
                      <Text style={{marginLeft:5,color:'#000',fontFamily:theme.fonts.semiBold}}>{item.lable}</Text> 
                    </View>
                    )
                  }
            </View>

               {/* input item date */}
            <View className="w-full items-start">
                <Text style={styles.lableText}className="dark:text-white">Date of Birth</Text>
            </View>
             <View className="w-full bg-white py-1 rounded-md mb-2 border border-gray-300">
                <TouchableOpacity onPress={() => setOpen(true)} className="flex-row items-center py-2.5 pl-2">
                  <Foundation name="calendar" size={24} color="black" />
                  <Text className="ml-3">{postData?.birthdate?postData?.birthdate:date?.toUTCString()}</Text>
                </TouchableOpacity>
                <DatePicker
                  modal
                  mode="date"
                  open={open}
                  date={date}
                  onConfirm={(val) => {
                    setOpen(false)
                    setDate(val)
                    // setState({...state,birthdate:arg})
                  }}
                  onCancel={() => {
                    setOpen(false)
                  }}
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  is24Hour={true}
                  />
             </View>   

               {/* input item country */}
            <View className="w-full items-start">
                <Text style={styles.lableText}className="dark:text-white">Home Country</Text>
            </View>
             <View className="w-full bg-white py-1 rounded-md mb-2 border border-gray-300">
                <SelectList 
                  setSelected={(val) => setState({...state,country:val})} 
                  data={data} 
                  save="value"
                  boxStyles={{ borderWidth: 0 }}
                  inputStyles={{width:'100%'}}
                  dropdownItemStyles={{ backgroundColor: '#fff' }}
                  placeholder={postData?.country?postData?.country:'Contry'}
                  dropdownStyles={{width:'100%',borderWidth: 0}}
                />
             </View>  

             
             
                {/* input item User Type */}
            <View className="w-full items-start">
                <Text style={styles.lableText}className="dark:text-white">User Type</Text>
            </View>
            <View className="w-full bg-white py-1 rounded-md mb-2 border border-gray-300">
                <SelectList 
                  setSelected={(val) => setState({...state,userType:val})} 
                  data={userType} 
                  save="value"
                  boxStyles={{ borderWidth:0}}
                  inputStyles={{width:'100%'}}
                  dropdownItemStyles={{ backgroundColor: '#fff' }}
                  placeholder={postData?.category?.name?postData?.category?.name:"User Type"}
                  dropdownStyles={{width:'100%',borderWidth: 0}}
                />
             </View> 
               
        </View>
        
        {/* button Express interest */}
        <View className="items-center py-4">
            <TouchableOpacity onPress={updateHendeler}
            className="bg-[#d90429] justify-center rounded-lg dark:border-white dark:border h-12"
            style={{ width:width/1.5,}}>
                <Text className="text-center text-lg text-white dark:text-white "  style={{fontFamily:theme.fonts.bold}}>Update</Text>
            </TouchableOpacity>
        </View>
       </ScrollView>
        <StatusBar style='auto'/>
    </SafeAreaView>
  )
}

export default ProfileUpdate

const width = Dimensions.get('window').width
const styles = StyleSheet.create({
    
    informText: {
        fontSize: 18,
        fontFamily: theme.fonts.medium,
        
    },
    lableText: {
        fontSize: 16,
        fontFamily: theme.fonts.bold,
        paddingVertical:5,
        marginLeft:5,
        
    },
    genderCharcle:{
        width:15,
        height:15,
        borderRadius:15,
        borderWidth:1,
        borderColor:'red'
    },
})
 const data = [
      {key:'1', value:'Mobiles'},
      {key:'2', value:'Appliances'},
      {key:'3', value:'Cameras'},
      {key:'4', value:'Computers'},
      {key:'5', value:'Vegetables'},
      {key:'6', value:'Diary Products'},
      {key:'7', value:'Drinks'},
  ]
 const Qualification = [
      {key:'1', value:'Undergraduate'},
      {key:'2', value:'Graduate'},
      {key:'3', value:'Post Graduate'},
  ]
 const userType = [
      {key:'1', value:'Refugee'},
      {key:'2', value:'Student'},
      {key:'3', value:'Work Visa Holder'},
      {key:'4', value:'Yourh Worker Visa Holder'},
      {key:'5', value:'Dependent Visa Holder'},
      {key:'6', value:'Others'},
  ]
  const GenderArray = [{ lable: 'Male', value: 'Male' }, { lable: 'Female', value: 'Female' }, { lable: 'Other', value: 'Other' }]