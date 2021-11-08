import React, { Component } from "react";
import { Text, View } from "react-native";

export default class Details extends Component{
        
    constructor(props){
        super(props)
        console.log("verify props", this.props.route.params)
    }

    render(){
        return(
            <View style= {{flex: 1, justifyContent:'center', alignItems:'center'}}>   
                <Text> This is detail screen </Text>
                <Text> {this.props.route.params} </Text>
            </View>
        )
    }
}