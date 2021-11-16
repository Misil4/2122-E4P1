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

            <View style={{flex:1, flexDirection: "row", position:"absolute", bottom: 5, alignSelf: "center"}}>
                <TouchableOpacity onPress={this.NavigateToQrReader}>
                    <Icon name="scan1" size={50}></Icon>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.NavigateToQrGenerator}>
                    <Icon name="qrcode" size={50}></Icon>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.NavigateToQrUserslist}>
                    <Icon name="usersList" size={50}></Icon>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.NavigatetoWasteReport}>
                    <Icon name="wasteReport" size={50}></Icon>
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
    NavigatetoGoogle = () => {
        this.props.navigation.navigate('Google')
    }
    NavigateToQrUserslist = () => {
        this.props.navigation.navigate('UsersList')
    }
    NavigatetoWasteReport = () => {
        this.props.navigation.navigate('WasteReport')
    }
}