import React, { useState, useEffect, useCallback } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { getAsyncStorageKey, setAsyncStorageKey } from "../../../helpers/asynctorage";
import { socket } from "../../../socket/socket";
import { View, BackHandler } from "react-native";
import { Avatar } from "react-native-elements";
const Chat = (props) => {
  const [messages, setMessages] = useState([]);
  const [show, setShow] = useState(false);
  const onClick = emoji => {
    console.log(emoji);
  };
  const JoinChat = () => {
    socket.emit("join", props.userTo.email);
    console.log("ROOM JOINED SUCCESFULLY")
  }
  const getUpdate = async (messages) => {
    console.log("RECEIVED MESSAGE");
    console.log(messages)
    const saved_messages = await getAsyncStorageKey("messages");
    let messageArr = JSON.parse(saved_messages)

    if (!messageArr) {
      messageArr = []
    }
    messageArr.push(messages)
    setAsyncStorageKey("messages", JSON.stringify(messageArr)).then(() => {

      setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    })
  }
  const GetMessages = async () => {
    const messages = await getAsyncStorageKey("messages");
    let roomMessages;
    let messageArr = JSON.parse(messages)
    if (props.userFrom.name === "Admin") {
      roomMessages = messageArr.filter((message) => props.userTo.email === message.room)
    }
    else {
      roomMessages = messageArr.filter((message) => props.userTo.room === message.room)
    }
    console.log("ALL SAVED MESSAGES")
    console.log(messageArr)
    console.log("SAVED MESSAGES FROM THIS ROOM")
    console.log(roomMessages)
    setMessages(roomMessages.reverse())
  }
  const UpdateMessages = () => {
    socket.on("updated_messages", getUpdate)
  }
  const backButtonClick = () => {
    if (props.navigation && props.navigation.goBack) {
      props.userFrom.name === "Admin" ? props.navigation.navigate("Admin", { screen: "Lista Usuarios" }) : props.navigation.navigate("User", { screen: "QrGenerator" })
      return true;
    }
    return false;
  }
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backButtonClick)
    props.navigation.setOptions({ title: props.userTo.name, headerLeft: () => (<Avatar source={{ uri: props.userTo.picture }} rounded size={40} containerStyle={{ marginLeft: 35 }} />) })
    if (props.userFrom.name === "Admin") {
      JoinChat()
    }
    GetMessages()
    console.log("FUNCIONANDO")
    if (props.userTo.name === "Admin") return () => socket.emit("leave", props.userTo.room);
  }, [props.userTo])

  useEffect(() => {
    UpdateMessages()
    return () => socket.off("updated_messages", getUpdate);
  }, [messages])
  const onSend = useCallback(async (messages = []) => {
    const data = {
      _id: messages[0]._id,
      text: messages[0].text,
      createdAt: messages[0].createdAt,
      user: {
        _id: messages[0].user._id,
        avatar: messages[0].user.avatar
      }
      , room: props.userTo.email,
    }
    if (props.userTo.email === "Admin") { data.room = props.userFrom.email }
    console.log("SAVED MESSAGE");
    console.log(data)
    const saved_messages = await getAsyncStorageKey("messages");
    let messageArr = JSON.parse(saved_messages)
    console.log(messageArr)
    if (!messageArr) {
      messageArr = []
    }
    messageArr.push(data)
    setAsyncStorageKey("messages", JSON.stringify(messageArr)).then(() => console.log("MESSAGE SAVED"));
    socket.emit("insert_message", data)
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  return (
    <View style={{ flexGrow: 1, borderColor: "green", borderWidth: 2 }}>
      {console.log("USER INFO")}
      {console.log(props.userTo)}
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: props.userTo.name,
          avatar: props.userTo.name === "Admin" ? "" : props.userTo.picture
        }}
      />
    </View>
  )
}
export default Chat