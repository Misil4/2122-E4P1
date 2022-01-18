import React, { useState, useEffect, useCallback } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { getAsyncStorageKey, setAsyncStorageKey } from "../../../helpers/asynctorage";
import { socket } from "../../../App";
import { View,StatusBar,TouchableOpacity,Text } from "react-native";
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
    const roomMessages = messageArr.filter((message) => props.userTo.email === "Admin" ? props.userFrom.email : props.userTo.email ===message.room )
    
    console.log("ALL SAVED MESSAGES")
    console.log(messageArr)
    const messageData = roomMessages.map(({__v,room,from,to,timestamp,...message },index) => ({
      ...message,
      _id : messageArr[index].from, 
      text : messageArr[index].text,
      createdAt: messageArr[index].timestamp,
      user : {
        _id : messageArr[index].to,
        avatar : messageArr[index].picture
      }
    }));
    console.log("SAVED MESSAGES FROM THIS ROOM")
    console.log(messageData)
    setMessages(messageData.reverse())
  }
  const UpdateMessages = () => {
    socket.on("insert_messages", getUpdate)
  }
  useEffect(() => {
    props.navigation.setOptions({ title: props.userTo.name,headerLeft: () => (<Avatar source={{uri : props.userTo.picture}} rounded size={40} containerStyle={{marginLeft: 35 }}/>) })
    if (props.userFrom === "Admin"){
    JoinChat()
    }
    GetMessages()
    console.log("FUNCIONANDO")
  }, [props.userTo])

  useEffect(() => {
    UpdateMessages()
  },[messages])
  const onSend = useCallback(async(messages = []) => {
    console.log(props.userFrom)
    const data = {
      from: props.userFrom.name,
      to: messages[0].user._id,
      text: messages[0].text,
      timestamp: messages[0].createdAt,
      room: props.userTo.email,
      picture : props.userFrom.picture
    }
    if (props.userTo.email === "Admin") { data.room = props.userFrom.email}
    console.log("SAVED MESSAGE");
    console.log(data)
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
    <View style={{ flexGrow: 1 ,borderColor: "green",borderWidth: 2}}>
      {console.log("USER INFO")}
      {console.log(props.userTo)}
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: props.userTo.name,
          avatar : props.userTo.name === "Admin" ? "" : props.userTo.picture
        }}
      />
    </View>
  )
}
export default Chat