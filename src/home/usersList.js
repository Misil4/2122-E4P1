'use strict';
 
import React, { Component } from 'react';
import axios from 'axios';
import { ListItem, Avatar } from 'react-native-elements'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View } from 'react-native';
import { Text } from 'react-native';
import { Badge, Icon, withBadge } from 'react-native-elements'
 
const list =
 {
   name: 'Amy Farha',
   avatar_url: 'https://images.unsplash.com/photo-1532074205216-d0e1f4b87368?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8d29tYW4lMjBwcm9maWxlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80',
   subtitle: 'Vice President'
 }
 
export default class UsersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { usersListData: [] };
}

componentDidMount(){
  axios.get('https://ballin-api-stage.herokuapp.com/users')
.then(res => {
    this.setState({ usersListData: res.data });
})
.catch(function (error) {
    console.log(error);
})
}
render(){
  return( this.state.usersListData.map((data, i) => {
      <SafeAreaProvider>
      <View>
      <ListItem key={i} bottomDivider>
        <Avatar source={{uri: data.avatar_url}} />
        <Badge
            status={data.login_status ===true ? "success" :"error"}
            containerStyle={{ position: 'absolute', top: 17, right: 340 }}/>
        <ListItem.Content>
          <ListItem.Title>{data.name}</ListItem.Title>
          <ListItem.Subtitle>{data.rol}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
      </View>
  </SafeAreaProvider>
  })
  )}

}




