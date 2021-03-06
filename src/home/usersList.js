'use strict';

import React, { useContext, useEffect, useState } from 'react';
import { ListItem, Badge, Avatar } from 'react-native-elements'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, ActivityIndicator, ScrollView, StyleSheet, Text, Alert } from 'react-native';
import { tokenExpired } from '../../helpers/jwt';
import AppContext from '../../context/context';
import { getAsyncStorageKey } from '../../helpers/asynctorage';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
const UsersList = (props) => {
  const isCancelled = React.useRef(false);
  const [usersListData, setUserListData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { socket, theme,user } = useContext(AppContext);
  const [tkn, setTkn] = useState(null)

  const focused = useIsFocused()
  const getUpdate = users => {
    console.log("DATOS RECOGIDOS");
    console.log(users)
    setUserListData(users)
  }
  const getToken = async() => {
    getAsyncStorageKey('token').then((token) => {
      if (!isCancelled.current) {
      setTkn(token)}}
      )
  }
  const UpdateUsers = () => {
    socket.on("change_data", getUpdate)
    console.log("EXECUTING UPDATE")
  }
  useEffect(() => {
    UpdateUsers()
    getToken()
    return () => {
      isCancelled.current = true;
    };
  }, [])
  useEffect(() => {
    if (tkn !== null) {
    axios.get("https://ballin-api-production.herokuapp.com/users", { headers: { 'Authorization': tkn } })
    .then(response => {
      if (!isCancelled.current) {
      setUserListData(response.data.users);
        setLoading(false)
      }
        return () => {
          isCancelled.current = true;
        };
    })
  }
  },[tkn])
 
  if (loading) {
    return (
      <View style={{ margin: "auto" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <SafeAreaProvider style={theme ? styles.darkTextContainer : styles.textContainer}><View >
      {console.log("USUARIO")}
      {console.log(user)}
      <ScrollView>
        {usersListData.map((element, i) => {
          return (
            <ListItem key={i}
              friction={90} //
              tension={100} // These props are passed to the parent component (here TouchableScale)
              activeScale={0.95} //
              containerStyle={theme ? styles.darkContainer : styles.container}
            >
              <Avatar
                size="medium"
                source={{ uri: element.picture }}
                onPress={() => { element.login_status ? props.navigation.navigate("Admin", { screen: "UserLocation", params: { user: element } }) : Alert.alert("Usuario no conectado") }}
                activeOpacity={0.7}
                titleStyle={{ color: "black" }}
                rounded
              />
              <Badge
                status={element.login_status === true ? "success" : "error"}
                containerStyle={{ position: 'absolute', top: 17, right: "93%" }} />
              <ListItem.Content>
                <ListItem.Title style={theme ? styles.darkTextContainer : styles.textContainer}>{element.name}</ListItem.Title>
                <ListItem.Subtitle style={theme ? styles.darkTextContainer : styles.textContainer}>{element.email}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          )
        })}
      </ScrollView>
    </View>
    </SafeAreaProvider >
  )
}
export default UsersList
const styles = StyleSheet.create({
  container: {
    borderWidth: 0,
    justifyContent: "center",
    backgroundColor: "#F5F5F5"
  },
  darkContainer: {
    borderWidth: 0,
    justifyContent: "center",
    color: "#F5F5F5",
    backgroundColor: "#232322"
  },
  listItem: {
    borderWidth: 0,
    borderColor: "#61b97c"
  },
  textContainer: {
    color: "#232322",
    fontFamily: 'Gotham-BookItalic',
    backgroundColor: "#F5F5F5"
  },
  darkTextContainer: {
    color: "#F5F5F5",
    fontFamily: 'Gotham-BookItalic',
    backgroundColor: "#232322"
  }
});
