import React from 'react';
import './App.css';
import {Projects} from "./features/projects/Projects";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import {Project} from "./features/project/Project";

function App() {
    return (
        <Router>
            <div>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/projects">projects</Link>
                    </li>
                    <li>
                        <Link to="/user">user</Link>
                    </li>
                </ul>

                <hr />

                <Routes>
                    <Route path="/" element={ <Base />}></Route>
                    <Route path="/projects" element={ <Base />}></Route>
                    <Route path="/user" element={ <Base />}></Route>
                    <Route path="/project/:id" element={ <Project />}></Route>

                </Routes>
            </div>
        </Router>
    );
}


function Base() {
    return (
        <div className="App">
            <header className="App-header">
                <Projects/>

            </header>
        </div>
    );
}
export default App;
