import React,{useState} from "react";
import { View,Button,Text,StyleSheet,Dimensions } from "react-native";
import RNLocation from 'react-native-location';
import MapView,{Marker} from 'react-native-maps';


const geolocation = () => {
    const [locationData,setLocationData] = useState({latitude : null,longitude : null,timestamp : null});
    const [mapOn,setMapOn] =useState(false);
    RNLocation.configure({
        distanceFilter: 5.0
       })
    const permissionHandle = async () => {

     
     
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
     setLocationData({latitude : location.latitude,longitude : location.longitude,timestamp : location.timestamp});
     setMapOn(true);
        }   else {
    location = await RNLocation.getLatestLocation({timeout: 100})
                setLocationData({latitude : location.latitude,longitude : location.longitude,timestamp : location.timestamp});
                setMapOn(true);
    }
}
    return (
        <>
        <View style={{marginTop: 10, padding: 10, borderRadius: 10, width: '40%'}}>
        <Button title="Get Location"
   onPress={permissionHandle}
 />
     </View>
     <Text>Latitude: </Text>
     <Text>Longitude: </Text>
     <View style={{marginTop: 10, padding: 10, borderRadius: 10, width: '40%'}}>
       <Button
         title="Send Location"
        />
         </View>
         {mapOn !== false ? <MapView
                style={styles.map}
                initialRegion={{
                    latitude: locationData.latitude,
                    longitude: locationData.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
            ><Marker coordinate={{latitude: locationData.latitude,
                longitude: locationData.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01}} />
                </MapView> : null}
         </>
    )
}

const styles = StyleSheet.create({
    map: {
        flex: 1,
        margin : 100,
        height: 400
    },
});
export default geolocation;