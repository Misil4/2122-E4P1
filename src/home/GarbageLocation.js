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
import Icon from 'react-native-vector-icons/Entypo'
import { getAsyncStorageKey } from '../../helpers/asynctorage';
import { tokenExpired } from '../../helpers/jwt';
import { socket } from '../../App';
import { ScrollView } from 'react-native';


export default function Basic(props) {
    const [listData, setListData] = useState(
        Array()
            .fill('')
            .map((_, i) => ({}))
    );
    const [userData, setUserData] = useState({

    })
    const getData = trash => {
        //console.log(users)
        setListData(trash)
    }

    changeData = () => socket.emit("get_trash");
    const getAllGarbage = async () => {
        const token = await getAsyncStorageKey("token")
        tokenExpired()
        socket.emit("garbage_data");
        socket.on("get_trash", getData)
        setLoading(false)

    }
    useEffect(() => {
        getAllGarbage();
        socket.on("change_data", changeData);
    }, [])
    const updateStatusComplete = async (data) => {
        const token = await getAsyncStorageKey('token')
        //console.log(data.item._id)
        const list = {
            id_basura: data.item._id
        }
        tokenExpired(token)
        await axios.put("https://ballin-api-stage.herokuapp.com/garbages", list, { headers: { 'Authorization': token } })
            .then((response) => console.log(response.data))
            .then((error) => console.log(error))
    }

    const createButtonAlert = (data) =>
        Alert.alert(
            "Eliminar",
            "¿Estás seguro?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => updateStatusComplete(data) }
            ]
        );

    const renderItem = data => (
        <TouchableHighlight
            onPress={() => console.log('You touched me')}
            style={styles.rowFront}
            underlayColor={'white'}
        >
            <View style={styles.listItemContainer}>
                <View style={styles.avatarContainer}>

                </View>
                <View style={styles.chatDetailsContainer}>
                    <View style={styles.chatDetailsContainerWrap}>
                        <View style={styles.nameContainer}>
                            <Text style={styles.nameText}>{data.item.user}</Text>
                            <Text style={styles.msgText}>{data.item.message}</Text>
                        </View>
                        <View style={styles.dateContainer}>
                            <Text style={styles.dateText}>{data.item.location.timestamp.substring(0, 21)}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>

        </TouchableHighlight>
    );
    const renderHiddenItem = (data, rowMap) => (
        <View style={styles.rowBack}>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnLeft]}
                onPress={() => props.navigation.navigate('Ubicación de basuras', { latitude: data.item.location.latitude, longitude: data.item.location.longitude, id: data.item._id })}
            >
                <Icon name="location-pin" size={42} />
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnRight]}
                onPress={() => createButtonAlert(data)}
            >
                <Icon name="trash" size={32} />
            </TouchableOpacity>
        </View>
    );

    return (

        <View style={styles.container}>
            <ScrollView>
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
            </ScrollView>
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
        width: 40,
        height: 40
    }

});
