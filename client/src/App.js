import {Switch, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Index from "./pages/Index";


function App() {
  return (
    <>
    <Navbar></Navbar>
    <Switch>
    <Route path = "/" exact><Index/></Route>
    </Switch>
    <Footer></Footer>
    </>
  );
}

export default App;
