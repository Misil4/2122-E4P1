'use strict';

//import Geolocation from 'react-native-geolocation-service';

import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, PermissionsAndroid, Alert, } from "react-native";
import { Button, } from "react-native-elements";
import MapView, { Circle, Marker, Polyline } from "react-native-maps";
import axios from "axios";
import { getAsyncStorageKey } from "../../helpers/asynctorage";
import { tokenExpired } from '../../helpers/jwt';
import AppContext from "../../context/context";
import { selectLanguage } from "./languages/languages";



const wasteLocation = (props) => {
  const {language} = useContext(AppContext)
  const [languageArr,setLanguageArr] = useState(null)
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
  useEffect(() => {
    setLanguageArr(selectLanguage(language))
  },[])
  const createButtonAlert = (id) =>
    Alert.alert(
      languageArr.delete,
      languageArr.alert,
      [
        {
          text: languageArr.cancel,
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
      <View style={styles.buttonContainer}>
        <Button buttonStyle={styles.button} title="&#8656;" titleStyle={{ fontSize: 60, bottom: 15 }}
          onPress={() => props.navigation.navigate('Garbage')} />
        <Button buttonStyle={styles.button} title="&#9842;" titleStyle={{ fontSize: 40, marginBottom: 10 }}
          onPress={() => createButtonAlert(props.route.params.id)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  buttonContainer: {
    flexDirection: "row",
    marginLeft: 20,
    justifyContent: 'space-evenly'
  },
  button:
  {
    backgroundColor: "#779ecb",
    borderRadius: 50,
    height: 95,
    width: 95,
    alignSelf: "center",
    margin: 30,
    borderTopEndRadius: 10
  },


});

export default wasteLocation;
