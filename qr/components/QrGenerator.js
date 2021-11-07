'use strict';
 
import React, { Component } from 'react'
import QRCode from 'react-native-qrcode-generator';
 
import {
    AppRegistry,
    StyleSheet,
    View,
    TextInput,
    Text
} from 'react-native';
 
export default class QrGenerator extends Component {
  constructor()
  {
    super()
    this.state = {
      value: "Proyecto"
    } 
  }
 
  render() {
    return (
      <View style={styles.container}>
        <QRCode
          value={this.state.value}
          size={200}
          bgColor='green'
          fgColor='white'/>
      </View>
    );
  };
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
});