import React from "react";
import Chat from "./Components/chat"


const ChatAdmin = (props) => {
    return(
        <Chat 
            userFrom = {{name: "Admin",email : "Admin",room: props.route.params.user.email}}
            userTo = {props.route.params.user}
            navigation = {props.navigation}
        />
    )
}

export default ChatAdmin