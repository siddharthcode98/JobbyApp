import { Route, Switch, Redirect } from "react-router-dom";

import Home from "./components/Home";

import LoginForm from "./components/LoginForm";

import Jobs from "./components/Jobs";

import JobItemDetails from "./components/JobItemDetails";

import ProtectedRoute from "./components/ProtectedRoute";

import NotFound from "./components/NotFound";

import "./App.css";

const App = () => (
  <main className="main-container">
    <Switch>
      <Route exact path="/login" component={LoginForm} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/jobs" component={Jobs} />
      <ProtectedRoute exact path="/jobs/:id" component={JobItemDetails} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="Not-Found" />
    </Switch>
  </main>
);

export default App;
