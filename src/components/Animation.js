import { Animated, Easing, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import theme from '../theme/theme';

const Animation = () => {
  const position = new Animated.Value(0)
   const startImageRotateFunction = () => {
    position.setValue(0);
    Animated.timing(position, {
      toValue: 1,
      duration: 4000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };
  const RotateData = position.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  setTimeout(() => {
    startImageRotateFunction()
  }, 100);
    
    
    
  return (
    <View className='flex-1 items-center justify-center relative'>
     
      <Animated.View style={[styles.animatedView,{transform: [{rotate:RotateData}
    ]}]}>
       
      </Animated.View>

      <Animated.View style={[styles.animatedView2,{transform: [
        {rotate:RotateData}
    ]}]}>
       <Text className="text-white text-2xl"style={{fontFamily:theme.fonts.bold}}>Ready To Use</Text>
      </Animated.View>
    </View>
  )
}

export default Animation

const styles = StyleSheet.create({
  animatedView: {
    height: 250,
    width: 250,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
    borderRadius:150,
    borderWidth: 10,
    borderColor:'#000'
  },
  animatedView2: {
    height: 150,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
    borderRadius: 100,
    borderWidth: 8,
    borderColor: '#000',
    position:'absolute'
  }
})