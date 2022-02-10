'use strict';
import React, { Component, useEffect, useState } from 'react'
import QRCode from 'react-native-qrcode-svg';
import { StyleSheet } from 'react-native';
import {
  View
} from 'react-native';
const QrGenerator = (props) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
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
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "green"
  }
})
