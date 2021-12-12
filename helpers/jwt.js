import axios from "axios";
import { isJwtExpired } from "jwt-check-expiration";
import { getAsyncStorageKey, setAsyncStorageKey } from "./asynctorage";

export const tokenExpired = async () => {
    const refreshToken = await getAsyncStorageKey('refresh_token')
    const userEmail = await getAsyncStorageKey('user_email')
    const data = {
        token: refreshToken,
        email: userEmail
    }
    await axios.post('https://ballin-api-production.herokuapp.com/refresh', data)
        .then(async response => {
            console.log("TOKENS REFRESHED");
            console.log(response.data);
            await setAsyncStorageKey('token', response.data.data.access_token)
            await setAsyncStorageKey('refresh_token', response.data.data.refresh_token)
        })
        .catch(error => {
            ''
            console.log("RESPONSE ERROR TOKEN VERIFICATION");
            console.log(error);
        })
}