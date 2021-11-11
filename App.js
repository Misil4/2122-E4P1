'use strict';

import React, { Component } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/home/index'
import QrReader from "./src/home/qrReader";
import QrGenerator from "./src/home/qrGenerator";
import Authentification from "./src/home/authentification";
import SplashScreen from 'react-native-splash-screen'
import geolocation from "./src/home/geolocation";

const HomeStack = createNativeStackNavigator();

export default class App extends Component{

  componentDidMount() {
      SplashScreen.hide();
  }

  render(){
    return(

      <NavigationContainer>
        <HomeStack.Navigator>
          <HomeStack.Screen name="Log In" component={Authentification} />
          <HomeStack.Screen name="PantallaDeInicio" component={HomeScreen} />
          <HomeStack.Screen name="QrReader" component={QrReader} />
          <HomeStack.Screen name="QrGenerator" component={QrGenerator} />
          <HomeStack.Screen name="Geo" component={geolocation} />
        </HomeStack.Navigator>
      </NavigationContainer>
    )
  }
}