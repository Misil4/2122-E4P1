'use strict';
import React, { Component, useContext, useEffect, useState } from 'react'
import QRCode from 'react-native-qrcode-svg';
import { StyleSheet } from 'react-native';
import {
  View
} from 'react-native';
import AppContext from '../../context/context';
const QrGenerator = (props) => {
  const {theme} = useContext(AppContext)
  return (
    <View style={theme ? styles.darkContainer : styles.container}>
      {console.log("EL VALOR DE EL EMAIL ES")}
      {console.log(props.route.params.email)}
      <QRCode
        enableLinearGradient={true}
        linearGradient={['rgb(40,85,0)', 'rgb(123,242,16)']}
        gradientDirection
        backgroundColor="transparent"
        logo={require('../../assets/logo.jpg')}
        value={props.route.params.email}
        size={250}
      />
    </View>
  );
};
export default QrGenerator;
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor : "#F5F5F5"
  },
  darkContainer : {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: "#232322"
  }
})
