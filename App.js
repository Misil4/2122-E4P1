import React, { Component } from "react";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/home/index'
import QrGenerator from "./src/home/qrGenerator";
import QrReader from "./src/home/qrReader";
import authentification from "./src/home/authentification";

const HomeStack = createNativeStackNavigator();

export default class App extends Component{

  render(){
    return(
      <NavigationContainer>
        <HomeStack.Navigator>
          <HomeStack.Screen name="Pantalla De Inicio" component={HomeScreen} />
          <HomeStack.Screen name="QrReader" component={QrReader} />
          <HomeStack.Screen name="QrGenerator" component={QrGenerator} />
          <HomeStack.Screen name="Google" component={authentification} />
        </HomeStack.Navigator>
      </NavigationContainer>
    )
  }
}