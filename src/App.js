import React from 'react';
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

function App() {
  return (
    <div className="siteWrapper">
      <Router>
        <Switch>
          <Route exact path="/login"><Login/></Route>
          <Route exact path="/create-account"><CreateAccount/></Route>
          {/* exact here makes it so the path thing doesnt cascade */}
          <Route exact path="/"><UserProfile/></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
