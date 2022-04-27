import React from 'react';
import { 
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold
} from '@expo-google-fonts/jost';
import { StatusBar } from 'expo-status-bar';
import AppLoading from 'expo-app-loading';
// import * as Notifications from 'expo-notifications';


import Routes from './src/routes'
// import { PlantProps } from './src/libs/storage';

export default function App(){
  const [ fonstLoaded ] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold
  });

  // useEffect(() => {
    // const subscription = Notifications.addNotificationReceivedListener( // ouvir notificações
    //   async notification => {
    //     const data = notification.request.content.data.plant as PlantProps;
    //     console.log(data);
    //   }
    // )

    // return () => subscription.remove();
    // async function notifications(){ // listar todas notificações
    //   const data = await Notifications.getAllScheduledNotificationsAsync();
    //   console.log("##########NOTIFICAÇÕES###############");
    //   console.log(data);

    // }
    // notifications();
  // }, [])

  if(!fonstLoaded){
    return (
      <AppLoading />
    )
  }

  return(
    <>
      <StatusBar style="auto" />
      <Routes />
    </>
  );
}
