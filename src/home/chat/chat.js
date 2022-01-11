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
    const messageData = messages.map(({__v,room,from,to,timestamp,...message },index) => ({
      ...message,
      _id : messages[index].from,
      text : messages[index].text,
      createdAt: messages[index].timestamp,
      user : {
        _id : messages[index].to,
      }
    }));
    console.log("CUERPO DE EL MENSAJE")
    setMessages(messageData.reverse())
  }
  const getUpdate = messages => {
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
  const UpdateMessages = () => {
    socket.on("insert_messages",getUpdate)
  }
  useEffect(() => {
    JoinChat()
    GetMessages()
    UpdateMessages()
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