import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Button } from "react-native";

import ToggleSwitch from "toggle-switch-react-native";
import RNPickerSelect from 'react-native-picker-select';

 
 
export default class Settings extends Component {
   state = {
     isOnDefaultToggleSwitch: true,
     isOnLargeToggleSwitch: false,
     isOnBlueToggleSwitch: false
   };
 
   onToggle(isOn) {
     console.log("Changed to " + isOn);
   }
 
   render() {
    const placeholder = {
      label: 'Selecciona tu idioma',
      value: null,
  };
     return (
       <View style={styles.container}>
         <Text style={styles.instructions}>Dark Mode</Text>
         <ToggleSwitch
           label=""
           size="large"
           onColor="black"
           isOn={this.state.isOnBlueToggleSwitch}
           onToggle={isOnBlueToggleSwitch => {
             this.setState({ isOnBlueToggleSwitch });
             this.onToggle(isOnBlueToggleSwitch);
           }}
         />
         
         <RNPickerSelect
            onValueChange={(value) => console.log(value)}
            placeholder={placeholder}
            items={[
                { label: 'Euskera', value: 'euskera' },
                { label: 'Castellano', value: 'castellano' },
                { label: 'Inglés', value: 'ingles' },
            ]}
        />
       </View>
     );
   }
 }
 
 const styles = StyleSheet.create({
   container: {
     flex: 1,
     justifyContent: "center",
     alignItems: "center",
     backgroundColor: "white"
   },
   instructions: {
     textAlign: "center",
     color: "#333333",
     marginBottom: 5
   }
 });