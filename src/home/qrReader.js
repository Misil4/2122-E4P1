'use strict';

import React, { Component, useState } from 'react';
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

const QrReader = () => {
  const [data, setData] = useState({ email: "" })

  const onSuccess = e => {
    setData({ email: e.data })
    updateUserStatus()
  }

  const updateUserStatus = async () => {
    //peticion a axios y hacer put
    const token = await getAsyncStorageKey('token')
    await axios.put("https://ballin-api-production.herokuapp.com/users", data, { headers: { 'Authorization': token } })
      .then((response) => console.log(response.data))
      .then((error) => console.log(error))
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