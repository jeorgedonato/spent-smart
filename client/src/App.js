import React, {useEffect} from 'react';
import {loadUser} from './actions/auth';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import store from './store';
import setAuthToken from './utils/setAuthToken';
import { Provider } from 'react-redux';
import ExpensesPage from './pages/Expenses/ExpensesPage';
import PrivateRoute from './components/routing/PrivateRoute'
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
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/login" component={LoginPage} />
          <PrivateRoute exact path="/dashboard" component={ExpensesPage}/>
          <PrivateRoute exact path="/expenses" component={ExpensesPage}/>
          <Route path="/" exact></Route>
        </Switch>
        <Footer />
      </Router>
    </Provider>
    </>
  );
}

export default App;
