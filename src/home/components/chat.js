import React, { useState, useEffect, useCallback } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { getAsyncStorageKey, setAsyncStorageKey } from "../../../helpers/asynctorage";
import { socket } from "../../../socket/socket";
import { View, StatusBar, TouchableOpacity, Text } from "react-native";
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
    const newMessage = {
      _id: messages.timestamp.substring(15,16),
      text: messages.text,
      createdAt: messages.timestamp,
      user: {
        _id: messages.to,
        avatar: messages.picture
      }
    }
  
    if (!messageArr) {
    messageArr = []
    }
    messageArr.push(newMessage)
    setAsyncStorageKey("messages", JSON.stringify(messageArr)).then(() => {

     setMessages(previousMessages => GiftedChat.append(previousMessages, newMessage))
    })
  }
  const GetMessages = async () => {
    const messages = await getAsyncStorageKey("messages");

    let messageArr = JSON.parse(messages)
    const roomMessages = messageArr.filter((message) => props.userTo.email === "Admin" ? props.userFrom.email : props.userTo.email === message.room)

    console.log("ALL SAVED MESSAGES")
    console.log(messageArr)
    const messageData = roomMessages.map(({ __v, room, from, to, timestamp, ...message }, index) => ({
      ...message,
      _id: index,
      text: messageArr[index].text,
      createdAt: messageArr[index].timestamp,
      user: {
        _id: messageArr[index].to,
        avatar: messageArr[index].picture
      }
    }));
    console.log("SAVED MESSAGES FROM THIS ROOM")
    console.log(messageData)
    setMessages(messageData.reverse())
  }
  const UpdateMessages = () => {
    socket.on("updated_messages", getUpdate)
  }
  useEffect(() => {
    props.navigation.setOptions({ title: props.userTo.name, headerLeft: () => (<Avatar source={{ uri: props.userTo.picture }} rounded size={40} containerStyle={{ marginLeft: 35 }} />) })
    if (props.userFrom.name === "Admin") {
      JoinChat()
    }
    GetMessages()
    console.log("FUNCIONANDO")
  }, [props.userTo])

  useEffect(() => {
    UpdateMessages()
    return () => socket.off("updated_messages", getUpdate);
  }, [messages])
  const onSend = useCallback(async (messages = []) => {
    console.log(props.userFrom)
    const data = {
      from: props.userFrom.name,
      to: messages[0].user._id,
      text: messages[0].text,
      timestamp: messages[0].createdAt,
      room: props.userTo.email,
      picture: props.userFrom.picture
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