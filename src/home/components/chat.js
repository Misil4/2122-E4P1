import React, { useState, useEffect, useCallback, useContext } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { getAsyncStorageKey, setAsyncStorageKey } from "../../../helpers/asynctorage";
import { socket } from "../../../socket/socket";
import { View, BackHandler } from "react-native";
import { Avatar } from "react-native-elements";
import ChatContext from "../../../context/chatContext";
import { selectLanguage } from "../languages/languages";
import AppContext from "../../../context/context";
const Chat = (props) => {
  const [messages, setMessages] = useState([]);
  const {userTo,userFrom} = useContext(ChatContext)
  const {language} = useContext(AppContext)
  const [languageArr,setLanguageArr] = useState(selectLanguage("euskera"))
  const JoinChat = () => {
    socket.emit("join", userTo.email);
  }
  const getUpdate = async (messages) => {
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
    if (userFrom.name === "Admin") {
      roomMessages = messageArr.filter((message) => userTo.email === message.room)
    }
    else {
      roomMessages = messageArr.filter((message) => userTo.room === message.room)
    }
    setMessages(roomMessages.reverse())
  }
  const UpdateMessages = () => {
    socket.on("updated_messages", getUpdate)
  }
  const backButtonClick = () => {
    if (props.navigation && props.navigation.goBack) {
      userFrom.name === "Admin" ? props.navigation.navigate("Admin", { screen: languageArr.userlist_screen }) : props.navigation.navigate("User", { screen: "QrGenerator" ,params : {email : userFrom.email}})
      return true;
    }
    return false;
  }
  useEffect(() => {
    setLanguageArr(selectLanguage(language))
    BackHandler.addEventListener('hardwareBackPress', backButtonClick)
    props.navigation.setOptions({ title: userTo.name, headerLeft: () => (<Avatar source={{ uri: userTo.picture }} rounded size={40} containerStyle={{ marginLeft: 35 }} />) })
    if (userFrom.name === "Admin") {
      JoinChat()
    }
    GetMessages()
  }, [userTo])

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
      , room: userTo.email,
    }
    if (userTo.email === "Admin") { data.room = userFrom.email }
    const saved_messages = await getAsyncStorageKey("messages");
    let messageArr = JSON.parse(saved_messages)
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
      <GiftedChat
        messages={messages}
        placeholder={languageArr.placeholder}
        onSend={messages => onSend(messages)}
        user={{
          _id: userTo.name,
          avatar: userTo.name === "Admin" ? "" : userTo.picture
        }}
      />
    </View>
  )
}
export default Chat