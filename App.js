import React, { Component } from "react";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/home/index'
import HomeQR from './src/home/qr'
import authentification from "./src/home/authentification";

const HomeStack = createNativeStackNavigator();

export default class App extends Component{

  render(){
    return(
      <NavigationContainer>
        <HomeStack.Navigator>
          <HomeStack.Screen name="Pantalla De Inicio" component={HomeScreen} />
          <HomeStack.Screen name="QR" component={HomeQR} />
          <HomeStack.Screen name="Google" component={authentification} />
        </HomeStack.Navigator>
      </NavigationContainer>
    )
  }
}