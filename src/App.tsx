import React, {useEffect} from 'react';
import './App.css';
import {Projects} from "./features/projects/Projects";
import {BrowserRouter as Router, Route, Routes, useParams} from "react-router-dom";
import {Project} from "./features/project/Project";
import {Header} from "./features/header/Header";
import {useAppDispatch} from "./app/hooks";
import {getProject} from "./features/project/projectSlice";

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
            Hello {process.env.BACKEND_HOST}
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
    const {id} = useParams()
    const dispatch = useAppDispatch();

    useEffect(() => {
        // fetch data
        if (typeof id === "string") {
            dispatch(getProject(parseInt(id)))
        }
    },[dispatch, id]);

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
