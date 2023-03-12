import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectLogin} from "../login/loginSlice";
import React, {useEffect} from "react";
import {getPage} from "../page/pageSlice";
import {Header} from "./header/Header";
import {Page} from "../page/Page";
import {ComponentLogin} from "./ComponentLogin";
import './Default.css';

export function ComponentPage() {
    const {id} = useParams()
    const dispatch = useAppDispatch();
    const login = useAppSelector(selectLogin);


    useEffect(() => {
        // fetch data
        if (typeof id === "string" && login.auth) {
            dispatch(getPage(parseInt(id)))
        }
    }, [dispatch, id, login.auth]);

    switch (login.auth) {
        case -1:
            return <></>
        case 0:
            return <ComponentLogin/>
        case 1:
            return (
                <div className="App">
                    <Header/>
                    <Page/>
                </div>
            );
    }
}