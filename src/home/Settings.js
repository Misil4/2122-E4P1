import React, { useContext,useState } from "react";
import { Platform, StyleSheet, Text, View, Button } from "react-native";

import ToggleSwitch from "toggle-switch-react-native";
import RNPickerSelect from 'react-native-picker-select';
import AppContext from "../../context/context";


const Settings = () => {
  const [isOnDefaultToggleSwitch,setisOnDefaultToggleSwitch] = useState(true);
  const [ isOnLargeToggleSwitch,setisOnLargeToggleSwitch] = useState(false);
  const [isOnBlueToggleSwitch,setisOnBlueToggleSwitch] = useState(false)
  const {setLanguage} = useContext(AppContext)

  const onToggle = (isOn) => {
    console.log("Changed to " + isOn);
  }
    const placeholder = {
      label: 'Selecciona tu idioma',
      value: null,
    };
    return (
      <View style={styles.container}>
        <Text style={styles.instructions}>Dark Mode</Text>
        <ToggleSwitch
          label=""
          size="large"
          onColor="black"
          isOn={isOnBlueToggleSwitch}
          onToggle={value => {
            setisOnBlueToggleSwitch(value);
          }}
        />
        <RNPickerSelect
          onValueChange={(value) => setLanguage(value)}
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