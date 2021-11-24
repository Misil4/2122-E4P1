'use strict';
 
import React from "react";
import { View,StyleSheet} from "react-native";
import RNLocation from 'react-native-location';
import MapView,{Marker} from 'react-native-maps';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ListItem, Avatar,Badge } from 'react-native-elements'
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const UserTestList = () => {
 return (
   <View>
    
    <Button style={{paddingBottom:100} }
  icon={
    
    <Icon 
      name="trash"
      size={45}
      color="white"
    />
  }
  title=""
/>

   </View>
 )
}


export default class Geolocation extends React.Component {
 constructor(props) {
   super(props);
   this.state = {
     locationData : {latitude : null,longitude : null,timestamp : null},
     mapOn : false
   }
 }
   permissionHandle = async () => {
 
     RNLocation.configure({
       distanceFilter: 5.0
      })
   
       let permission = await RNLocation.checkPermission({
         ios: 'whenInUse', // or 'always'
         android: {
           detail: 'coarse' // or 'fine'
         }
       });
   
       let location;
if(!permission) {
   permission = await RNLocation.requestPermission({
      ios: "whenInUse",
      android: {
        detail: "fine",
        rationale: {
          title: "We need to access your location",
          message: "We use your location to show where you are on the map",
          buttonPositive: "OK",
          buttonNegative: "Cancel"
        }
      }
    })
    location = await RNLocation.getLatestLocation({timeout: 100})
    this.setState({locationData :{latitude : location.latitude,longitude : location.longitude,timestamp : location.timestamp},mapOn : true })
       }   else {
   location = await RNLocation.getLatestLocation({timeout: 100})
   this.setState({locationData :{latitude : location.latitude,longitude : location.longitude,timestamp : location.timestamp},mapOn : true })
   }
}
componentDidMount() {
 this.permissionHandle()
}
render() {
   return (
       <SafeAreaProvider>
        {this.state.mapOn !== false ? <MapView
               style={styles.map}
               initialRegion={{
                   latitude: this.state.locationData.latitude,
                   longitude: this.state.locationData.longitude,
                   latitudeDelta: 0.01,
                   longitudeDelta: 0.01,
               }}
           ><Marker coordinate={{latitude: this.state.locationData.latitude,
               longitude: this.state.locationData.longitude,
               latitudeDelta: 0.01,
               longitudeDelta: 0.01}} />
               </MapView> : null}
               <UserTestList  />
               </SafeAreaProvider>
   )
           }
}
 
const styles = StyleSheet.create({
   map: {
       flex: 1,
       margin : 0,
       height: 500
   },
});

