'use strict';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ListItem, Badge, Avatar } from 'react-native-elements'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, Text, ActivityIndicator, ScrollView,StyleSheet } from 'react-native';
import { getAsyncStorageKey } from '../../helpers/asynctorage';
import { tokenExpired } from '../../helpers/jwt';
import { socket } from '../../App';
import { NavigationContainer } from '@react-navigation/native';

const UsersList = (props) => {
  const [usersListData, setUserListData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = users => {
    setUserListData(users)
  }
  const getUpdate  =users => {
    console.log("DATOS RECOGIDOS");
    console.log(users)
    setUserListData(users)
  }

  const getAllUsers = async () => {
    await tokenExpired()
    socket.emit("user_data");
    socket.once("get_users", getData)
    console.log("EXECUTING GET")
    setLoading(false)

  }

  const UpdateUsers = async () => {
    await tokenExpired()
    socket.on("change_data", getUpdate)
    console.log("EXECUTING UPDATE")
  }
  /*
  const getAllUsers = async () => {
    const token = await getAsyncStorageKey('token')
    console.log(token)
    tokenExpired(token)
    await axios.get('https://serverpruebas.herokuapp.com/users', { headers: { 'Authorization': token } })
      .then(res => {
        setUserListData(res.data.users);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  */
  useEffect(() => {
    getAllUsers()
    UpdateUsers()
  }, [])
  if (loading) {
    return (
      <View style={{ margin: "auto" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (<SafeAreaProvider><View style={styles.container}>
    <ScrollView>{usersListData.map((element, i) => {
      return (
        <ListItem key={i} bottomDivider>
          <Avatar
            size="medium"
            source={{uri : element.picture}}
            onPress={() => props.navigation.navigate("Admin",{screen : "ChatAdmin",params :{user : element}})}
            activeOpacity={0.7}
            titleStyle={{ color: "black" }}
            rounded
          />
          <Badge
            status={element.login_status === true ? "success" : "error"}
            containerStyle={{ position: 'absolute', top: 17, right: 340}} />
          <ListItem.Content>
            <ListItem.Title>{element.name}</ListItem.Title>
            <ListItem.Subtitle>{element.email}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      )
    })}
    </ScrollView>
  </View>
  </SafeAreaProvider>
  )
}
export default UsersList
const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 2,
    borderColor: "green",
    justifyContent: "center",
    alignItems: "center",
  }});
