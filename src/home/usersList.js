'use strict';
 
import React, { Component } from 'react';
import axios from 'axios';
import { ListItem,Badge,Avatar } from 'react-native-elements'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View } from 'react-native';
import { Text } from 'react-native';
 
 
export default class UsersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { usersListData: [] };
}

componentDidMount(){
  axios.get('https://ballin-api-stage.herokuapp.com/users')
.then(res => {
    this.setState({ usersListData: res.data.users });
})
.catch(function (error) {
    console.log(error);
})
}
list ()  {
  return this.state.usersListData.map((element,i) => {
    return (
      <ListItem key={i} bottomDivider>
        <Avatar
  size="medium"
  title="BP"
  onPress={() => console.log("Works!")}
  activeOpacity={0.7}
/>
      <Badge
          status={element.login_status ===true ? "success" :"error"}
          containerStyle={{ position: 'absolute', top: 17, right: 340 }}/>
      <ListItem.Content>
        <ListItem.Title>{element.name}</ListItem.Title>
        <ListItem.Subtitle>{element.rol}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
    )
  })
}
render(){
  return <SafeAreaProvider><View>{this.list()}</View></SafeAreaProvider>
}
}




