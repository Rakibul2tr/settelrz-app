import { Dimensions, KeyboardAvoidingView, StyleSheet,TextInput, View} from 'react-native'
import React from 'react'
import theme from '../../theme/theme'
import { FontAwesome } from '@expo/vector-icons';

const InputField = ({ placeholder, onChangeText, value, secureTextEntry, autoCapitalize, multiline, defaultValue, editable,keyboardType }) => {
  const height = Dimensions.get('window').height
  const width = Dimensions.get('window').width
  return (
    <TextInput style={[styles.input]} 
      placeholder={placeholder}
      onChangeText={onChangeText}
      value={value}
      defaultValue={defaultValue}
      secureTextEntry={secureTextEntry}
      autoCapitalize={autoCapitalize}
      multiline={multiline}
      editable={editable}
      keyboardType={keyboardType}
      placeholderTextColor='#000000'
      />
  )
}

export default InputField

const styles = StyleSheet.create({
   
    input:{
        padding:8,
        color: theme.colors.background,
        fontFamily:theme.fonts.regular,
        width:'100%'
    }
})