'use strict';

import React, { Component } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/home/index'
import QrReader from "./src/home/qrReader";
import QrGenerator from "./src/home/qrGenerator";
import Authentification from "./src/home/authentification";
import SplashScreen from 'react-native-splash-screen'

const stack = createNativeStackNavigator();
const drawer = createDrawerNavigator();
const tab = createBottomTabNavigator();

export default class App extends Component{

  componentDidMount() {
      SplashScreen.hide();
  }

  render(){
    return(

      <NavigationContainer>
        <drawer.Navigator>
          <drawer.Screen name="Log In" component={Authentification} options={{ headerShown: false , swipeEnabled: false}}/>
          <drawer.Screen name="PantallaDeInicio" component={HomeScreen} />
          <drawer.Screen name="QrReader" component={QrReader} />
          <drawer.Screen name="QrGenerator" component={QrGenerator} />
        </drawer.Navigator>
      </NavigationContainer>
    )
  }
}