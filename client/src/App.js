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
import IncomesPage from './pages/Incomes';
import AddIncomesPage from './pages/Incomes/Add';
import UpdateIncomesPage from './pages/Incomes/Update';
import ExpensesPage from './pages/Expenses';
import AddExpensesPage from './pages/Expenses/Add';
import UpdateExpensesPage from './pages/Expenses/Update';
import Profile from './pages/Profile';
import PrivateRoute from './components/routing/PrivateRoute';
import Alert from './components/Alert';
import {Container} from 'react-bootstrap';
import Confirm from './pages/Confirm';
import NotFound from './pages/NotFound';
import Dashboard from './pages/Dashboard';
import ExpensePie from './pages/Reports';
import IncomePieChart from './pages/Reports/IncomePieChart';
import YearlySavings from './pages/Reports/YearlySavings';
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
          <PrivateRoute exact path="/incomes" component={IncomesPage} />
          <PrivateRoute exact path="/incomes/add" component={AddIncomesPage} />
          <PrivateRoute exact path="/incomes/update/:id" component={UpdateIncomesPage} />
          <PrivateRoute exact path="/expenses" component={ExpensesPage}/>
          <PrivateRoute exact path="/expenses/add" component={AddExpensesPage}/>
          <PrivateRoute exact path="/expenses/update/:id" component={UpdateExpensesPage}/>
          <PrivateRoute exact path="/report" component={ExpensePie}/>
          <PrivateRoute exact path="/report/income" component={IncomePieChart}/>
          <PrivateRoute exact path="/report/savings" component={YearlySavings}/>
          <PrivateRoute exact path="/profile" component={Profile}/>
          <Route component={NotFound}></Route>
        </Switch>
        </Container>
        <Footer />
        </div>
      </Router>
    </Provider>
    </>
  );
}

export default App;