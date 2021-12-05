'use strict';
import React, { Component, useEffect, useState } from 'react'
import QRCode from 'react-native-qrcode-svg';
import {
  View
} from 'react-native';
import { getAsyncStorageKey } from '../../helpers/asynctorage';
const QrGenerator = (props) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "white" }}>
      {console.log("EL VALOR DE EL EMAIL ES")}
      {console.log(props.route.params.email)}
      <QRCode
        value={props.route.params.email}
        size={250}



      />
    </View>
  );
};
export default QrGenerator;
