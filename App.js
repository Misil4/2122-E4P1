

import React, { useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import QrReader from "./src/home/qrReader";
import QrGenerator from "./src/home/qrGenerator";
import Authentification, { getAsyncStorageKey } from "./src/home/authentification";
import SplashScreen from 'react-native-splash-screen'
import Settings from "./src/home/Settings";
import GarbageLocation from "./src/home/GarbageLocation";
import UsersList from "./src/home/usersList";
import WasteReport from "./src/home/wasteReport";
import wasteLocation from "./src/home/wasteLocation";
import socketIO from 'socket.io-client';
import ChatAdmin  from "./src/home/adminChat";
import ChatUser from "./src/home/userChat";
import  Icon  from "react-native-vector-icons/MaterialIcons";
import { SafeAreaProvider,Image } from "react-native";
export const socket = socketIO('https://ballin-api-stage.herokuapp.com/', {
  
      transports: ['websocket'],
      jsonp: false,
    });
    const config = {
      animation: "spring",
      config: {
        stiffness: 1000,
        damping: 50,
        mass: 3,
        overshootClamping: false,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 0.01
      }
    };

const drawer = createDrawerNavigator();
const stack = createStackNavigator();


const App = (props) => {
  const [rol, setRol] = useState("user")
  useEffect(() => {
    SplashScreen.hide()
    getRol()
  }, [rol])
  const getRol = async () => {
    const value = await getAsyncStorageKey("user_rol");
    console.log("el valor es " + value)
    setRol(value)
  }
  const Admin = () => {
    return (
      <drawer.Navigator
         drawerContentOptions={{
          activeTintColor: '#e91e63',
          itemStyle: { marginVertical: 5 },
        }}
        drawerContent={(props) => <CustomSidebarMenu {...props} />}>
          
        <drawer.Screen name="Log Out" component={Authentification} options={{ drawerIcon: (({focused}) => <Icon name="home" size={30} color="green" />),headerShown: false, swipeEnabled: false }} />
        <drawer.Screen name="QrReader" component={QrReader} options={{drawerIcon: (({focused}) => <Icon name="qr-code" size={30} color="green" />),}} />
        <drawer.Screen name="Lista Usuarios" component={UsersList}  options={{drawerIcon: (({focused}) => <Icon name="supervised-user-circle" size={30} color="green" />),}} />
        <drawer.Screen name="Garbage" component={GarbageLocation} options={{drawerIcon: (({focused}) => <Icon name="restore-from-trash" size={30} color="green" />),}} />
        <drawer.Screen name="ChatAdmin" component={ChatAdmin}  options={{
            drawerItemStyle: { height: 0 }
          }} />
        <drawer.Screen name="Ubicación de basuras" component={wasteLocation} 
          options={{
            drawerItemStyle: { height: 0 }
          }} />
        <drawer.Screen name="Settings" component={Settings} options={{drawerIcon: (({focused}) => <Icon name="settings" size={30} color="green" />),}} />
      </drawer.Navigator>
    )
  }
  const User = () => {
    return (
      <drawer.Navigator>
        <drawer.Screen name="Log Out" component={Authentification} options={{ headerShown: false, swipeEnabled: false }} />
        <drawer.Screen name="QrGenerator" component={QrGenerator} />
        <drawer.Screen name="Mi Localización" component={WasteReport} />
        <drawer.Screen name="Settings" component={Settings} />
        <drawer.Screen name="Chat" component={ChatUser}  options={{
            drawerItemStyle: { height: 0 }
          }} />
      </drawer.Navigator>
    )
  }
  return (
    <SafeAreaProvider>
      {console.log(rol)}
      <NavigationContainer>
      <Image
        source={{ uri: "https://static.scientificamerican.com/espanol/cache/file/050D641B-C40F-460A-B892534B0024CB3C_source.jpg?w=590&h=800&4147C8A7-B3A4-4126-9293322177AC2D1C" }}
      />
        <stack.Navigator
         screenOptions={{
           gestureEnabled: true,
           gestureDirection: "horizontal",
           transitionSpec:{
             open: config,
             close: config
           }
         }}
         headerMode="float"
  >
          <stack.Screen name="Admin" component={Admin} options={{ headerShown: false }} />
          <stack.Screen name="User" component={User} options={{ headerShown: false }} />
        </stack.Navigator>
      </NavigationContainer>
      </SafeAreaProvider>
  )
}
export default App;