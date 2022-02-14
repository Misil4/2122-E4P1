'use strict';

import React, { Component, useContext, } from 'react';
import axios from 'axios';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  View
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { getAsyncStorageKey } from '../../helpers/asynctorage';
import { tokenExpired } from '../../helpers/jwt';
import { useStateWithPromise } from '../../hooks/useStateWithPromise';
import AppContext from '../../context/context';

const QrReader = () => {
const {socket,theme} = useContext(AppContext)
const [data,setData] = useStateWithPromise({email : ''})
  const onSuccess = async (e) => {
    await setData({ email: e.data })
    
   updateUserStatus(e.data)
  }
  const badge_update = (email) => {
    console.log("BADGE UPDATE DATA")
    console.log(email)
    // console.log(predicted_details);
    socket.emit("badge_update", email);
  };

  const updateUserStatus = async (email) => {
    //peticion a axios y hacer put
    console.log(email)
    tokenExpired()
    badge_update(email)
    
    }

  return (
    <View style={theme ? styles.darkContainer : styles.container}>
    <QRCodeScanner
      reactivate={true}
      reactivateTimeout={7000}
      showMarker
      onRead={onSuccess}
      topContent={
        <Text style={styles.centerText}>
          {data.email}
        </Text>
      }
      bottomContent={

        <TouchableOpacity style={styles.buttonTouchable}>
          <Text style={styles.buttonText}></Text>
        </TouchableOpacity>
      }
    />
    </View>
  );
}

const styles = StyleSheet.create({
  container : {
    backgroundColor : "white"
  },
  darkContainer : {
    backgroundColor : "black"
  },
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
export default QrReader