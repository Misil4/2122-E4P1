import React, { Component } from "react";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/home/index'
import HomeQrReader from './src/home/qrReader'
import HomeQrGenerator from './src/home/qrGenerator'
import authentification from "./src/home/authentification";

const HomeStack = createNativeStackNavigator();

export default class App extends Component{

  render(){
    return(
      <NavigationContainer>
        <HomeStack.Navigator>
          <HomeStack.Screen name="Pantalla De Inicio" component={HomeScreen} />
          <HomeStack.Screen name="QrReader" component={HomeQrReader} />
          <HomeStack.Screen name="QrGenerator" component={HomeQrGenerator} />
          <HomeStack.Screen name="Google" component={authentification} />
        </HomeStack.Navigator>
      </NavigationContainer>
    )
  }
}