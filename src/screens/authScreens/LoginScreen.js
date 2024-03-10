import { Animated, Dimensions, Easing, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import TypewriterEffect from '../../components/AnimationText';
import Button from '../../components/common/Button';
import { FontAwesome } from '@expo/vector-icons';
import { Zocial } from '@expo/vector-icons';
import theme from '../../theme/theme';
import { useGetTextSliderDataQuery } from '../../redux/api/apiSlice';


const LoginScreen = ({ navigation }) => {

  const height = Dimensions.get('window').height
  const width = Dimensions.get('window').width

  const position = useRef(new Animated.Value(0)).current;
   const startBackgroundColorFun = () => {
    position.setValue(0);
    Animated.timing(position, {
      toValue: 3,
      duration: 15000,
      easing: Easing.linear,
      useNativeDriver: true,
      iterations:10
    }).start();
  };
  const backgroundColor = position.interpolate({
    inputRange: [0, 0.8, 1.6, 2.2, 3,3.8],
    outputRange: ['#e53935', '#8e24aa', '#2196f3','#4caf50', '#ffc107', '#ff3d00']
  });
  useEffect(() => {
    startBackgroundColorFun()
    
  }, [])

  const googleLoginHendale = () => {
      
   navigation.navigate('SignIn')
  }
 
  // text slider data fetching from redux
  const {data}=useGetTextSliderDataQuery()
 
  const words =["Hello world.1", "I am in World.2", "Learn React.3", "I am react Native4","I am javascript.5","I am WordPress.6"]
  
  return (
    <Animated.View
      style={[styles.animatedView, { backgroundColor: backgroundColor, width: width, height: height }]}>
        <View className="h-1/3">
          <TypewriterEffect words={data?data.data:words} speed={100} />
      </View>
      {/* button bottom black section start */}
      <View className="bg-black bottom-0 left-0 h-2/5 absolute w-full rounded-tl-3xl rounded-tr-3xl items-center justify-center">
         {/* bottom button item apple*/}
          <View className=" mb-2 h-10 bg-white flex-row items-center justify-center rounded-lg relative">
          <View className="absolute"style={{left:width/10}}>
            <FontAwesome name="apple" size={24} color="black" />
          </View>
            <Button title='Continue With Apple' textcolor={'white'} customCss={'ml-3 w-10/12'}/>
          </View>
        {/* bottom button item google */}
        <View className=" mb-2 h-10 bg-slate-800 flex-row items-center justify-center rounded-lg relative">
          <View className="absolute left-14"style={{left:width/10}}>
            <FontAwesome name="google" size={24} color="#fff" />
          </View>
            <Button title='Continue With Google'  customCss={`ml-3 w-10/12`}onPress={googleLoginHendale}/>
         </View>
        {/* bottom button item email password */}
        <View className=" mb-2 h-10 bg-slate-800 flex-row items-center justify-center rounded-lg relative">
          <View className="absolute left-14"style={{left:width/10}}>
            <Zocial name="email" size={24} color="#fff" />
          </View>
            <Button title='Sign up With Email'  customCss={`ml-3 w-10/12`}onPress={()=>navigation.navigate('SignIn')}/>
        </View>
        {/* bottom button item login */}
        <View className=" mb-2 h-10 bg-slate-800 flex-row items-center justify-center rounded-lg">
            <Button title='Login'  customCss={`ml-3 w-10/12`} onPress={()=>navigation.navigate('SignIn')}/>
         </View>
        {/* bottom text */}
         <View className="mt-1 h-8 ">
          <View className=" flex-row items-center ">
            <Text className="text-white" style={{fontFamily:theme.fonts.medium}}>Are You don't Account?</Text>
            <TouchableOpacity className="ml-2"onPress={()=>navigation.navigate('Sign Up')}><Text className="text-[#d90429] text-lg"style={{fontFamily:theme.fonts.medium}}>Sign Up</Text>
            </TouchableOpacity>
          </View>
         </View>
        
      </View>
      {/* button bottom black section end */}
    </Animated.View>
    
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  animatedView: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    position:'relative'
  }
})