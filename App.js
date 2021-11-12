'use strict';

import React, { Component } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './src/home/index'
import QrReader from "./src/home/qrReader";
import QrGenerator from "./src/home/qrGenerator";
import Authentification from "./src/home/authentification";
import SplashScreen from 'react-native-splash-screen'

const drawer = createDrawerNavigator();


export default class App extends Component{

  componentDidMount() {
      SplashScreen.hide();
  }

  render(){
    return(

      <NavigationContainer>
        <drawer.Navigator>
          <drawer.Screen name="Log Out" component={Authentification} options={{ headerShown: false , swipeEnabled: false}}/>
          <drawer.Screen name="Inicio" component={HomeScreen} />
          <drawer.Screen name="QrReader" component={QrReader} />
          <drawer.Screen name="QrGenerator" component={QrGenerator} />
        </drawer.Navigator>
      </NavigationContainer>
    )
  }
}