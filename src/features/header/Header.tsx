import {Link} from "react-router-dom";
import React from "react";
import styles from './Header.module.css';


export function Header() {
    return (<div className={styles.container}>
        <Link className={styles.link} to="/">CodeRunner</Link>
        <Link className={styles.link} to="/projects">Проекты</Link>
        <Link className={styles.link} to="/login">Войти</Link>
    </div>)
}