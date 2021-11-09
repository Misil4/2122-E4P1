'use strict';
 
import React, { Component } from 'react'
import QRCode from 'react-native-qrcode-svg';
import {
  View
} from 'react-native';
 
export default class QrGenerator extends Component {

  render() {
    return (
      <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
      <QRCode 
      value="Osakidetza bai"
      size={250}
      color="green"
    />
    </View>
    );
  };
}