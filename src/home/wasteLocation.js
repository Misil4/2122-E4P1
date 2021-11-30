'use strict';

//import Geolocation from 'react-native-geolocation-service';

import React, { useEffect, useState } from "react";
import {  StyleSheet, View, PermissionsAndroid, } from "react-native";
import { Button, } from "react-native-elements";
import MapView, { Circle, Marker, Polyline } from "react-native-maps";
import Geolocation from "react-native-geolocation-service";


const wasteLocation = (props) => {
  return (
    <View style={styles.container}>
      <MapView
        onPress={() => {}}
        style={styles.map}
        region={{
          latitude: props.route.params.latitude,
          longitude: props.route.params.longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.05,
        }}
        
        loadingEnabled
      ><Marker coordinate={{ latitude : props.route.params.latitude , longitude : props.route.params.longitude }} /></MapView>
        <View style={{ flexDirection: "row" ,marginLeft: 20, justifyContent: 'space-evenly' }}>
        <Button buttonStyle={{backgroundColor: "#779ecb", borderRadius: 50, height: 95, width: 95, alignSelf: "center", margin: 30, borderTopEndRadius:10}} title="&#8630;" titleStyle={{fontSize:60, marginBottom: 0}} 
        onPress={() => props.navigation.navigate('Garbage') } />
        <Button buttonStyle={{backgroundColor: "#779ecb", borderRadius: 50, height: 95, width: 95, alignSelf: "center", margin: 30, borderTopEndRadius:10}} title="&#9842;" titleStyle={{fontSize:40, marginBottom: 10}} />  
</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});

export default wasteLocation;
