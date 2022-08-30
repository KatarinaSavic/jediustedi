export default test;

import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import About from "./About";
import Home from "./Home";
import { UserContext } from "./UserContext";
const App = (props) => {
  return (
    <BrowserRouter>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
            </ul>
          </nav>
          <UserContext.Provider value="Hello">
            <Route path="/" exact component={Home} />
            <Route path="/about" exact component={About} />
          </UserContext.Provider>
        </div>
      </Router>
    </BrowserRouter>
  );
};

import React, { useContext } from "react";
import { UserContext } from "./UserContext";
const Home = (props) => {
  const message = useContext(UserContext);
  // message će imati vrednost Hello
  return (
    <div>
      <h1>Home</h1>
      <p>{message}</p>
    </div>
  );
};
