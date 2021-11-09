import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import SearchState from "./context/searchBar/SearchState";
import TagState from "./context/tags/TagState";
import Alert from "./components/Alert";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Archive from "./components/Archive";

function App() {

    let [alert,createAlert]=useState(null)

    function showAlert(message,type){
        createAlert(
            {
                message:message,
                type:type
            }
        )
        setTimeout(() => {
            createAlert(null)
        }, 1000);

    }



    return (
        <>
        <NoteState showAlert={showAlert}>
            <SearchState showAlert={showAlert}>
                <TagState showAlert={showAlert}>
        

                    <div id="main">
                        <Router>
                            <div>
                                <Navbar showAlert={showAlert}/>
                                <Alert alert={alert}/>
                                <Switch>
                                    <Route exact path="/archive">
                                        <Archive showAlert={showAlert}/>
                                    </Route>
                                    <Route exact path="/">
                                        <Home showAlert={showAlert}/>
                                    </Route>
                                    <Route exact path="/about">
                                        <About showAlert={showAlert}/>
                                    </Route>
                                    <Route exact path="/login">
                                        <Login showAlert={showAlert}/>
                                    </Route>
                                    <Route exact path="/signup">
                                        <Signup showAlert={showAlert}/>
                                    </Route>
                                </Switch>
                            </div>
                        </Router>
                    </div>
                    <Footer/>
                </TagState>
            </SearchState>
        </NoteState>
        </>
    );
}

export default App;
