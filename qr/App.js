import React from 'react';
import ScanScreen from './components/ScanScreen';
import { Text, View, TouchableOpacity} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';

class App extends React.Component {
  state = {
    qr: ""
  }

  onRead = e => {
    this.setState({ qr: e.data})
    //console.log(e.data)
  }

  scanAgain = () => {
    this.setState({ scan: true, ScanResult: false })
  }

  render(){
  return (
    <View>
    <QRCodeScanner 
    onRead={this.onRead}
    />

    <Text>
    {this.state.qr}
    </Text>
    <TouchableOpacity onPress={this.scanAgain}></TouchableOpacity>
    </View>

    
  );
}
}

export default App;

