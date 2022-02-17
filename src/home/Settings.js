import React, { useContext, useState, useEffect } from "react";
import { Platform, StyleSheet, Text, View,Alert} from "react-native";

import ToggleSwitch from "toggle-switch-react-native";
import RNPickerSelect from 'react-native-picker-select';
import AppContext from "../../context/context";
import { selectLanguage } from "../../languages/languages";
import { setAsyncStorageKey,getAsyncStorageKey } from "../../helpers/asynctorage";
import { Switch } from 'react-native-paper';
import { Avatar } from "react-native-elements";
import { useIsFocused } from "@react-navigation/native";
const Settings = (props) => {

  const { setLanguage, language, setTheme, theme,socket } = useContext(AppContext)
  const [message,setMessage] = useState("i")
  const [notification,setNotification] = useState(false)
  const focused = useIsFocused()

  const placeholder = {
    label: selectLanguage(language).select_language,
    value: null,
  };
  useEffect (() => {
    props.navigation.setOptions({title : selectLanguage(language).settings_screen})
  },[])
  useEffect(() => {
    socket.on("notifications", UpdateMessage)
}, [socket])
const UpdateMessage = async (message) => {
  const saved_messages = await getAsyncStorageKey("messages");
  let messageArr = JSON.parse(saved_messages)
  if (!messageArr) {
      messageArr = []
  }
  messageArr.push(message.message)
  setAsyncStorageKey("messages", JSON.stringify(messageArr)).then(() => { setNotification(true);setMessage(message); setTimeout(() => setNotification(false), 5000) })
}
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor : theme ? "#232322" : "#F5F5F5",
      justifyContent: "center",
      alignItems: "center",
      fontFamily : "Gotham-BookItalic"
    },
    instructions: {
      textAlign: "center",
      color: theme ? "#F5F5F5": "#232322",
      marginBottom: 5,
      fontFamily : "Gotham-BookItalic"
    }
  });
  return (
    <View style={styles.container}>
      <Text style={styles.instructions}>Dark Mode</Text>
      

      <Switch 
      value={theme} 
      onValueChange={value => {
        setAsyncStorageKey("theme", JSON.stringify(value))
        setTheme(value)
        console.log(value)}
        }/>

      <RNPickerSelect
        onValueChange={(value) => { setLanguage(value); setAsyncStorageKey("language", value) }}
        placeholder={placeholder}
        style={defaultStyles}
        items={[
          { label: 'Euskera', value: 'euskera' },
          { label: 'Castellano', value: 'castellano' },
          { label: 'Inglés', value: 'ingles' },
        ]}
      />
      {notification && focused ?  Alert.alert(message.name,message.text,[
                { text: "OK" }
            ])
            : <Text>o</Text>}
    </View>
  );
}

const defaultStyles = StyleSheet.create({
  viewContainer: {
    padding: 70,
    fontFamily : "Gotham-BookItalic"
  },
  modalViewMiddle: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#f8f8f8',
    borderTopWidth: 1,
    borderTopColor: '#dedede',
    zIndex: 2,
  },
});
export default Settings