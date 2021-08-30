import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.css";
import "./components/Table.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute";
import Header from "./components/Header";
import FlyScreen from "./screens/FlyScreen";
import HomeScreen from "./screens/HomeScreen";
import LandingScreen from "./screens/LandingScreen";
import ScheduleScreen from "./screens/ScheduleScreen";
import SetScreen from "./screens/SetScreen";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <main>
          <Route exact path="/" component={LandingScreen} />
          <PrivateRoute path="/home" component={HomeScreen} />
          <PrivateRoute path="/set" component={SetScreen} />
          <PrivateRoute path="/schedule" component={ScheduleScreen} />
          <PrivateRoute path="/fly" component={FlyScreen} />
        </main>
      </Router>
    </AuthProvider>
  );
}

export default App;
