import React from 'react';

import {
  useColorScheme,
  View,
} from 'react-native';
import QrGenerator from './components/QrGenerator';
import ScanScreen from './components/ScanScreen';


const App = () =>{

  return (
    <ScanScreen></ScanScreen>
    //<QrGenerator></QrGenerator>
  );

};

export default App;