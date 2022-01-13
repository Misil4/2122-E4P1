import React, { useState, useEffect, useCallback } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { getAsyncStorageKey, setAsyncStorageKey } from "../../../helpers/asynctorage";
import { socket } from "../../../App";
import { View } from "react-native";
import { tokenExpired } from "../../../helpers/jwt";
const Chat = (props) => {
  const [messages, setMessages] = useState([]);
  const JoinChat = () => {
    socket.emit("join", props.userTo.email);
    console.log("ROOM JOINED SUCCESFULLY")
  }
  const getUpdate = async(messages) => {
    const saved_messages = await getAsyncStorageKey("messages");
    let messageArr = JSON.parse(saved_messages)
    if (!messageArr) {
      messageArr = []
    }
    messageArr.push(messages);
    setAsyncStorageKey("messages", JSON.stringify(messageArr)).then(() => {
      console.log("MESSAGE SAVED SUCCESFULLY");
      getAsyncStorageKey("messages").then((messages) => setMessages(messages));
    })
  }
  const GetMessages = async () => {
    const messages = await getAsyncStorageKey("messages");

    let messageArr = JSON.parse(messages)
    
    console.log("SAVED MESSAGES")
    const messageData = messageArr.map(({__v,room,from,to,timestamp,...message },index) => ({
      ...message,
      _id : messageArr[index].from, 
      text : messageArr[index].text,
      createdAt: messageArr[index].timestamp,
      user : {
        _id : messageArr[index].to,
      }
    }));
    console.log(messageData)
    setMessages(messageData.reverse())
  }
  const UpdateMessages = () => {
    socket.on("insert_messages", getUpdate)
  }
  useEffect(() => {
    if (props.userFrom === "Admin"){
    JoinChat()
    }
    GetMessages()
    console.log("FUNCIONANDO")
    UpdateMessages()
  }, [])

  const onSend = useCallback(async(messages = []) => {
    const data = {
      from: props.userFrom,
      to: messages[0].user._id,
      text: messages[0].text,
      timestamp: messages[0].createdAt,
      room: props.userTo.email
    }
    const saved_messages = await getAsyncStorageKey("messages");
    let messageArr = JSON.parse(saved_messages)
    console.log(messageArr)
    if (!messageArr) {
      messageArr = []
    }
    messageArr.push(data)
    setAsyncStorageKey("messages", JSON.stringify(messageArr)).then(() => console.log("MESSAGE SAVED SUCCESFULLY"));
    socket.emit("insert_message", data)
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  return (
    <View style={{ flexGrow: 1 }}>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: props.userTo.name,
        }}
      />
    </View>
  )
}
export default Chat