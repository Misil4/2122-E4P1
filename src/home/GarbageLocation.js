import React, {Component} from "react";
import { StyleSheet, View, Image, Text } from "react-native";



export default class GarbageLocation extends Component {
    render() {
        let image ={uri:'https://www.gauss-friends.org/wp-content/uploads/2020/04/location-pin-connectsafely-37.png'};

        return (
            <View style = {styles.listItemContainer}>
             <View style = {styles.avatarContainer}>
                <Image style={styles.avatar}
                source={image}
                />
             </View>
             <View style = {styles.chatDetailsContainer}>
               <View style = {styles.chatDetailsContainerWrap}>
                <View style = {styles.nameContainer}>
                 <Text style = {styles.nameText}>A 1 km de tu ubicación</Text>
                 <Text style={styles.msgText}>GCS: 41.40338; 2.17403</Text>
                </View>
                <View style = {styles.dateContainer}>
                  <Text style = {styles.dateText}>13/11/2021 14:02
                  </Text>
                </View>
             </View>
              </View>

              
            </View> 
        );
    }
}


const styles = StyleSheet.create({
    listItemContainer: {
        flex: 1,
        flexDirection: "row",
        padding: 10
    },
    avatarContainer: {
        flex: 1,
        alignItems: "flex-start"
    },
    chatDetailsContainer: {
        flex: 5,
        borderBottomColor: "rgba(92,94,94,0.5)",
        borderBottomWidth: 0.25
    },
    chatDetailsContainerWrap: {
        flex: 1,
        flexDirection: "row",
        padding: 5
    },
    nameContainer: {
        alignItems: "flex-start",
        flex: 1
    },
    msgContainer: {
        flex: 1
    },
    nameText: {
        fontWeight: "bold",
        color: "#000"
    },
    dateText: {
        fontSize: 12
    },
    avatar: {
        borderRadius: 30,
        width: 60,
        height: 60
    }
});