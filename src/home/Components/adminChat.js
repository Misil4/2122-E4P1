import React from "react";
import Chat from "./chat"


const ChatAdmin = (props) => {
    return(
        <Chat 
            userFrom = "Admin"
            userTo = {props.route.params.user}
        />
    )
}

export default ChatAdmin