import {Header} from "./header/Header";
import {NewPage} from "../newpage/NewPage";
import React, {useEffect} from "react";
import './Default.css';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectLogin} from "../login/loginSlice";
import {initialNewPageState, selectNewPage, setNewPageValue} from "../newpage/newpageSlice";
import {ComponentLogin} from "./ComponentLogin";

export function ComponentNewPage() {
    const login = useAppSelector(selectLogin)
    const newPage = useAppSelector(selectNewPage)
    const dispatch = useAppDispatch()

    useEffect(() => {
        // fetch data
        if (login.auth && newPage.id > 0) {
            dispatch(setNewPageValue(initialNewPageState))
        }
    }, [login.auth, newPage.id, dispatch])

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