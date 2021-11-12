import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

export default class Index extends Component{
    
    constructor(props){
        super(props)
    }

    render(){
        return(
            <Text>Contenido Aqui Arriba</Text>
        )
    }

    NavigateToQrReader = () => {
        this.props.navigation.navigate('QrReader')
    }

    NavigateToQrGenerator = () => {
        this.props.navigation.navigate('QrGenerator')
    }
}