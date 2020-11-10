import {Switch, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// import Index from "./pages/index";


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
