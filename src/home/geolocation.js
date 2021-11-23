import React from "react";
import { View,StyleSheet} from "react-native";
import RNLocation from 'react-native-location';
import MapView,{Marker} from 'react-native-maps';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ListItem, Avatar,Badge } from 'react-native-elements'
const list =
 {
   name: 'Amy Farha',
   avatar_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Koala_climbing_tree.jpg/250px-Koala_climbing_tree.jpg',
   subtitle: 'On Park'
 }
const UserTestList = () => {
 return (
   <View>
     <ListItem key={1} bottomDivider>
       <Avatar source={{uri :list.avatar_url}} />
       <Badge status="success" />
       <ListItem.Content>
         <ListItem.Title>{list.name}</ListItem.Title>
         <ListItem.Subtitle>{list.subtitle}</ListItem.Subtitle>
       </ListItem.Content>
     </ListItem>
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
    this.setState({locationData :{latitude : location.latitude,longitude : location.longitude,timestamp : location.timestamp},mapOn : true })
        }
      })
    }
componentDidMount() {
 this.permissionHandle()
}
render() {
   return (
       <SafeAreaProvider>
       <View style={{marginTop: 10, padding: 10, borderRadius: 10, width: '40%'}}>
    </View>
    <View style={{marginTop: 10, padding: 10, borderRadius: 10, width: '40%'}}>
        </View>
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
       margin : "auto",
       height: "auto"
   },
});
