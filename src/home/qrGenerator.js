'use strict';
 
import React, { Component } from 'react'
import QRCode from 'react-native-qrcode-svg';
import {
  View
} from 'react-native';
 
export default class QrGenerator extends Component {

  render() {
    return (
      <View style={{flex: 1, justifyContent:'center', alignItems:'center', backgroundColor:"lightgrey"}}>
      <QRCode 
      value="Osakidetza bai"
      size={250}
      color="green"
      enableLinearGradient={true}
      linearGradient={['rgb(40,85,0)','rgb(123,242,16)']}
      gradientDirection
      backgroundColor="transparent"

    />
    </View>
    );
  };
}
