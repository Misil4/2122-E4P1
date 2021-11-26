

import React, { useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './src/home/index'
import QrReader from "./src/home/qrReader";
import QrGenerator from "./src/home/qrGenerator";
import Authentification, { getAsyncStorageKey } from "./src/home/authentification";
import SplashScreen from 'react-native-splash-screen'
import Settings from "./src/home/Settings";
import GarbageLocation from "./src/home/GarbageLocation";
import geolocation from "./src/home/geolocation";
import UsersList from "./src/home/usersList";
import WasteReport from "./src/home/wasteReport";
const drawer = createDrawerNavigator();


const App  = () => {
  const [rol,setRol] = useState("user")
  useEffect(() => {
      SplashScreen.hide()
      getRol()
  },[rol])
  const getRol = async () => {
    const value= await getAsyncStorageKey("user_rol");
    console.log("el valor es "+value)
    setRol(value)
  }
    return(
      <>
      {console.log(rol)}
      <NavigationContainer>
      <drawer.Navigator mode="modal">
        {rol === "admin" ? (
          <>
        <drawer.Screen name="Log Out" component={Authentification} options={{ headerShown: false , swipeEnabled: false}}/>
        <drawer.Screen name="QrReader" component={QrReader} />
        <drawer.Screen name="Geolocalization" component={geolocation}/>
        <drawer.Screen name="Lista Usuarios" component={UsersList} />
        <drawer.Screen name="Garbage" component={GarbageLocation} />
        <drawer.Screen name="Settings" component={Settings} />
        </>
        ) : (
          <>
          <drawer.Screen name="Log Out" component={Authentification} options={{ headerShown: false , swipeEnabled: false}}/>
        <drawer.Screen name="QrGenerator" component={QrGenerator} />
        <drawer.Screen name="Denunciar Basura" component={WasteReport} />
        <drawer.Screen name="Settings" component={Settings} />
        </>
        )}
      </drawer.Navigator>
      </NavigationContainer>
      </>
    )
  }
export default App;