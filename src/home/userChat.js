import React from "react";
import Chat  from "./components/chat"
import ChatContext from "../../context/chatContext";
const ChatUser = (props) => {
    return (
        <ChatContext.Provider value={{userTo :{name: "Admin",email : "Admin",room: props.route.params.user[0].email},userFrom : props.route.params.user[0]}}>
        {console.log(props.route.params.user)}
        <Chat navigation={props.navigation} />
        </ChatContext.Provider>
    )
}
export default ChatUser