import React, {useEffect} from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import './App.css';
import {Projects} from "./features/projects/Projects";
import {BrowserRouter as Router, Route, Routes, useParams} from "react-router-dom";
import {Project} from "./features/project/Project";
import {Header} from "./features/header/Header";
import {useAppDispatch, useAppSelector} from "./app/hooks";
import {getProject} from "./features/project/projectSlice";
import {Logout, postLogin, selectLogin} from "./features/login/loginSlice";
import {getProjects} from "./features/projects/projectsSlice";

function App() {
    return (
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ''}>
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
        </GoogleOAuthProvider>
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
    const login = useAppSelector(selectLogin);

    if (!login.auth) {
        return <LoginPage/>
    }
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
    const login = useAppSelector(selectLogin);



    useEffect(() => {
        // fetch data
        if (typeof id === "string" && login.auth) {
            dispatch(getProject(parseInt(id)))
        }
    },[dispatch, id, login.auth]);

    switch (login.auth) {
        case -1:
            return <></>
        case 0:
            return <LoginPage/>
        case 1:
            return (
                <div className="App">
                    <Header/>
                    <Project/>
                </div>
            );
    }
}

function LoginPage() {
    const dispatch = useAppDispatch();
    const login = useAppSelector(selectLogin);

    let content = <GoogleLogin
        theme="filled_black"
        width="300px"
        onSuccess={credentialResponse => {
            dispatch(postLogin(credentialResponse.credential!))
            setTimeout(() => {dispatch(getProjects())}, 1000)
        }}
        onError={() => {
            alert('Login Failed');
        }}
    />

    if (login.auth) {
        content = <div>Здравствуйте, {login.mail} <div onClick={() => dispatch(Logout())}>Выйти</div>
        </div>

    }

    return (
        <div className="App">
            <Header/>
            <br/>
            <div className="App-header">
                {content}
            </div>
        </div>
    );
}

export default App;
