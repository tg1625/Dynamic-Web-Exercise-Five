import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  userParams
} from "react-router-dom";
//pages
import UserProfile from './pages/UserProfile';
import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';
//styles
import './App.css';


/*----------- FIREBASE --------------*/
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";
// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

function App() {

  const [loggedIn, SetLoggedIn] = useState(false); //

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBb7zMsqHrYUXOYiivIP4W6ZIpZcetIWBM",
    authDomain: "exercise-five-6108b.firebaseapp.com",
    databaseURL: "https://exercise-five-6108b.firebaseio.com",
    projectId: "exercise-five-6108b",
    storageBucket: "exercise-five-6108b.appspot.com",
    messagingSenderId: "421960314954",
    appId: "1:421960314954:web:65a0755a44fefb237076b3"
  };
  //use effect to only initialize the app once
  useEffect(() => {
    if(!firebase.apps.length){ //checks if firebase is initialized (firebase.apps is an array)
      // only initialize app once
      firebase.initializeApp(firebaseConfig);
    }
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION) //using session storage, instead of cookie storage or local
      .catch(function(e) {
        console.log('AUTH ERROR', e);
      });
    
  }, [firebaseConfig]);


  //Login
  function LoginFunction(e){
    e.preventDefault();
    //console.log("Form payload", e); //this is the form stuff
    let email = e.currentTarget.loginEmail.value; //actually getting form values
    let password = e.currentTarget.loginPassword.value;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(function (response){
        console.log("Signed In", response);
        SetLoggedIn(true);
      })
      .catch(function(e) {
        console.log('Login  ERROR', e);
      });
  }

  //Logout 
  function LogoutFunction(){
    firebase.auth()
    .signOut()
    .then(function() {
      console.log("Signed out!");
      SetLoggedIn(false);
    })
    .catch(function(error) {
      // An error happened.
      console.log("Failed to log out", error);
    });
  }

  //Create Account
  function CreateAccountFunction(e){
    e.preventDefault();
    //console.log("Form payload", e); //this is the form stuff
    let email = e.currentTarget.createEmail.value; //actually getting form values
    let password = e.currentTarget.createPassword.value;

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(function (response){
        console.log("Account Created", response);
        SetLoggedIn(true); //they are loged in now
      })
      .catch(function(e) {
        console.log('CREATE ACCOUNT ERROR', e);
      });
  }

  return (
    <div className="siteWrapper">
      <Router>
        <Switch>
          {/* exact here makes it so the path thing doesnt cascade */}
          <Route exact path="/">
              <UserProfile LogoutFunction={LogoutFunction}/>
          </Route>
          <Route exact path="/login">
              <Login LoginFunction= {LoginFunction}/>
          </Route>
          <Route exact path="/create-account">
              <CreateAccount CreateAccountFunction={CreateAccountFunction}/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
