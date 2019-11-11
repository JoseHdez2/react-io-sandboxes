import React from "react";
import { Button } from "react-bootstrap";
import * as firebase from "firebase";

class FirebaseTest extends React.Component {
  provider = null;
  constructor(props) {
    super(props);
    this.provider = new firebase.auth.GoogleAuthProvider();
    this.provider.setCustomParameters({
      login_hint: "user@example.com"
    });
  }

  onClickLogin = () => {
    firebase
      .auth()
      .signInWithPopup(this.provider)
      .then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  };

  render = () => (
    <div>
      <Button onClick={this.onClickLogin} />
    </div>
  );
}

export default FirebaseTest;
