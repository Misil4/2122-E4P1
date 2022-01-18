import React, { useCallback, useEffect, useState } from "react";
import { Text } from "react-native";
import Chat  from "./components/chat"
import { GiftedChat } from 'react-native-gifted-chat'

const ChatUser = (props) => {
    return (
        <Chat userFrom={props.route.params.user[0]} userTo={{name: "Admin",email : "Admin",room: props.route.params.user.email}} navigation={props.navigation} />
    )
}
export default ChatUser