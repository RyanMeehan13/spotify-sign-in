//Sample code from expo docs explaining how to set up spotify login. 


import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { Button, View, Text, StyleSheet } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

// Endpoint
const discovery = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
};

export default function App() {
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: 'PASTE CLIENT ID HERE', //my unique client id
      scopes: ['user-read-email', 'playlist-modify-public'],
      // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: false, //--above comments say this should be false, but spotify docs recommend using PKCE for mobile - idk
      redirectUri: makeRedirectUri({
        scheme: 'https://localhost:19006',
        path: "gdtlogin/",
      }),
    },
    discovery
  );

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;
      //console.log('Response = success!');
      alert("You've successfully signed into Spotify");
    }
  }, [response]);

  return (
  
<View style = {styles.container}>
    <Button
    style = {styles.button}
      disabled={!request}
      title="Login"
      onPress={() => {
        promptAsync();
      }}
    />
    <Text>Press the button to login using Spotify!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  button: {
    alignItems: "center",

    padding: 10
  },
})
