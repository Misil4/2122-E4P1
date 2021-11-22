'use strict';

import React, { Component } from 'react';
import axios from 'axios';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

export default class QrReader extends React.Component {
  constructor()
  {
    super()
    this.state = {
      email: ""
    } 
  }

  onSuccess = e => {
    this.setState({ email: e.data})
    this.updateUserStatus().then((response) => console.log(response))
  }

  updateUserStatus = async () => {
    //peticion a axios y hacer put
    await axios.put("https://ballin-api-stage.herokuapp.com/users",this.state.email)
      .then((response) => console.log(response))
      .then((error) => console.log(error))

      
    
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
            {this.state.email =this.onRead}
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
    padding: 15,
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