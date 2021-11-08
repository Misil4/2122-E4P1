import React, { Component } from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

export default class Index extends Component{
    
    constructor(props){
        super(props)
    }

    render(){
        return(
            <><Text>Contenido Aqui Arriba</Text>

            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                <TouchableOpacity onPress={this.NavigateToQR}>
                    <Icon name="qrcode" size={50}></Icon>
                </TouchableOpacity>
            </View></>
        )
    }

    NavigateToQR = () => {
        this.props.navigation.navigate('QR')
    }
}