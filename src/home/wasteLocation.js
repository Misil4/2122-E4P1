'use strict';

//import Geolocation from 'react-native-geolocation-service';

import React, { useEffect, useState } from "react";
import { Button, StyleSheet, View, PermissionsAndroid, } from "react-native";
import MapView, { Circle, Marker, Polyline } from "react-native-maps";
import Geolocation from "react-native-geolocation-service";

const wasteLocation = (props) => {
  return (
    <View style={styles.container}>
      <MapView
        onPress={() => {}}
        style={styles.map}
        initialRegion={{
          latitude: props.route.params.latitude,
          longitude: props.route.params.longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.05,
        }}
        
        loadingEnabled
      ><Marker coordinate={{ latitude : props.route.params.latitude , longitude : props.route.params.longitude }} /></MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});

export default wasteLocation;
