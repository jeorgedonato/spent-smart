import React, {useEffect} from 'react';
import {loadUser} from './actions/auth';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import store from './store';
import setAuthToken from './utils/setAuthToken';
import { Provider } from 'react-redux';
import ExpensesPage from './pages/Expenses';
import PrivateRoute from './components/routing/PrivateRoute';
import Alert from './components/Alert';
import {Container} from 'react-bootstrap';
import Confirm from './pages/Confirm';
import NotFound from './pages/NotFound';
import Dashboard from './pages/Dashboard'
import './App.css'
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
        <div className= "content">
        <Navbar />
        <Container>
        <Alert />
        <Switch>
          <Route path="/confirm/:id" component={Confirm} />
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={SignUpPage} />
          <PrivateRoute exact path="/dashboard" component={Dashboard}/>
          <PrivateRoute exact path="/income" component={Income} />
          <PrivateRoute exact path="/income-record" component={IncomeRecord} />
          <PrivateRoute exact path="/expenses" component={ExpensesPage}/>
          <Route component={NotFound}></Route>
        </Switch>
        </Container>
        </div>
        <Footer />
      </Router>
    </Provider>
    </>
  );
}

export default App;
