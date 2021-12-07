'use strict';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ListItem, Badge, Avatar } from 'react-native-elements'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, Text, ActivityIndicator } from 'react-native';
import { getAsyncStorageKey } from '../../helpers/asynctorage';
import { tokenExpired } from '../../helpers/jwt';

const UsersList = (props) => {
  const [usersListData, setUserListData] = useState([]);
  const [loading, setLoading] = useState(true);
  const getAllUsers = async () => {
    const token = await getAsyncStorageKey('token')
    console.log(token)
    tokenExpired(token)
    await axios.get('https://ballin-api-production.herokuapp.com/users', { headers: { 'Authorization': token } })
      .then(res => {
        setUserListData(res.data.users);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  useEffect(() => {
    getAllUsers()
  }, [])
  if (loading) {
    return (
      <View style={{ margin: "auto" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (<SafeAreaProvider>{console.log(usersListData)}<View>{usersListData.map((element, i) => {
    return (
      <ListItem key={i} bottomDivider>
        <Avatar
          size="medium"
          title={"H"}
          onPress={() => console.log("Works!")}
          activeOpacity={0.7}
          titleStyle={{ color: "black" }}
        />
        <Badge
          status={element.login_status === true ? "success" : "error"}
          containerStyle={{ position: 'absolute', top: 17, right: 340 }} />
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
export default UsersList



