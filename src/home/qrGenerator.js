'use strict';
import React, { Component, useContext, useEffect, useState } from 'react'
import QRCode from 'react-native-qrcode-svg';
import { StyleSheet, Text } from 'react-native';
import {
  View
} from 'react-native';
import AppContext from '../../context/context';
import { selectLanguage } from '../../languages/languages';
import { BackHandler } from 'react-native';
const QrGenerator = (props) => {
  const [scanned,setScanned] = useState(false)
  const { theme, language,socket,user } = useContext(AppContext)
  const backButtonClick = () => {
     if (props.navigation && props.navigation.goBack) {
      if (user.login_status) {
        props.navigation.navigate("User" ,{screen : selectLanguage(language).qr_gen_screen,params: { email: user_email } })
        }
        props.navigation.navigate("User" ,{screen : selectLanguage(language).location_screen })
     }
  }
  useEffect(() => {
    console.log("EXECUTED")
    socket.on("scanned", (value) => {
      setScanned(value)
      console.log("SCANNED")
      props.navigation.navigate("User", { screen: selectLanguage(language).location_screen })
    })
  }, [scanned])
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backButtonClick)
  },[])
  return (
    <View style={theme ? styles.darkContainer : styles.container}>
      {console.log("EMAIL")}
      {console.log(props.route.params)}
      <Text style={theme ? styles.darkText : styles.text}>{selectLanguage(language).qr_scan}</Text>
      <QRCode
        color='#61b97c'
        backgroundColor="transparent"
        logo={require('../../assets/logo.jpg')}
        value={props.route.params.email}
        size={250}
      />
    </View>
  );
};
export default QrGenerator;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#F5F5F5"
  },
  darkContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#232322"
  },
  text: {
    color: "#232322",
    fontFamily: "Gotham-Bold",
    fontSize: 25
  },
  darkText: {
    color: "#F5F5F5",
    fontFamily: "Gotham-Bold",
    fontSize: 25
  }
})
