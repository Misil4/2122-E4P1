

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
import{ socket }from "./socket/socket";
import { getAsyncStorageKey } from "./helpers/asynctorage";
import { selectLanguage } from "./languages/languages.js";
import { useStateWithPromise } from "./hooks/useStateWithPromise";
import ChatContext from "./context/chatContext";



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
  const [language,setLanguage] = useState("euskera")
  const [theme, setTheme] = useState("false")
  const [userInfo, setUserInfo] = useState(null)
  const [token,setToken] = useState('')
  useEffect(() => {
    SplashScreen.hide()
    getAsyncStorageKey('user_info').then(response => setUserInfo(JSON.parse(response)))
    getAsyncStorageKey('token').then(response => setToken(JSON.parse(response)))
  }, [])
  useEffect(() => {
    getLanguage().then(response => response === null ? false : setLanguage(response))
  },[language])
  useEffect(() => {
    getTheme().then(response => response === null ? false : setTheme(response) )
  },[theme])
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
          <drawer.Screen name="ChatAdmin" component={ChatAdmin} options={{
            drawerItemStyle: { height: 0 }
          }} />
          <drawer.Screen name="Ubicación de basuras" component={wasteLocation}
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
        <drawer.Screen name={selectLanguage(language).qr_gen_screen} component={QrGenerator} options={{ drawerIcon: (({ focused }) => <Icon name="qr-code" size={30} color= "#61b97c" />), }} />
        <drawer.Screen name={selectLanguage(language).location_screen} component={WasteReport} options={{ drawerIcon: (({ focused }) => <Icon name="location-on" size={30} color= "#61b97c" />), }} />
        <drawer.Screen name="Settings" component={Settings} options={{ drawerIcon: (({ focused }) => <Icon name="settings" size={30} color="#61b97c" />), }} />
        <drawer.Screen name="Chat" component={ChatUser} options={{
          drawerItemStyle: { height: 0 }
        }} />
      </drawer.Navigator>
    )
  }
  return (
      <AppContext.Provider value={{ user: userInfo,setUser : setUserInfo, socket: socket ,language : language,setLanguage, theme, setTheme,token,setToken}}>
        {console.log("LANG",language)}
        <NavigationContainer>
          <stack.Navigator
            screenOptions={{ 
              gestureEnabled: true,
              gestureDirection: "horizontal",
              transitionSpec: {
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
      </AppContext.Provider>
  )
          }
export default App;