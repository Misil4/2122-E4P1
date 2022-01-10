import React,{useState,useEffect,useCallback} from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { getAsyncStorageKey } from "../../../helpers/asynctorage";
import { socket } from "../../../App";
import { View } from "react-native";
import { tokenExpired } from "../../../helpers/jwt";
const Chat = (props) => {
  const [messages, setMessages] = useState([]);
  const JoinChat = () => {
    socket.emit("join",props.route.params.user.email);
    console.log("ROOM JOINED SUCCESFULLY")
  }
  const getData = messages => {
    console.log("USERS")
    console.log(messages)
  }
  const GetMessages = async() => {
    await tokenExpired()
    const data = {
      from : "Admin",
      room : props.route.params.user.email
    }
    socket.emit("get_messages",data);
    socket.on("messages", getData)
  }
  useEffect(() => {
    JoinChat()
    GetMessages()
    setMessages([
      {
        _id: props.route.params.user.name,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: "Admin",
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    const data = {
      from: "Admin",
      to: messages[0].user._id,
      text: messages[0].text,
      timestamp:messages[0].createdAt,
      room : props.route.params.user.email
    }
    console.log(data)
    socket.emit("insert_message",data)
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  return (
    <View style={{flexGrow: 1}}>
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: props.route.params.user.name,
      }}
    />
        </View>
  )
}
export default Chat