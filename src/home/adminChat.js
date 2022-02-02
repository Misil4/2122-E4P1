import React,{createContext} from "react";
import Chat from "./components/chat"
import ChatContext from "../../context/chatContext";

const ChatAdmin = (props) => {
    return(
        <ChatContext.Provider value={{ userTo : props.route.params.user,userFrom :{name: "Admin",email : "Admin",room: props.route.params.user.email} }} >
        <Chat 
            navigation = {props.navigation}
        />
        </ChatContext.Provider >
    )
}

export default ChatAdmin