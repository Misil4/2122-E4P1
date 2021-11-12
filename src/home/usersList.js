'use strict';

import React, { Component } from 'react';
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

export default class UsersList extends Component {
 render() {
  return (
  <SafeAreaProvider>
      <View>
      <ListItem key={1} bottomDivider>
        <Avatar source={{uri: list.avatar_url}} />
        <Badge
            status="success"
            containerStyle={{ position: 'absolute', top: 17, right: 340 }}/>
        <ListItem.Content>
          <ListItem.Title>{list.name}</ListItem.Title>
          <ListItem.Subtitle>{list.subtitle}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
      </View>
  </SafeAreaProvider>)
}
} 










