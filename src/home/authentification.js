// Example of Google Sign In in React Native Android and iOS App
// https://aboutreact.com/example-of-google-sign-in-in-react-native/
import axios from 'axios';
import App from '../../App';
// Import React in our code
import React, { useState, useEffect, Context, useMemo, useContext } from 'react';
// Import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Button,
} from 'react-native';
import auth from '@react-native-firebase/auth'
// Import Google Signin
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { getAsyncStorageKey, setAsyncStorageKey, removeAsyncStorageKey } from '../../helpers/asynctorage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppContext from '../../context/context';
import { selectLanguage } from '../../languages/languages';
const authentification = (props) => {
  const [gettingLoginStatus, setGettingLoginStatus] = useState(true);
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState(false);
  const [rol, setRol] = useState('');
  const [email, setEmail] = useState('')
  const [authenticated, setAuthenticated] = useState(false)
  const [message, setMessage] = useState('');
  const [userInfo, setUserInfo] = useState('');
  const { socket, user, setUser, language } = useContext(AppContext);
  const [languageArr, setLanguageArr] = useState(selectLanguage("euskera"))

  useEffect(() => {
    // Initial configuration
    GoogleSignin.configure({
      // Mandatory method to call before calling signIn()
      //scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      // Repleace with your webClientId
      // Generated from Firebase console
      webClientId: '822986748161-tjihgo6gikf5mboac2l2pfo8rs7g9irc.apps.googleusercontent.com',
    });
    // Check if user is already signed in
    setLanguageArr(selectLanguage(language))
    _isSignedIn();
  }, []);
  const _isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      setMessage(languageArr.saved_keys)
      const user_rol = await getAsyncStorageKey("user_rol");
      setRol(user_rol)
      const user_email = await getAsyncStorageKey("user_email")
      setEmail(user_email)
      socket.emit("id_save",user_email)
      // Set User Info if user is already signed in
      setLoading(false);
      setLogin(true);

      console.log("signed in " + rol);
      console.log("signed in " + email)
      setMessage(languageArr.user_logged)
      if (user_rol === "admin") {

        props.navigation.navigate("Admin", { screen: languageArr.userlist_screen });
      }
      else if (user_rol === "user") {
        socket.emit("join", user_email);
        props.navigation.navigate("User", { screen: 'QrGenerator', params: { email: user_email } })
      }
      else { console.log("error") }
    } else {
      console.log('Please Login');
    }
    setGettingLoginStatus(false);
  };

  const tokenSignIn = async (userInfo) => {
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken);
    console.log("GOOGLE CREDENTIAL")
    console.log(googleCredential)

    // Sign-in the user with the credential
    const signInWithCredential = await auth().signInWithCredential(googleCredential);
    console.log("SIGN IN WITH CREDENTIAL")
    console.log(signInWithCredential)

    //Get the token from the current User
    const idTokenResult = await auth().currentUser.getIdTokenResult();
    console.log('USER JWT')
    console.log(idTokenResult.token)

    //Validate User Token

    await axios.post('https://ballin-api-stage.herokuapp.com/token', {
      token: idTokenResult.token,
      email: userInfo.user.email
    })
      .then(async response => {
        setAuthenticated(true)
        console.log("JWT TOKEN FROM EXPRESS");
        console.log(response.data);
        await AsyncStorage.setItem('token', response.data.data.access_token)
        await AsyncStorage.setItem('refresh_token', response.data.data.refresh_token)
      })
      .catch(error => {
        ''
        console.log("RESPONSE ERROR TOKEN VERIFICATION");
        console.log(error);
      })
  }

  const userInfoSignIn = async (userInfo) => {
    const data = {
      name: userInfo.user.givenName,
      email: userInfo.user.email,
      picture: userInfo.user.photo
    }
    await axios.post('https://ballin-api-stage.herokuapp.com/users', data)
      .then(async response => {
        console.log("RESPONSE")
        console.log(response.data)
        AsyncStorage.setItem("user_rol", response.data.data.rol).then(response => setRol(response))
        AsyncStorage.setItem("user_email", response.data.data.email).then(response => setEmail(response))
      })
      .then((error) => console.log(error))
  }

  const _signIn = async () => {
    // It will prompt google Signin Widget
    try {
      setLoading(true);
      await GoogleSignin.hasPlayServices({
        // Check if device has Google Play Services installed
        // Always resolves to true on iOS
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();
      setUser(userInfo)
      setUserInfo(userInfo)
      console.log("ID TOKEN")
      console.log(userInfo)
      setMessage(languageArr.taking_information)
      await userInfoSignIn(userInfo)
      const token = await getAsyncStorageKey('token')
      const user = JSON.stringify(userInfo)
      await AsyncStorage.setItem("user_info", user)
      console.log("USER TOKEN SAVED");
      console.log(token)
      await tokenSignIn(userInfo)
      setLoading(false);
      setLogin(true);
      const userRol = await getAsyncStorageKey("user_rol")
      const userEmail = await getAsyncStorageKey("user_email")
      socket.emit("id_save",userEmail)
      setMessage(languageArr.user_logged)
      console.log("getuserinfo " + userRol);
      console.log("getuserinfo " + userEmail);
      if (userRol === "admin") {
        props.navigation.navigate("Admin", { screen: languageArr.userlist_screen });
      }
      else if (userRol === "user") {
        socket.emit("join", userEmail);
        props.navigation.navigate("User", { screen: 'QrGenerator', params: { email: userEmail } })
      }
      else { console.log("error") }
    } catch (error) {
      console.log('Message', JSON.stringify(error));
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        alert('User Cancelled the Login Flow');
        setLoading(false);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert('Signing In');
      } else if (
        error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE
      ) {
        alert('Play Services Not Available or Outdated');
      } else {
        alert(error.message);
        setLoading(false);
      }
    }
  };
  const _signOut = async () => {
    setGettingLoginStatus(true);
    // Remove user session from the device.
    try {
      if (rol === "user") {
        console.log("ROOM LEAVED SUCCESFULLY")
        socket.emit("leave", user.user.email);
      }
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      await removeAsyncStorageKey('token');
      await removeAsyncStorageKey('refresh_token');
      setUserInfo("")
      // Removing user Info
      setLogin(false);
    } catch (error) {
      console.error(error);
    }
    setGettingLoginStatus(false);
  };
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>{message}</Text>
      </View>
    );
  } else {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        {console.log("ROL ACTUAL")}
        {console.log(rol)}
        {console.log("INFO")}
        {console.log(user)}
        {console.log(login)}
        <View style={styles.container}>
          <View style={styles.container}>
            {login !== false ? (
              <>
                <Image style={styles.imageStyle} source={{ uri: user?.user.photo }} />
                <Text>{user?.user.givenName}</Text>
                <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={_signOut}>
                  <Text style={{ color: "white" }}>{languageArr.logout}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonStyle}
                  onPress={() => rol === "admin" ? props.navigation.navigate("Admin", { screen: languageArr.userlist_screen }) : props.navigation.navigate("User", { screen: 'QrGenerator', params: { email: email } })}><Text style={{ color: "white" }}>{languageArr.return}</Text></TouchableOpacity>
              </>
            ) : (
              <GoogleSigninButton
                style={{ width: 312, height: 48 }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Light}
                onPress={_signIn}
              />
            )}
          </View>
        </View>
      </SafeAreaView>
    );
  }
};

export default authentification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20,
  },
  imageStyle: {
    width: 200,
    height: 300,
    resizeMode: 'contain',
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: 'green',
    padding: 10,
    width: 300,
    marginTop: 30,
  },
  footerHeading: {
    fontSize: 18,
    textAlign: 'center',
    color: 'grey',
  },
  footerText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'grey',
  },
});