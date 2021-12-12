'use strict';

import React, { Component, } from 'react';
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
import { getAsyncStorageKey } from '../../helpers/asynctorage';
import { tokenExpired } from '../../helpers/jwt';
import { socket } from '../../App';
import { useStateWithPromise } from '../../hooks/useStateWithPromise';

const QrReader = () => {
  const [data, setData] = useStateWithPromise({ email: "" })

  const onSuccess = async (e) => {
    await setData({ email: e.data })
    updateUserStatus()
  }
  const badge_update = () => {
    console.log("Email en qrreader")
    console.log(data)
    // console.log(predicted_details);
    socket.emit("badge_update", data);
  };

  const updateUserStatus = () => {
    //peticion a axios y hacer put
    tokenExpired()
    badge_update()

  }

  return (
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
  );
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
export default QrReader