'use strict';

import React, { Component } from 'react';
import { View,StyleSheet} from "react-native";
import RNLocation from 'react-native-location';
import MapView,{Marker} from 'react-native-maps';
import { SafeAreaProvider } from 'react-native-safe-area-context';




export default class WasteReport extends Component {
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
                  <Button
                    onPress={onPressLearnMore}
                    title="Learn More"
                    color="#841584"
                    accessibilityLabel="Denunciar residuos"
                    />
                  </SafeAreaProvider>
      )
              }
   }
    
   const styles = StyleSheet.create({
      map: {
          flex: 1,
          margin : 100,
          height: 500
      },
   });
   