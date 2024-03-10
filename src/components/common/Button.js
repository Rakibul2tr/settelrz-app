import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import theme from '../../theme/theme'

const Button = ({ title, customCss, onPress,textcolor }) => {
   
  return (
    <TouchableOpacity className={customCss} style={styles.buttonContainer} onPress={onPress}>
      {
        textcolor ?
          <Text className="dark:text-white text-lg"
            style={[styles.btnTitle, { color: theme.colors.text,fontFamily:theme.fonts.medium}]}>{title}</Text>
          :
          <Text className={`dark:text-white text-white text-lg`}
            style={[styles.btnTitle,{fontFamily:theme.fonts.medium}]}>{title}</Text>
      }
      
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
    buttonContainer:{
        alignItems:'center',
        justifyContent:'center',
        borderRadius:10
    },
    btnTitle:{
        textTransform:'capitalize',
    }
})