// Example of Google Sign In in React Native Android and iOS App
// https://aboutreact.com/example-of-google-sign-in-in-react-native/
import axios from 'axios';
// Import React in our code
import React, { useState, useEffect } from 'react';
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
import { getAsyncStorageKey, setAsyncStorageKey } from '../../helpers/asynctorage';
const authentification = (props) => {
  const [gettingLoginStatus, setGettingLoginStatus] = useState(true);
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState(false);
  const [rol, setRol] = useState('');
  const [email, setEmail] = useState('')

  useEffect(() => {
    // Initial configuration
    GoogleSignin.configure({
      // Mandatory method to call before calling signIn()
      //scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      // Repleace with your webClientId
      // Generated from Firebase console
      webClientId: '822986748161-tjihgo6gikf5mboac2l2pfo8rs7g9irc.apps.googleusercontent.com',
    });
    getAsyncStorageKey("user_rol").then(response => { setRol(response); console.log(response) })
    getAsyncStorageKey("user_email").then(response => { setEmail(response); console.log(response) })
    // Check if user is already signed in
    _isSignedIn();
  }, []);
  const _isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      // Set User Info if user is already signed in
      setLoading(false);
      setLogin(true);
      console.log("signed in " + rol);
      console.log("signed in " + email)
      if (rol === "admin") {
        props.navigation.navigate("Lista Usuarios");
      }
      else if (rol === "user") {
        props.navigation.navigate("QrGenerator", { email: email });
      }
      else { console.log("error") }
    } else {
      console.log('Please Login');
    }
    setGettingLoginStatus(false);
  };
  const _getCurrentUserInfo = async () => {
    try {

      const data = GoogleSignin.signIn()
        .then((data) => {
          const credential = auth.GoogleAuthProvider.credential(data.idToken)
          return auth().signInWithCredential(credential);
        })
        .then((user) => {
          // ** Now that the user is signed in, you can get the ID Token. **

          user.user.getIdToken(/* forceRefresh */ true).then(async function (idToken) {
            const data = {
              idToken: idToken,
              email: user.user.email
            }
            const token = await getAsyncStorageKey('token')

            if (!token) {
              await axios.post('https://ballin-api-stage.herokuapp.com/token', data)
                .then(async (response) => {
                  await setAsyncStorageKey('token', response.data.data.access_token)
                  await setAsyncStorageKey('refresh_token', response.data.data.refresh_token)
                })
                .then((error) => console.log(error))
            }
            await axios.post('https://ballin-api-stage.herokuapp.com/users', user.user, { headers: { 'Authorization': token } })
              .then(async (response) => {
                await setAsyncStorageKey("user_email", response.data.data.email);
                await setAsyncStorageKey("user_rol", response.data.data.rol); setEmail(response.data.data.email); setRol(response.data.data.rol)
              })
              .then((error) => console.log(error))
          })

        })
        .catch((error) => {
          const { code, message } = error;
        });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        alert('User has not signed in yet');
        console.log('User has not signed in yet');
      } else {
        alert("Unable to get user's info");
        console.log("Unable to get user's info");
      }
    }
  };
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
      await _getCurrentUserInfo()
      setLoading(false);
      setLogin(true);
      const userRol = await getAsyncStorageKey("user_rol")
      const userEmail = await getAsyncStorageKey("user_email")
      console.log("getuserinfo " + userRol);
      console.log("getuserinfo " + userEmail);
      if (userRol === "admin") {
        props.navigation.navigate("Lista Usuarios");
      }
      else if (userRol === "user") {
        props.navigation.navigate("QrGenerator", { email: userEmail });
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
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
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
      </View>
    );
  } else {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        {console.log("the rol is " + rol)}
        <View style={styles.container}>
          <View style={styles.container}>
            {login !== false ? (
              <>
                <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={_signOut}>
                  <Text>Logout</Text>
                </TouchableOpacity>
                <Button color='grey' title='>' onPress={() => rol === "admin" ? props.navigation.navigate('Lista Usuarios') : props.navigation.navigate('QrGenerator', { email: email })}></Button>
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
    backgroundColor: '#DDDDDD',
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
