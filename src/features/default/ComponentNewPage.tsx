import {useParams} from "react-router-dom";
import {Header} from "./header/Header";
import {NewPage, UpdateProject} from "../newpage/NewPage";
import React from "react";
import './Default.css';

export function ComponentNewPage() {
    const {id} = useParams()

    if (id !== undefined)
        return <div className="App">
            <Header/>
            <UpdateProject id={Number(id)}/>
        </div>
    else
        return <div className="App">
            <Header/>
            <NewPage/>
        </div>
}