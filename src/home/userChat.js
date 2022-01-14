import React, { useCallback, useEffect, useState } from "react";
import { Text } from "react-native";
import Chat  from "./Components/chat"
import { GiftedChat } from 'react-native-gifted-chat'

const ChatUser = (props) => {
    return (
        <Chat userFrom={props.route.params.user} userTo={{name: "Admin",email : "Admin",room: props.route.params.user.email}} />
    )
}
export default ChatUser