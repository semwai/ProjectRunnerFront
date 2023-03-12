import React from 'react';
import {GoogleOAuthProvider} from '@react-oauth/google';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Component404} from "./features/default/Component404";
import {ComponentIndex} from "./features/default/ComponentIndex";
import {ComponentPages} from "./features/default/ComponentPages";
import {ComponentNewPage} from "./features/default/ComponentNewPage";
import {ComponentPage} from "./features/default/ComponentPage";
import {ComponentLogin} from "./features/default/ComponentLogin";
import {ComponentProjects} from "./features/default/ComponentProjects";
import {ComponentProject} from "./features/default/ComponentProject";

function App() {
    return (
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ''}>
            <Router>
                <div>
                    <Routes>
                        <Route path="/" element={<ComponentIndex/>}></Route>
                        <Route path="/pages" element={<ComponentPages/>}></Route>
                        <Route path="/login" element={<ComponentLogin/>}></Route>
                        <Route path="/page/:id" element={<ComponentPage/>}></Route>
                        <Route path="/page/:id/edit" element={<ComponentNewPage/>}></Route>
                        <Route path="/page/new" element={<ComponentNewPage/>}></Route>
                        <Route path="/projects" element={<ComponentProjects/>}></Route>
                        <Route path="/project/:id" element={<ComponentProject/>}></Route>
                        <Route path="*" element={<Component404/>}></Route>
                    </Routes>
                </div>
            </Router>
        </GoogleOAuthProvider>
    );
}

export default App;
