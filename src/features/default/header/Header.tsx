import {Link} from "react-router-dom";
import React from "react";
import styles from './Header.module.css';
import {useAppSelector} from "../../../app/hooks";
import {selectLogin} from "../../login/loginSlice";


export function Header() {
    const login = useAppSelector(selectLogin);

    return (<div className={styles.container}>
        <Link className={[styles.link, styles.left].join(' ')} to="/">CodeRunner</Link>
        <Link className={styles.link} to="/projects">Проекты</Link>
        <Link className={[styles.link, styles.right].join(' ')} to="/login">{login.auth?"Аккаунт":"Войти"}</Link>
    </div>)
}