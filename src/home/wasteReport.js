import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Alert, PermissionsAndroid } from "react-native";
import { Button } from "react-native-elements";
import MapView, { Marker } from 'react-native-maps';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Geolocation from 'react-native-geolocation-service';
import { getAsyncStorageKey } from "../../helpers/asynctorage";
import { tokenExpired } from '../../helpers/jwt';
import { socket } from "../../App";
import { NavigationContainer } from "@react-navigation/native";


let list = {}
export async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'Example App',
        'message': 'Example App access to your location '
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true
    } else {
      return false
    }
  } catch (err) {
    console.warn(err)
  }
}
const WasteReport = props => {
  const [mapOn, setMapOn] = useState(false)
  const [email, setEmail] = useState(email)
  const [data, setData] = useState({
    latitude: null, longitude: null, timestamp: null
  })
  const [userData, setUserData] = useState('')
  const getUserInfo = async () => {
    const token = await getAsyncStorageKey('token');
    const userEmail = await getAsyncStorageKey("user_email")
    await tokenExpired()
    return await axios.get("https://ballin-api-stage.herokuapp.com/users", { headers: { 'Authorization': token } })
      .then((response) => setUserData(response.data.users.filter((user) => user.email === userEmail)))
      .then((error) => console.log(error))
  }
  useEffect(() => {
    getAsyncStorageKey("user_email").then(response => { setEmail(response); console.log(response) })
    getUserInfo().then(response => {console.log("SETUSER");console.log(response)});
  },[])
  useEffect(() => {
    requestLocationPermission()
    if (requestLocationPermission()) {
      Geolocation.getCurrentPosition(
        (position) => {
          setData({ latitude: position.coords.latitude, longitude: position.coords.longitude, timestamp: position.timestamp })
          setMapOn(true)
        },
        (error) => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    }
  }, [requestLocationPermission])




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
        {
          text: "OK", onPress: async () => {
            console.log(data)
            const list = { data: data, user: email }
            socket.emit("insert_garbage", list)

          }
        }
      ]
    );
  return (
    <SafeAreaProvider>
      {console.log("USERDATA")}
      {console.log(userData)}
      {mapOn !== false ? <MapView
        style={styles.map}
        initialRegion={{
          latitude: data.latitude,
          longitude: data.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      ><Marker coordinate={{
        latitude: data.latitude,
        longitude: data.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
      }} />
      </MapView> : null}
      <View style={{ flexDirection: "row", marginLeft: 20, justifyContent: 'space-evenly' }}>
        <Button buttonStyle={{ backgroundColor: "#779ecb", borderRadius: 50, height: 95, width: 95, alignSelf: "center", margin: 30, borderTopEndRadius: 10 }} title="Basura" titleStyle={{ fontSize: 18, marginBottom: 8 }}
          onPress={() => createButtonAlert()}>
        </Button>
        <Button buttonStyle={{ backgroundColor: "#779ecb", borderRadius: 50, height: 95, width: 95, alignSelf: "center", margin: 30, borderTopEndRadius: 10, marginRight: 70 }} title="Chat" titleStyle={{ fontSize: 18, marginBottom: 8 }}
          onPress={() => props.navigation.navigate("User", { screen: 'Chat', params: { user: userData } })}>
        </Button>
      </View>
    </SafeAreaProvider>
  )
}


const styles = StyleSheet.create({
  map: {
    flex: 1,
    margin: "auto",
    height: "auto"
  }
});
export default WasteReport;