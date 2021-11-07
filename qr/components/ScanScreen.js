'use strict';

import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

export default class ScanScreen extends React.Component {
  constructor()
  {
    super()
    this.state = {
      qr: ""
    } 
  }

  onSuccess = e => {
    this.setState({ qr: e.data})
    console.log(e)
  }



  render() {
    return (
      <QRCodeScanner
        reactivate={true}
        reactivateTimeout={3000}
        showMarker
        onRead={this.onSuccess}
        topContent={
          <Text style={styles.centerText}>
            {this.state.qr}
          </Text>
        }
        bottomContent={
          
          <TouchableOpacity style={styles.buttonTouchable}>
            <Text style={styles.buttonText}></Text>
          </TouchableOpacity>
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  }
});

AppRegistry.registerComponent('default', () => ScanScreen);

