'use strict';

import React, { useContext, useEffect, useState } from 'react';
import { ListItem, Badge, Avatar } from 'react-native-elements'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, ActivityIndicator, ScrollView, StyleSheet,Text } from 'react-native';
import { tokenExpired } from '../../helpers/jwt';
import AppContext from '../../context/context';
import { getAsyncStorageKey } from '../../helpers/asynctorage';
import { UpdateMessages } from '../../helpers/socket';
import axios from 'axios';

const UsersList = (props) => {
  const [usersListData, setUserListData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { socket, theme } = useContext(AppContext);
  const [notification,setNotification] = useState(false)



  const getUpdate = users => {
    console.log("DATOS RECOGIDOS");
    console.log(users)
    setUserListData(users)
  }

  const getAllUsers = async () => {
    await tokenExpired()
    const token = await getAsyncStorageKey('token');
    return axios.get("https://ballin-api-stage.herokuapp.com/users", { headers: { 'Authorization': token } })
      .then(response => { setUserListData(response.data.users); setLoading(false) })
      .catch(error => console.error(error))
  }

  const UpdateUsers = async () => {
    socket.on("change_data", getUpdate)
    console.log("EXECUTING UPDATE")
  }
  useEffect(() => {
    getAllUsers()
  }, [])
  useEffect(() => {
    UpdateUsers()
    return () => socket.off("change_data", getUpdate)
},[socket])
useEffect(() => {
  UpdateMessages(socket,setNotification)
},[socket])
  if (loading) {
    return (
      <View style={{ margin: "auto" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <SafeAreaProvider style={theme ? styles.darkTextContainer : styles.textContainer}><View >
      <ScrollView>
        {usersListData.map((element, i) => {
          return (
            <ListItem key={i}
              friction={90} //
              tension={100} // These props are passed to the parent component (here TouchableScale)
              activeScale={0.95} //
              containerStyle= {theme ? styles.darkContainer : styles.container }
            >
        <Avatar
          size="medium"
          source={{ uri: element.picture }}
          onPress={() => { console.log(element); props.navigation.navigate("Admin", { screen: "ChatAdmin", params: { user: element } }) }}
          activeOpacity={0.7}
          titleStyle={{ color: "black" }}
          rounded
        />
        <Badge
          status={element.login_status === true ? "success" : "error"}
          containerStyle={{ position: 'absolute', top: 17, right: "93%" }} />
        <ListItem.Content>
          <ListItem.Title style={theme ? styles.darkTextContainer : styles.textContainer}>{element.name}</ListItem.Title>
          <ListItem.Subtitle style={theme ? styles.darkTextContainer: styles.textContainer}>{element.email}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
      )
        })}
    </ScrollView>
    </View>
    {notification ? <Text>NUEVO MENSAJE</Text>: <Text>i</Text>}
    </SafeAreaProvider >
  )
}
export default UsersList
const styles = StyleSheet.create({
  container: {
    borderWidth: 0,
    justifyContent: "center",
    backgroundColor : "#F5F5F5"
  },
  darkContainer: {
    borderWidth: 0,
    justifyContent: "center",
    color : "#F5F5F5",
    backgroundColor : "#232322"
  },
  listItem: {
    borderWidth: 0,
    borderColor: "#61b97c"
  },
  textContainer : {
    color : "#232322",
    fontFamily : 'Gotham-BookItalic',
    backgroundColor : "#F5F5F5"
  },
  darkTextContainer : {
    color : "#F5F5F5",
    fontFamily : 'Gotham-BookItalic',
    backgroundColor : "#232322"
  }
});
