'use strict';
 
import React, { Component } from 'react';
import axios from 'axios';
import { ListItem,Badge,Avatar } from 'react-native-elements'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View,Text,ActivityIndicator } from 'react-native';
 
export default class UsersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { usersListData: [],loading : true };
}

componentDidMount(){
  axios.get('https://ballin-api-stage.herokuapp.com/users')
.then(res => {
    this.setState({ usersListData: res.data.users,loading : false });
})
.catch(function (error) {
    console.log(error);
})
}
render(){
  if (this.state.loading) {
    return (
      <View style={{margin : "auto"}}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
  }
  return (<SafeAreaProvider><View>{this.state.usersListData.map((element,i) => {
    return (
      <ListItem key={i} bottomDivider>
        <Avatar
  size="medium"
  title={element.name.substring(0,2).toUpperCase()}
  onPress={() => console.log("Works!")}
  activeOpacity={0.7}
  titleStyle={{color : "black"}}
/>
      <Badge
          status={element.login_status ===true ? "success" :"error"}
          containerStyle={{ position: 'absolute', top: 17, right: 340 }}/>
      <ListItem.Content>
        <ListItem.Title>{element.name}</ListItem.Title>
        <ListItem.Subtitle>{element.email}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
    )
  })}
  </View>
  </SafeAreaProvider>
  )
}
}




