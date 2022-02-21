import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import MapView, { Marker } from 'react-native-maps';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { getAsyncStorageKey } from "../../helpers/asynctorage";
import AppContext from "../../context/context";
import { selectLanguage } from "../../languages/languages";


const UserLocation = props => {
  const [mapOn, setMapOn] = useState(false)
  const [email, setEmail] = useState(email)
  const [data, setData] = useState({
    latitude: 0, longitude: 0, timestamp: 0
  })
  const {socket,language,theme,user,location} = useContext(AppContext)
  useEffect(() => {
    getAsyncStorageKey("user_email").then(response => { setEmail(response); console.log(response) })
  }, [])
  useEffect(() => {
      const data = {userEmail : props.route.params.user.email,adminEmail : user.email}
      socket.emit("request_location",data)
      socket.on("new_location",(location) =>{
          console.log("LOCATION DATA");
          console.log(location)
          setData(location)
          setMapOn(true)
      })
  },[])

  return (
    <SafeAreaProvider style={theme ? styles.darkContainer : styles.container}>
      {console.log("USERDATA")}
      {console.log(data)}
      {mapOn ? <MapView
        style={styles.map}
        initialRegion={{
          latitude: data?.latitude,
          longitude: data?.longitude,
          latitudeDelta: 1,
          longitudeDelta: 1,
        }}
      ><Marker coordinate={{
        latitude: data?.latitude,
        longitude: data?.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
      }} title={"User"}/>
      <Marker coordinate={{
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }} pinColor={'green'} title={"Admin"}/>
      </MapView> : console.log(false)}
      <View style={{
          flex: 1,
          flexDirection: 'row',
          position: 'absolute',
          alignSelf: 'center',
          bottom: 15
       }}>
     <Button buttonStyle={styles.button} title="&#8656;" titleStyle={{ fontSize: 60, bottom: 15}}
          onPress={() => props.navigation.navigate("Admin", {screen : selectLanguage(language).userlist_screen})} />
        <Button buttonStyle={styles.button} title="&#128172;" titleStyle={{ fontSize: 40, marginBottom: 5,marginLeft: 5  }}
          onPress={() => props.navigation.navigate("Admin", { screen: 'ChatAdmin', params: { user: props.route.params.user } })}>
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
export default  UserLocation;