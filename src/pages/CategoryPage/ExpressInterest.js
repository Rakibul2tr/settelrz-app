import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useColorScheme } from 'nativewind'
import { AntDesign } from '@expo/vector-icons';
import theme from '../../theme/theme';
import InputField from '../../components/common/InputField';

const ExpressInterest = ({ navigation, route }) => {
    const { item } = route.params
    const { colorScheme } = useColorScheme()
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;
  return (
    <SafeAreaView  className='flex-1 bg-[#fff] dark:bg-black items-center justify-between' style={{ width: width, height:'100%' }}>
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
        {/* header logo end */}
        <ScrollView nestedScrollEnabled={true}>
              {/* banner image */}
            <View className="w-screen h-60">
                <Image className="w-full h-full" source={{ uri: item.image }} alt='banner' />
            </View>
            <View className="mt-5 items-center">
                  {/* small image and title */}
                <View className="flex-row items-center justify-start"style={{ width:width-30,}}>
                      <Image className="w-24 h-14" source={{ uri: item.image }} alt='banner' /> 
                      <View className="pl-3">
                        <Text className="text-2xl dark:text-white"
                            style={{ fontFamily: theme.fonts.bold }}>{item.title}
                        </Text>   
                        <Text className="text-lg dark:text-white"
                            style={{ fontFamily: theme.fonts.regular }}>immigration Law
                        </Text>  
                      </View>    
                </View>
                  {/* user info */}
                <View className="py-4 items-center"style={{ width:width-30,}}>
                     {/* input item name */}
                    <View className="w-full bg-white py-1 rounded-md mb-2 border border-gray-300">
                        <InputField placeholder={'Full Name'}/>
                    </View>   
                     {/* input item number */}
                    <View className="w-full bg-white py-1 rounded-md mb-2 border border-gray-300">
                        <InputField placeholder={'Number'}/>
                    </View>   
                     {/* input item email */}
                    <View className="w-full bg-white py-1 rounded-md mb-2 border border-gray-300">
                        <InputField placeholder={'Email'}/>
                    </View>   
                     {/* input item address */}
                    <View className="w-full bg-white py-1 rounded-md mb-2 border border-gray-300">
                        <InputField placeholder={'Address'}/>
                    </View>  
                     {/* input item Query */}
                    <View className="w-full bg-white py-1 rounded-md mb-2 border border-gray-300">
                        <InputField placeholder={'Write Query'}multiline={true}/>
                    </View>  
                </View>
                  {/* button Express interest */}
                <View className="items-center py-4">
                    <TouchableOpacity
                    className="bg-[#d90429] justify-center rounded-lg dark:border-white dark:border h-12"
                    style={{ width:width/1.5,}}>
                        <Text className="text-center text-sm text-white dark:text-white "  style={{fontFamily:theme.fonts.bold}}>Express Interest</Text>
                    </TouchableOpacity>
                </View>
            </View> 
        </ScrollView>  
    </SafeAreaView>
  )
}

export default ExpressInterest

const styles = StyleSheet.create({})