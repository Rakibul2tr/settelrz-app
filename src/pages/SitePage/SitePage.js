import {  Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import WebView from 'react-native-webview'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import { UIActivityIndicator } from 'react-native-indicators';



const SitePage = ({ navigation, route }) => {
    const { link } = route.params;
    const width = Dimensions.get('window').width
    const { colorScheme } = useColorScheme()
    
    
    const ActivityIndicatorElement = () => {
        return (
           <View className="flex-1 justify-center"style={{ width: width, height:'100%' }}>
            <UIActivityIndicator color='#d90429' size={40}/>
        </View>
        );
        };
    return (
        <SafeAreaView style={{ width: width, height:'100%' }} className="bg-white dark:bg-slate-950">
            <View className="bg-white px-3 py-3 dark:bg-slate-950 dark:border-b dark:border-white">
            <TouchableOpacity  onPress={()=>navigation.goBack()}>
               <AntDesign name="arrowleft" size={24} color={colorScheme=='dark'?'#fff':'#000'} />
            </TouchableOpacity>
           </View>
            <WebView
                source={{ uri: link }}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                startInLoadingState={true}
                renderLoading={ActivityIndicatorElement}
            />
            <StatusBar style='auto'/>
       </SafeAreaView>
    
  )
}

export default SitePage

const styles = StyleSheet.create({})