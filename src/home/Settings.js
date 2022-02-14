import React, { useContext, useState, useEffect } from "react";
import { Platform, StyleSheet, Text, View, Button } from "react-native";

import ToggleSwitch from "toggle-switch-react-native";
import RNPickerSelect from 'react-native-picker-select';
import AppContext from "../../context/context";
import { selectLanguage } from "../../languages/languages";
import { setAsyncStorageKey, getAsyncStorageKey } from "../../helpers/asynctorage";
import { Switch } from 'react-native-paper';

const Settings = (props) => {

  const [isOnBlueToggleSwitch, setisOnBlueToggleSwitch] = useState(false)
  const { setLanguage, language, setTheme, theme } = useContext(AppContext)
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  const getTheme = async () => {
    return await getAsyncStorageKey("theme")

  }

  const placeholder = {
    label: selectLanguage(language).select_language,
    value: null,
  };
  return (
    <View style={styles.container}>
      <Text style={styles.instructions}>Dark Mode</Text>
      

      <Switch 
      value={getTheme().then(response => response === null ? isSwitchOn : response)} 
      onValueChange={value => {
        setisOnBlueToggleSwitch(value);
        setAsyncStorageKey("theme", value)
        setTheme(value)}}/>

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 2,
    borderColor: "green",
    justifyContent: "center",
    alignItems: "center",
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});

const defaultStyles = StyleSheet.create({
  viewContainer: {
    padding: 70
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