

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
  const [rol,setRol] = useState(false)
  useEffect(() => {
      SplashScreen.hide();
      getRol().then((response) => setRol(response))
  },[])
  const getRol = async () => {
    const value= await getAsyncStorageKey("user_rol");
    return value
  }
  function Admin() {
    return (
        <drawer.Navigator>
          <drawer.Screen name="Log Out" component={Authentification} options={{ headerShown: false , swipeEnabled: false}}/>
          <drawer.Screen name="QrReader" component={QrReader} />
          <drawer.Screen name="Settings" component={Settings} />
          <drawer.Screen name="Geolocalization" component={geolocation}/>
          <drawer.Screen name="Lista Usuarios" component={UsersList} />
          <drawer.Screen name="Garbage" component={GarbageLocation} />
        </drawer.Navigator>
    );
  }
  
  function User() {
    return (
      <drawer.Navigator>
          <drawer.Screen name="Log Out" component={Authentification} options={{ headerShown: false , swipeEnabled: false}}/>
          <drawer.Screen name="QrGenerator" component={QrGenerator} />
          <drawer.Screen name="Denunciar Basura" component={WasteReport} />
          </drawer.Navigator>
    );
  }
  getRol().then((response) => setRol(response))
    return(
      <>
      {rol === "admin" ?  <NavigationContainer>{Admin()}</NavigationContainer> : <NavigationContainer>{User()}</NavigationContainer>}
      </>
    )
  }
export default App;