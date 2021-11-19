'use strict';
import React, { Component } from 'react'
import QRCode from 'react-native-qrcode-svg';
import {
 View
} from 'react-native'; 
export default class QrGenerator extends Component {
 
/*getEmail = async () => {
  const userEmail = await AsyncStorage.getItem("user_email")
  return userEmail
};*/

 render() {
  
   return (
     <View style={{flex: 1, justifyContent:'center', alignItems:'center', backgroundColor:"lightgrey"}}>
       {console.log(this.props.route.params.email)}
     <QRCode
     value= {this.props.route.params.email}
     size={250}

    
 
   />
   </View>
   );
 };
}
