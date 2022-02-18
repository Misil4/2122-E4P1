'use strict';

import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  Alert
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { getAsyncStorageKey,setAsyncStorageKey } from '../../helpers/asynctorage';
import { tokenExpired } from '../../helpers/jwt';
import { useStateWithPromise } from '../../hooks/useStateWithPromise';
import AppContext from '../../context/context';
import Icon from "react-native-vector-icons/Ionicons";
import * as Animatable from "react-native-animatable";
import { selectLanguage } from '../../languages/languages';
import { Avatar } from 'react-native-elements';
import { useIsFocused } from '@react-navigation/native';

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;
const QrReader = () => {
  const [data, setData] = useStateWithPromise({ email: '' })
  const { socket,language } = useContext(AppContext)
  const focused = useIsFocused()
  const onSuccess = async (e) => {
    await setData({ email: e.data })
    updateUserStatus(e.data)
    socket.emit("qr_scanned",e.data)
    alert(e.data + " ha sido escaneado")
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

  const makeSlideOutTranslation = (translationType, fromValue) => {
    return {
      from: {
        [translationType]: SCREEN_WIDTH * -0.18
      },
      to: {
        [translationType]: fromValue
      }
    };
  }

  return (
    <>
      <QRCodeScanner
        reactivate={true}
        reactivateTimeout={7000}
        showMarker
        onRead={onSuccess}
        cameraStyle={{ height: SCREEN_HEIGHT }}
        customMarker={
          <View style={styles.rectangleContainer}>
            <View style={styles.topOverlay}>
            </View>

            <View style={{ flexDirection: "row" }}>
              <View style={styles.leftAndRightOverlay} />

              <View style={styles.rectangle}>
                <Icon
                  size={SCREEN_WIDTH * 0.73}
                  color={iconScanColor}

                />
                <Animatable.View
                  style={styles.scanBar}
                  direction="alternate-reverse"
                  iterationCount="infinite"
                  duration={1700}
                  easing="linear"
                  animation={makeSlideOutTranslation(
                    "translateY",
                    SCREEN_WIDTH * -0.54
                  )}
                />
              </View>

              <View style={styles.leftAndRightOverlay} />
            </View>

            <View style={styles.bottomOverlay} />
          </View>
        }
      />
    </>
  );
}

const overlayColor = "rgba(0,0,0,0.5)"; // this gives us a black color with a 50% transparency

const rectDimensions = SCREEN_WIDTH * 0.65; // this is equivalent to 255 from a 393 device width
const rectBorderWidth = SCREEN_WIDTH * 0.005; // this is equivalent to 2 from a 393 device width
const rectBorderColor = "lightblue";

const scanBarWidth = SCREEN_WIDTH * 0.46; // this is equivalent to 180 from a 393 device width
const scanBarHeight = SCREEN_WIDTH * 0.0025; //this is equivalent to 1 from a 393 device width
const scanBarColor = "#22ff00";

const iconScanColor = "blue";


const styles = {
  rectangleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent"
  },

  rectangle: {
    height: rectDimensions,
    width: rectDimensions,
    borderWidth: rectBorderWidth,
    borderColor: rectBorderColor,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent"
  },

  topOverlay: {
    flex: 1,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
    justifyContent: "center",
    alignItems: "center"
  },

  bottomOverlay: {
    flex: 1,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
    paddingBottom: SCREEN_WIDTH * 0.25
  },

  leftAndRightOverlay: {
    height: SCREEN_WIDTH * 0.65,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor
  },

  scanBar: {
    width: scanBarWidth,
    height: scanBarHeight,
    backgroundColor: scanBarColor
  }
};

export default QrReader