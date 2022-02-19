'use strict';

//import Geolocation from 'react-native-geolocation-service';

import React, { useContext} from "react";
import { StyleSheet, View, Alert,Text } from "react-native";
import { Button, } from "react-native-elements";
import MapView, { Marker } from "react-native-maps";
import AppContext from "../../context/context";
import { selectLanguage } from "../../languages/languages";
import { SafeAreaProvider } from "react-native-safe-area-context";


const wasteLocation = (props) => {
  const { language, socket, theme } = useContext(AppContext)
  const updateStatusComplete = async (id) => {
    socket.emit("garbage_update", id);
  }
  const createButtonAlert = (id) =>
    Alert.alert(
      selectLanguage(language).delete,
      selectLanguage(language).alert,
      [
        {
          text: selectLanguage(language).cancel,
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => { updateStatusComplete(id); props.navigation.navigate(selectLanguage(language).garbage_screen) } }
      ]
    );
  return (
    <SafeAreaProvider style={theme ? styles.darkContainer : styles.container}>
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
      ><Marker coordinate={{ latitude: props.route.params.latitude, longitude: props.route.params.longitude }} />
      </MapView>
      <View style={{
          flex: 1,
          flexDirection: 'row',
          position: 'absolute',
          alignSelf: 'center',
          bottom: 15
       }}>
        <Button buttonStyle={styles.button} title="&#8656;" titleStyle={{ fontSize: 60, bottom: 15}}
          onPress={() => props.navigation.navigate("User" ,{screen : selectLanguage(language).garbage_screen})} />
        <Button buttonStyle={styles.button} title="&#x267B;" titleStyle={{ fontSize: 40, marginBottom: 10 }}
          onPress={() => createButtonAlert(props.route.params.id)}
        />
      </View>
      {notification && focused ?  Alert.alert(message.name,message.text,[
                { text: "OK" }
            ])
            : <Text>o</Text>}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container:
    { flex: 1 },
  map: { flex: 1 },
  buttonContainer: {
    flexDirection: "row",
    marginLeft: 20,
    justifyContent: 'space-evenly',
    backgroundColor: "#F5F5F5"
  },
  darkContainer:
    { flex: 1 },
  map: { flex: 1 },
  buttonContainer: {
    flexDirection: "row",
    marginLeft: 20,
    justifyContent: 'space-evenly',
    backgroundColor: "#232322"
  },
  button:
  {
    backgroundColor: "#61b97c",
    borderRadius: 50,
    height: 95,
    width: 95,
    alignSelf: "center",
    margin: 30,
    borderTopEndRadius: 10
  },


});

export default wasteLocation;
