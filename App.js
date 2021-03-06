

import React, { useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import QrReader from "./src/home/qrReader";
import QrGenerator from "./src/home/qrGenerator";
import Authentification from "./src/home/authentification";
import SplashScreen from 'react-native-splash-screen'
import Settings from "./src/home/Settings";
import GarbageLocation from "./src/home/GarbageLocation";
import UsersList from "./src/home/usersList";
import WasteReport from "./src/home/wasteReport";
import wasteLocation from "./src/home/wasteLocation";
import ChatAdmin from "./src/home/adminChat";
import ChatUser from "./src/home/userChat";
import Icon from "react-native-vector-icons/MaterialIcons";
import CustomSidebarMenu from "./src/home/components/customSidebarMenu";
import AppContext from "./context/context";
import { socket } from "./socket/socket";
import { getAsyncStorageKey } from "./helpers/asynctorage";
import { selectLanguage } from "./languages/languages.js";
import UserLocation from "./src/home/userLocation";
import { PermissionsAndroid } from "react-native";
import Geolocation from 'react-native-geolocation-service';
import useStorage from "./hooks/useStorage";
import { View, LogBox } from "react-native";

LogBox.ignoreAllLogs();



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


const App = () => {
  const getLanguage = async () => {
    return await getAsyncStorageKey('language')
  }
  const getTheme = async () => {
    const theme = await getAsyncStorageKey('theme')
    return JSON.parse(theme)
  }
  const [language, setLanguage] = useState("euskera")
  const [theme, setTheme] = useState(false)
  const [userInfo, setUserInfo] = useState(null)
  const [location,setLocation] = useState(null)
  const [permission,setPermission] = useState(false)
  async function requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'Example App',
          'message': 'Example App access to your location '
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setPermission(true)
      } else {
        return false
      }
    } catch (err) {
      console.warn(err)
    }
  }
  useEffect(() => {
    requestLocationPermission()
    if (permission) {
      Geolocation.getCurrentPosition(
        (position) => {
          setLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude, timestamp: position.timestamp })

        },
        (error) => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    }
  }, [permission])
  useEffect(() => {
    getAsyncStorageKey("user_info").then(response => setUserInfo(JSON.parse(response)))
    SplashScreen.hide()
    
  }, [])
  useEffect(() => {
    getLanguage().then(response => response === null ? false : setLanguage(response))
    getTheme().then(response => response === null ? false : setTheme(response))
  }, [language,theme])
  const Admin = () => {
    return (
      <>
        <drawer.Navigator
         screenOptions={{
          activeTintColor: '#e91e63',
          itemStyle: { marginVertical: 5 },
          drawerLabelStyle : {
            color : theme ? "white" : "black",
            fontFamily : "Gotham-BookItalic"
          }
        }}
          drawerContent={(props) => <CustomSidebarMenu userName={userInfo ? `${selectLanguage(language).welcome} ${userInfo.user.givenName.toLowerCase()}` : "Bienvenido Admin"} userPhoto={userInfo ? userInfo.user.photo : "https://media-exp1.licdn.com/dms/image/C4D03AQHj0LXK6dAddA/profile-displayphoto-shrink_200_200/0/1603400414371?e=1643241600&v=beta&t=N0urNAN-gID1GjtJeZW3Dej94EjRSjvKhYQum3bQeNs"} {...props} />}>
          <drawer.Screen name={selectLanguage(language).auth_screen} component={Authentification} options={{ drawerIcon: (({ focused }) => <Icon name="home" size={30} color= "#61b97c" />), headerShown: false, swipeEnabled: false }} />
          <drawer.Screen name="QrReader" component={QrReader} options={{ drawerIcon: (({ focused }) => <Icon name="qr-code-scanner" size={30} color= "#61b97c" />), }} />
          <drawer.Screen name={selectLanguage(language).userlist_screen} component={UsersList} options={{ drawerIcon: (({ focused }) => <Icon name="supervised-user-circle" size={30} color= "#61b97c" />), }} />
          <drawer.Screen name={selectLanguage(language).garbage_screen} component={GarbageLocation} options={{ drawerIcon: (({ focused }) => <Icon name="restore-from-trash" size={30} color= "#61b97c" />), }} />
          <drawer.Screen name={"UserLocation"} component={UserLocation} options={{drawerItemStyle : { height : 0}}} />
          <drawer.Screen name="ChatAdmin" component={ChatAdmin} options={{
            drawerItemStyle: { height: 0 }
          }} />
          <drawer.Screen name="Ubicacion de Basuras" component={wasteLocation} options={{
            drawerItemStyle: { height: 0 }
          }} />
          <drawer.Screen name="Ubicaci??n de basuras" component={wasteLocation}
            options={{
              drawerItemStyle: { height: 0 }
            }} />
          <drawer.Screen name="Settings" component={Settings} options={{ drawerIcon: (({ focused }) => <Icon name="settings" size={30} color="#61b97c" />), }} />
        </drawer.Navigator>
      </>)
  }
  const User = () => {
    return (
      <drawer.Navigator
      screenOptions={{
        activeTintColor: '#e91e63',
        itemStyle: { marginVertical: 5 },
        drawerLabelStyle : {
          color : theme ? "white" : "black",
          fontFamily : "Gotham-BookItalic"
        }
      }}
        drawerContent={(props) => <CustomSidebarMenu userName={userInfo ? `${selectLanguage(language).welcome} ${userInfo.user.givenName}` : "Bienvenido User"} userPhoto={userInfo ? userInfo.user.photo : "https://media-exp1.licdn.com/dms/image/C4D03AQHj0LXK6dAddA/profile-displayphoto-shrink_200_200/0/1603400414371?e=1643241600&v=beta&t=N0urNAN-gID1GjtJeZW3Dej94EjRSjvKhYQum3bQeNs"} {...props} />}>
        <drawer.Screen name={selectLanguage(language).auth_screen} component={Authentification} options={{ drawerIcon: (({ focused }) => <Icon name="home" size={30} color= "#61b97c" />), headerShown: false, swipeEnabled: false }} />
        <drawer.Screen name={selectLanguage(language).location_screen} component={WasteReport} options={{ drawerIcon: (({ focused }) => <Icon name="location-on" size={30} color= "#61b97c" />), }} />
        <drawer.Screen name={selectLanguage(language).qr_gen_screen} initialParams={{user : userInfo.email}} component={QrGenerator} options={{ headerShown : false,swipeEnabled : false,drawerIcon: (({ focused }) => <Icon name="qr-code" size={30} color= "#61b97c" />), }} />
        <drawer.Screen name="Settings" component={Settings} options={{ drawerIcon: (({ focused }) => <Icon name="settings" size={30} color="#61b97c" />), }} />
        <drawer.Screen name="Chat" component={ChatUser} options={{
          drawerItemStyle: { height: 0 }
        }} />
      </drawer.Navigator>
    )
  }
  return (
      <AppContext.Provider value={{ user: userInfo,setUser : setUserInfo, socket: socket ,language : language,setLanguage, theme, setTheme, location}}>
        {console.log("LANG",userInfo)}
        <NavigationContainer>
          <stack.Navigator
            screenOptions={{ 
              gestureEnabled: false,
              transitionSpec: {
                open: config,
                close: config
              },
              headerMode:"float"
            }}
          >
            <stack.Screen name="Admin" component={Admin} options={{ headerShown: false }} />
            <stack.Screen name="User" component={User} options={{ headerShown: false }} />
          </stack.Navigator>
        </NavigationContainer>
      </AppContext.Provider>
  )
          }
export default App;
