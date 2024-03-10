import 'expo-dev-client';
import { NativeWindStyleSheet } from "nativewind";
import { CustomRoot } from './CustomRoot';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import { UIActivityIndicator } from 'react-native-indicators';
import { Provider } from 'react-redux';
import { store } from './src/redux/app/store';
import * as Linking from 'expo-linking';
import { ToastProvider } from 'react-native-toast-notifications'

export default function App() {
  const [loading, setLoading] = useState(false);
  const [deepLink,setDeepLink]=useState(null)

  
  
    useEffect(()=>{
      const url=Linking.createURL('settlrz',{})
      console.log('url =>',url);
       setDeepLink(url)
    },[])
    

    
 


  const [fontsLoaded] = useFonts({
    "MohaveB": require('./assets/fonts/Mohave-Bold.ttf'),
    "MohaveM": require('./assets/fonts/Mohave-Medium.ttf'),
    "MohaveSB": require('./assets/fonts/Mohave-SemiBold.ttf'),
    "MontserratR": require('./assets/fonts/Montserrat-Regular.ttf'),
    "MontserratSB": require('./assets/fonts/Montserrat-SemiBold.ttf'),
  });
  if (!fontsLoaded) {
    return null;
  }

  setTimeout(() => {
    setLoading(true);
  }, 4000);

  if (!loading) {
    return (
      <UIActivityIndicator color='#d90429' size={40}/>
   )
  }
  if (loading) {
    return (
      <Provider store={store}>
        <ToastProvider>
          <CustomRoot />
        </ToastProvider>
    </Provider>
    
  );
  }
  
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
NativeWindStyleSheet.setOutput({
  default: "native",
});

