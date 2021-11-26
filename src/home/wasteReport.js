import axios from "axios";
import React, { useEffect, useState } from "react";
import { StyleSheet, Alert } from "react-native";
import { Button } from "react-native-elements";
import RNLocation from 'react-native-location';
import MapView,{Marker} from 'react-native-maps';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { getAsyncStorageKey } from "./authentification";

let list ={}

const Geolocation = props => {
  const [mapOn, setMapOn] = useState(false)
  const [email, setEmail] = useState(email)
  const [data, setData] = useState({
    latitude : null, longitude : null, timestamp : null
  })

useEffect(()=>{
  getAsyncStorageKey("user_email").then(response => {setEmail(response);console.log(response)})
  permissionHandle()
},[])


   const permissionHandle = async () => {
    RNLocation.configure({
    distanceFilter: 5.0,
    desiredAccuracy : {
    android : "highAccuracy"
  }
})

RNLocation.requestPermission({
  ios: "whenInUse",
  android: {
    detail: "coarse"
  }
}).then(async granted => {
    if (granted) {
      location =  await RNLocation.getLatestLocation({enableHighAccuracy: true,timeout: 100})
    setData({latitude : location.latitude,longitude : location.longitude,timestamp : location.timestamp})
    setMapOn(true)
        }
      })
    }

    const createButtonAlert = () =>
    Alert.alert(
      "Enviar",
      "¿Estás seguro?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: async() => {
          list={data: data, user: email}
          await axios.post('https://ballin-api-stage.herokuapp.com/garbages/', list)
          .then(response => console.log(response))
          .then(error => console.log(error))
        }}
      ]
    );
   return (
    <SafeAreaProvider>
        {mapOn !== false ? <MapView
          style={styles.map}
          initialRegion={{
            latitude: data.latitude,
            longitude: data.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
         }}
        ><Marker coordinate={{latitude: data.latitude,
          longitude: data.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01}} />
        </MapView> : null}
        <Button buttonStyle={{backgroundColor: "#779ecb", borderRadius: 50, height: 95, width: 95, alignSelf: "center", margin: 30, borderTopEndRadius:10}} title="&#9842;" titleStyle={{fontSize:40, marginBottom: 10}} 
        onPress={() => createButtonAlert()}>

        </Button>
    </SafeAreaProvider>
   )
}

 
const styles = StyleSheet.create({
   map: {
       flex: 1,
       margin : "auto",
       height: "auto"
   }
});
export default Geolocation;