'use strict';

//import Geolocation from 'react-native-geolocation-service';

import React, { useEffect, useState } from "react";
import { StyleSheet, View, PermissionsAndroid, Alert, } from "react-native";
import { Button, } from "react-native-elements";
import MapView, { Circle, Marker, Polyline } from "react-native-maps";
import axios from "axios";
import { getAsyncStorageKey } from "../../helpers/asynctorage";
import { tokenExpired } from '../../helpers/jwt';



const wasteLocation = (props) => {
  const updateStatusComplete = async (id) => {
    //console.log(data.item._id)
    const token = await getAsyncStorageKey('token')
    const list = {
      id_basura: id
    }
    tokenExpired(token)
    await axios.put("https://ballin-api-stage.herokuapp.com/garbages", list, { headers: { 'Authorization': token } })
      .then((response) => console.log(response.data))
      .then((error) => console.log(error))
  }

  const createButtonAlert = (id) =>
    Alert.alert(
      "Eliminar",
      "¿Estás seguro?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => { updateStatusComplete(id); props.navigation.navigate('Garbage') } }
      ]
    );
  return (
    <View style={styles.container}>
      <MapView
        onPress={() => { }}
        style={styles.map}
        region={{
          latitude: props.route.params.latitude,
          longitude: props.route.params.longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.05,
        }}

        loadingEnabled
      ><Marker coordinate={{ latitude: props.route.params.latitude, longitude: props.route.params.longitude }} /></MapView>
      <View style={{ flexDirection: "row", marginLeft: 20, justifyContent: 'space-evenly' }}>
        <Button buttonStyle={{ backgroundColor: "#779ecb", borderRadius: 50, height: 95, width: 95, alignSelf: "center", margin: 30, borderTopEndRadius: 10 }} title="&#8656;" titleStyle={{ fontSize: 60, bottom: 15 }}
          onPress={() => props.navigation.navigate('Garbage')} />
        <Button buttonStyle={{ backgroundColor: "#779ecb", borderRadius: 50, height: 95, width: 95, alignSelf: "center", margin: 30, borderTopEndRadius: 10 }} title="&#9842;" titleStyle={{ fontSize: 40, marginBottom: 10 }}
          onPress={() => createButtonAlert(props.route.params.id)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});

export default wasteLocation;
