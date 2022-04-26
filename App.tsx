import React from 'react';
import { 
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold
} from '@expo-google-fonts/jost';
import { StatusBar } from 'react-native';
import AppLoading from 'expo-app-loading';


import Routes from './src/routes'
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App(){
  const [ fonstLoaded ] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold
  });

  if(!fonstLoaded){
    return (
      <AppLoading />
    )
  }

  return(
    <>
      <StatusBar barStyle="light-content" backgroundColor="#fff" />
      <Routes />
    </>
  );
}
