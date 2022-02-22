import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Alert, PermissionsAndroid,Text } from "react-native";
import { Button } from "react-native-elements";
import LinearGradient from 'react-native-linear-gradient';
import MapView, { Marker } from 'react-native-maps';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Geolocation from 'react-native-geolocation-service';
import { getAsyncStorageKey } from "../../helpers/asynctorage";
import { tokenExpired } from '../../helpers/jwt';
import { NavigationContainer } from "@react-navigation/native";
import AppContext from "../../context/context";
import { selectLanguage } from "../../languages/languages";


const WasteReport = props => {
  const [mapOn, setMapOn] = useState(false)
  const [email, setEmail] = useState(email)
  const [permission, setPermission] = useState(false);
  const [data, setData] = useState({
    latitude: 0, longitude: 0, timestamp: 0
  })
  const [userData, setUserData] = useState('')
  const {socket,language,theme,location} = useContext(AppContext)
  async function requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'Example App',
          'message': 'Example App access to your location '
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setPermission(true)
      } else {
        return false
      }
    } catch (err) {
      console.warn(err)
    }
  }
  const getUserInfo = async () => {
    const userEmail = await getAsyncStorageKey("user_email")
    const token = await getAsyncStorageKey('token')
    await tokenExpired(token)
    return await axios.get("https://ballin-api-stage.herokuapp.com/users", { headers: { 'Authorization': token } })
      .then((response) => setUserData(response.data.users.filter((user) => user.email === userEmail)))
      .then((error) => console.log(error))
  }
  useEffect(() => {
    getAsyncStorageKey("user_email").then(response => { setEmail(response); console.log(response) })
    getUserInfo().then(response => { console.log("SETUSER"); console.log(response) });
  }, [])
  useEffect(() => {
    requestLocationPermission()
    if (permission) {
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
  }, [permission])
  useEffect(() => {
    socket.on("user_location", (email) => {
        socket.emit("send_location",{adminEmail : email,location : location})
    })
  },[])




  const createButtonAlert = () =>
    Alert.alert(
      selectLanguage(language).send,
      selectLanguage(language).alert,
      [
        {
          text: selectLanguage(language).cancel,
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "OK", onPress: async () => {
            console.log(data)
            const list = { data: data, user: email }
            socket.emit("insert_garbage", list)
            Alert.alert(selectLanguage(language).sended)

          }
        }
      ]
    );
  return (
    <SafeAreaProvider style={theme ? styles.darkContainer : styles.container}>
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
      <View style={{
          flex: 1,
          flexDirection: 'row',
          position: 'absolute',
          alignSelf: 'center',
          bottom: 15
       }}>
      <Button buttonStyle={styles.button} title="&#x267B;" titleStyle={{ fontSize: 40, marginBottom: 8}}
        onPress={() => createButtonAlert()} />
        <Button buttonStyle={styles.button} title="&#128172;" titleStyle={{ fontSize: 40, marginBottom: 5,marginLeft: 5  }}
          onPress={() => props.navigation.navigate("User", { screen: 'Chat', params: { user: userData } })}>
        </Button>
      </View>
    </SafeAreaProvider>
  )
}


const styles = StyleSheet.create({
  container : {
    backgroundColor : "#F5F5F5"
  },
  darkContainer : {
    backgroundColor : "#232322"
  },
  map: {
    flex: 1,
    margin: "auto",
    height: "auto"
  },
  buttonContainer: {
    flexDirection: "row",
    marginLeft: 20,
    justifyContent: 'space-evenly'
  },
  button: {
    backgroundColor: "#61b97c", 
    borderRadius: 50, 
    height: 95, 
    width: 95, 
    alignSelf: "center", 
    margin: 30, 
    borderTopEndRadius: 10 
  }
});
export default WasteReport;