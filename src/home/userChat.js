import React from "react";
import Chat  from "./components/chat"

const ChatUser = (props) => {
    return (
        <Chat userFrom={props.route.params.user[0]} userTo={{name: "Admin",email : "Admin",room: props.route.params.user[0].email}} navigation={props.navigation} />
    )
}
export default ChatUser