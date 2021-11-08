import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

export default class Index extends Component{
    
    constructor(props){
        super(props)
    }

    render(){
        return(
            <><Text>Contenido Aqui Arriba</Text>

            <View style={{flex:1, justifyContent: "flex-end", flexDirection: "row", alignSelf:"center", paddingTop: 480}}>
                <TouchableOpacity onPress={this.NavigateToQrReader}>
                    <Icon name="scan1" size={50}></Icon>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.NavigateToQrGenerator}>
                    <Icon name="qrcode" size={50}></Icon>
                </TouchableOpacity>
            </View></>
        )
    }

    NavigateToQrReader = () => {
        this.props.navigation.navigate('QrReader')
    }

    NavigateToQrGenerator = () => {
        this.props.navigation.navigate('QrGenerator')
    }
}