import { setAsyncStorageKey, getAsyncStorageKey } from "./asynctorage"
const UpdateMessage = async (message,setNotification) => {
    const saved_messages = await getAsyncStorageKey("messages");
    let messageArr = JSON.parse(saved_messages)
    if (!messageArr) {
        messageArr = []
    }
    messageArr.push(message)
    setAsyncStorageKey("messages", JSON.stringify(messageArr)).then(() => console.log("MESSAGE SAVED"))
    .then(() => setNotification(true))
}
export const UpdateMessages = (socket,setNotification) => {
    socket.on("notification", UpdateMessage(message,setNotification))
    
}