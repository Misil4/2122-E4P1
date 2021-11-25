import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    View,
    Image,
    Alert,
} from 'react-native';

import { SwipeListView } from 'react-native-swipe-list-view';
import axios from 'axios';



export default function Basic() {
    const locationImg ={uri:'https://www.gauss-friends.org/wp-content/uploads/2020/04/location-pin-connectsafely-37.png'};
    const trashImg ={uri:'https://img.myloview.es/posters/trash-bin-or-trash-can-symbol-icon-or-logo-700-156325989.jpg'};
    const chatImg ={uri:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Circle-icons-chat.svg/512px-Circle-icons-chat.svg.png'};
    const [listData, setListData] = useState(
        Array(2)
            .fill('')
            .map((_, i) => ({ key: `${i}`, text: `item #${i}` }))
    );

    useEffect(() => {
        getAllGarbage();
      }, [])

    const getAllGarbage = () => {
        axios.get('https://ballin-api-stage.herokuapp.com/garbages')
        .then((response) => {
            const allGarbages = response.data.garbages
            setListData(allGarbages)
        }
        )}
        

    const deleteRow = (rowKey) => { // Para eliminar una linea al pulsar el boton delete 
        const newData = [...listData]; //Destructuring
        const prevIndex = listData.findIndex(item => item.key === rowKey);
        newData.splice(prevIndex, 1);
        setListData(newData);
        
    };

    const createButtonAlert = () =>
    Alert.alert(
      "Alert Title",
      "My Alert Msg",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => deleteRow()}
      ]
    );

    const renderItem = data => (
        <TouchableHighlight
            onPress={() => console.log('You touched me')}
            style={styles.rowFront}
            underlayColor={'white'}
        >
            <View style = {styles.listItemContainer}>
             <View style = {styles.avatarContainer}>
             {console.log(data.item)}
             </View>
             <View style = {styles.chatDetailsContainer}>
               <View style = {styles.chatDetailsContainerWrap}>
                <View style = {styles.nameContainer}>
                 <Text style = {styles.nameText}>{data.item.user}</Text>
                 <Text style={styles.msgText}>A 1 km de distancia</Text>
                </View>
                <View style = {styles.dateContainer}>
                  <Text style = {styles.dateText}>13/11/2021 14:02
                  </Text>
                </View>
             </View>
              </View>
            </View> 

        </TouchableHighlight>
    );
    const renderHiddenItem = (data, rowMap) => (
        <View style={styles.rowBack}>
            <Image style={styles.avatar}
                source={chatImg}
                />
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnLeft]}
                //onPress={() => closeRow(rowMap, data.item.key)}
            >
                <Image style={styles.avatar}
                source={locationImg}
                />
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnRight]}
                onPress={() => createButtonAlert()}
            >
                <Image style={styles.avatar}
                source={trashImg}
                />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <SwipeListView
                data={listData}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                rightOpenValue={-150}
                leftOpenValue={75}
                previewRowKey={'0'}
                previewOpenValue={-40}
                previewOpenDelay={3000}
                
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    backTextWhite: {
        color: 'white',
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: 'white', //Color de fondo 
        borderBottomColor: 'black',
        borderBottomWidth: 0.5,
        justifyContent: 'center',
        height: 70,
        
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: 'lightblue',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,

    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
        
    },
    backRightBtnLeft: {
        right: 75,
    },
    backRightBtnRight: {
        right: 0,
    },
    listItemContainer: { /*Hemendik hasita*/ 
        flex: 1,
        flexDirection: "row",
        padding: 1
    },
    avatarContainer: {
        flex: 1,
        alignItems: "flex-start"
    },
    chatDetailsContainer: {
        flex: 15,
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