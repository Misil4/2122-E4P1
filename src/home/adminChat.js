import React from "react";
import Chat from "./Components/chat"


const ChatAdmin = (props) => {
    return(
        <Chat 
            userFrom = "Admin"
            userTo = {props.route.params.user}
        />
    )
}

export default ChatAdmin