'use strict';

import React, {useContext,useState } from 'react';
import axios from 'axios';

import {
  StyleSheet,
  View,
  Dimensions
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { getAsyncStorageKey } from '../../helpers/asynctorage';
import { tokenExpired } from '../../helpers/jwt';
import { useStateWithPromise } from '../../hooks/useStateWithPromise';
import AppContext from '../../context/context';
import { UpdateMessages } from '../../helpers/socket';
const QrReader = () => {
const [data,setData] = useStateWithPromise({email : ''})
const [notification,setNotification] = useState(false)
const {socket} = useContext(AppContext)
useEffect(() => {
  UpdateMessages(socket,setNotification)
},[socket])
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
    const token = await getAsyncStorageKey('token')
    tokenExpired(token)
    badge_update(email)
    
    }

  return (
    <>
    <QRCodeScanner
      reactivate={true}
      reactivateTimeout={7000}
      showMarker
      onRead={onSuccess}
      cameraStyle={styles.cameraContainer}
      topContent={
        <View style={styles.centerText}>
          
        </View>
      }
    />
    {notification ? <Text>NUEVO MENSAJE</Text>: <Text>i</Text>}
    </>
  );
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
    fontFamily : "Gotham"
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
  },
  cameraContainer: {
    height: Dimensions.get('window').height,
  },


});
export default QrReader