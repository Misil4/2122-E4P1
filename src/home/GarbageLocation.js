import React, { useState, useEffect, useContext } from 'react';
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
import { ScrollView } from 'react-native';
import AppContext from '../../context/context';
import { selectLanguage } from './languages/languages';


export default function Basic(props) {
    const [listData, setListData] = useState(
        Array()
            .fill('')
            .map((_, i) => ({}))
    );
    const [userData, setUserData] = useState({
    })
    const { socket,language } = useContext(AppContext)
    const [languageArr] = useState(selectLanguage(language))

    const getData = trash => {
        setListData(trash)
    }
    const getUpdate = trash => {
        setUserListData(users)
    }
    const getAllGarbage = async () => {
        await tokenExpired()
        socket.emit("garbage_data");
        socket.on("get_trash", getData)

    }
    const DeleteGarbages = (id) => {
        socket.emit("garbage_update", id);
    };
    const UpdateGarbages = async () => {
        await tokenExpired()
        socket.on("change_trash", getUpdate)
    }

    useEffect(() => {
        getAllGarbage();
        return () => socket.off("get_trash", getData);
    }, []);
    useEffect(() => {
        UpdateGarbages();
        return () => socket.off("change_trash", getUpdate);
    })

    const createButtonAlert = (data) =>
        Alert.alert(
            languageArr.delete,
            languageArr.alert,
            [
                {
                    text: languageArr.cancel,
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => DeleteGarbages(data.item._id) }
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
                            <Text style={styles.dateText}>{/*data.item.location.timestamp.substring(0, 21)*/}
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
        borderWidth: 2,
        borderColor: "green",
        justifyContent: "center",
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
