import React from 'react';
import './App.css';
import {Projects} from "./features/projects/Projects";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Project} from "./features/project/Project";
import {Header} from "./features/header/Header";

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<IndexPage/>}></Route>
                    <Route path="/projects" element={<ProjectsPage/>}></Route>
                    <Route path="/login" element={<LoginPage/>}></Route>
                    <Route path="/project/:id" element={<ProjectPage/>}></Route>
                </Routes>
            </div>
        </Router>
    );
}

function IndexPage() {
    return (
        <div className="App">
            <Header/>
            Hello
        </div>
    );
}

function ProjectsPage() {
    return (
        <div className="App">
            <Header/>
            <Projects/>
        </div>
    );
}

function ProjectPage() {
    return (
        <div className="App">
            <Header/>
            <Project/>
        </div>
    );
}

function LoginPage() {
    return (
        <div className="App">
            <Header/>
            login page
        </div>
    );
}

export default App;
