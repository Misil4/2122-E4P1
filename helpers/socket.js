import { setAsyncStorageKey, getAsyncStorageKey } from "./asynctorage"
const UpdateMessage = async (message) => {
    const saved_messages = await getAsyncStorageKey("messages");
    let messageArr = JSON.parse(saved_messages)
    if (!messageArr) {
        messageArr = []
    }
    messageArr.push(message)
    setAsyncStorageKey("messages", JSON.stringify(messageArr)).then(() => {notification = true;console.log("MESSAGE SAVED",notification)})
}
export const UpdateMessages = async(socket) => {
        let notification = false;
        socket.on("notification", (message) => UpdateMessage(message,notification))
        return notification
}