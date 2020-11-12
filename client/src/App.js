import React, {useEffect} from 'react';
import {loadUser} from './actions/auth';
import {Switch, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import store from './store';
import setAuthToken from './utils/setAuthToken';
import { Provider } from 'react-redux';
// import Index from "./pages/Index";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <>
    <Provider store={store}>
      <Navbar></Navbar>
      <LoginPage />
      <Switch>
        <Route path = "/" exact></Route>
      </Switch>
      <Footer></Footer>
    </Provider>
    </>
  );
}

export default App;
