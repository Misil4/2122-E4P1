import React, { useState, useEffect, useContext } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    View,
    Alert,
} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Entypo'
import { getAsyncStorageKey,setAsyncStorageKey } from '../../helpers/asynctorage';
import { tokenExpired } from '../../helpers/jwt';
import AppContext from '../../context/context';
import { selectLanguage } from '../../languages/languages';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';


export default function Basic(props) {
    const [listData, setListData] = useState(
        Array()
            .fill('')
            .map((_, i) => ({}))
    );
    const { socket, language, theme } = useContext(AppContext)

    const getUpdate = trash => {
        setListData(trash)
    }
    const getAllGarbage = async () => {
        const token = await getAsyncStorageKey('token')
        await tokenExpired(token)
        return axios.get("https://ballin-api-stage.herokuapp.com/garbages", { headers: { 'Authorization': token } })
            .then(response => setListData(response.data.garbages))
            .catch(error => console.error(error))
    }
    const DeleteGarbages = (id) => {
        socket.emit("garbage_update", id);
    };
    const UpdateGarbages = async () => {
        socket.on("change_trash", getUpdate)
    }
    const UpdateMessage = async (message) => {
        console.log(message)
        const saved_messages = await getAsyncStorageKey("messages");
        let messageArr = JSON.parse(saved_messages)
        if (!messageArr) {
            messageArr = []
        }
        messageArr.push(message.message)
        setAsyncStorageKey("messages", JSON.stringify(messageArr)).then(() => { setNotification(true);setMessage(message);setTimeout(() => setNotification(false), 5000) })
    }
    useEffect(() => {
        getAllGarbage();
    }, []);
    useEffect(() => {
        UpdateGarbages()
        return () => socket.off("change_data", getUpdate)
<<<<<<< HEAD
    },[socket])
=======
    }, [socket])
    useEffect(() => {
        socket.on("notifications", UpdateMessage)
    }, [socket])
>>>>>>> a8261532822140aba1818ce279a5db7f58e4b7ad
    const createButtonAlert = (data) =>
        Alert.alert(
            selectLanguage(language).delete,
            selectLanguage(language).alert,
            [
                {
                    text: selectLanguage(language).cancel,
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
            underlayColor={"#F5F5F5"}
        >
            <View style={theme ? styles.darkListItemContainer : styles.listItemContainer}>
                <View style={styles.avatarContainer}>

                </View>
                <View style={styles.chatDetailsContainer}>
                    <View style={styles.chatDetailsContainerWrap}>
                        <View style={styles.nameContainer}>
                            <Text style={theme ? styles.darkNameText : styles.nameText}>{data.item.user}</Text>
                            <Text style={styles.msgText}>{data.item.message}</Text>
                        </View>
                        <View style={styles.dateContainer}>
                            <Text style={theme ? styles.darkDateText : styles.dateText}>{data.item.location.timestamp.substring(0, 21)}
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
                <Icon name="location-pin" size={42} style={{ color: '#F5F5F5' }} />
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnRight]}
                onPress={() => createButtonAlert(data)}
            >
                <Icon name="trash" size={32} style={{ color: '#F5F5F5' }} />
            </TouchableOpacity>
        </View>
    );

    return (

        <SafeAreaProvider style={theme ? styles.darkContainer : styles.container}>
            <SwipeListView
                data={listData}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                rightOpenValue={-150}
                previewRowKey={'0'}
                previewOpenValue={-40}
                previewOpenDelay={3000}
            />
           {notification && focused ?  Alert.alert(message.name,message.text,[
                { text: "OK" }
            ])
            : <Text>o</Text>}
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 0,
        justifyContent: "center",
        backgroundColor: "#F5F5F5",
    },
    darkContainer: {
        borderWidth: 0,
        justifyContent: "center",
        backgroundColor: "#232322",
    },
    backTextWhite: {
        color: "#F5F5F5",
        fontFamily: "Gotham"
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: "#F5F5F5", //Color de fondo 
        borderBottomColor: "#232322",
        borderBottomWidth: 0.5,
        justifyContent: 'center',
        height: 70,

    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#61b97c',
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
        padding: 1,
    },
    darkListItemContainer: { /*Hemendik hasita*/
        flex: 1,
        flexDirection: "row",
        padding: 1,
        backgroundColor: "#232322"
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
        color: "#000",
        fontFamily: 'Gotham-BookItalic',
    },
    darkNameText: {
        color: "#F5F5F5",
        fontFamily: 'Gotham-BookItalic',
    },
    dateText: {
        fontSize: 12,
        fontFamily: 'Gotham-BookItalic',
    },
    darkDateText: {
        fontSize: 12,
        color: "#F5F5F5",
        fontFamily: 'Gotham-BookItalic',
    },
    avatar: {
        borderRadius: 30,
        width: 40,
        height: 40
    }

});
