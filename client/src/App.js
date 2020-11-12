import {Switch, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoginPage from "./pages";

function App() {
  return (
    <>
    <Navbar></Navbar>
    <Switch>
    <Route path = "/" exact></Route>
    </Switch>
    <Footer></Footer>
    </>
  );
}

export default App;
