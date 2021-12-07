import axios from "axios";
import { isJwtExpired } from "jwt-check-expiration";
import { getAsyncStorageKey, setAsyncStorageKey } from "./asynctorage";


export const tokenExpired = async (token) => {
    console.log("TOKEN STATUS")
    console.log(isJwtExpired(token))
    if (isJwtExpired(token)) {
        const refreshToken = await getAsyncStorageKey('refresh_token')
        const userEmail = await getAsyncStorageKey('user_email')
        createNewTokens(refreshToken, userEmail)
    }
}

const createNewTokens = async (refreshToken, email) => {
    const data = {
        token: refreshToken,
        email: email
    }
    await axios.post('https://ballin-api-production.herokuapp.com/refresh', data)
        .then(async response => {
            console.log("JWT TOKEN FROM EXPRESS");
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