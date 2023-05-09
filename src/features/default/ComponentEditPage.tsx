import {Header} from "./header/Header";
import {NewPage} from "../newpage/NewPage";
import React, {useEffect} from "react";
import './Default.css';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectLogin} from "../login/loginSlice";
import {useParams} from "react-router-dom";
import {selectPages} from "../pages/pagesSlice";
import {ComponentLogin} from "./ComponentLogin";
import {setNewPageValue} from "../newpage/newpageSlice";

export function ComponentEditPage() {
    const login = useAppSelector(selectLogin);
    const pages = useAppSelector(selectPages);
    const dispatch = useAppDispatch();
    const {id} = useParams()

    useEffect(() => {
        // fetch data
        if (typeof id === "string" && login.auth) {
            const current = pages.value.filter(p => p.id === Number(id))[0]
            dispatch(setNewPageValue(current))
            console.log(id)
        }
    }, [id, login.auth, dispatch, pages.value]);

    if (!login.auth) {
        return <ComponentLogin/>
    }
    if (login.access !== "admin") {
        return <p>403</p>
    }

    return <div className="App">
        <Header/>
        <NewPage/>
    </div>
}