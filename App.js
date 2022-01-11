

import React, { useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/home/index'
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
import Chat from "./src/home/chat/chat";

export const socket = socketIO('http://192.168.1.222:3001/', {
  
      transports: ['websocket'],
      jsonp: false,
    });

const drawer = createDrawerNavigator();
const stack = createStackNavigator();


const App = () => {
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
      <drawer.Navigator>
        <drawer.Screen name="Log Out" component={Authentification} options={{ headerShown: false, swipeEnabled: false }} />
        <drawer.Screen name="QrReader" component={QrReader} />
        <drawer.Screen name="Lista Usuarios" component={UsersList} />
        <drawer.Screen name="Garbage" component={GarbageLocation} />
        <drawer.Screen name="Chat" component={Chat}  options={{
            drawerItemStyle: { height: 0 }
          }} />
        <drawer.Screen name="Ubicación de basuras" component={wasteLocation} 
          options={{
            drawerItemStyle: { height: 0 }
          }} />
        <drawer.Screen name="Settings" component={Settings} />
      </drawer.Navigator>
    )
  }
  const User = () => {
    return (
      <drawer.Navigator>
        <drawer.Screen name="Log Out" component={Authentification} options={{ headerShown: false, swipeEnabled: false }} />
        <drawer.Screen name="QrGenerator" component={QrGenerator} />
        <drawer.Screen name="Garbage" component={WasteReport} />
        <drawer.Screen name="Settings" component={Settings} />
      </drawer.Navigator>
    )
  }
  return (
    <>
      {console.log(rol)}
      <NavigationContainer>
        <stack.Navigator>
          <stack.Screen name="Admin" component={Admin} options={{ headerShown: false }} />
          <stack.Screen name="User" component={User} options={{ headerShown: false }} />
        </stack.Navigator>
      </NavigationContainer>
    </>
  )
}
export default App;