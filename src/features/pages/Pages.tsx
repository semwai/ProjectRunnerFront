import React from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {deletePage, selectPages,} from './pagesSlice';
import styles from './Pages.module.css'
import {Link} from "react-router-dom";
import {Spinner} from "../spinner/Spinner";
import {TinyPage} from "../../app/interfaces";
import {selectLogin} from "../login/loginSlice";

function ProjectComponent(props: TinyPage) {
    const login = useAppSelector(selectLogin);
    //const ex = props.example.length > 25 ? props.example.substring(0, 25) + '...' : props.example
    return (
        <div className={styles.project}>
            <div className={styles.name}>
                <Link to={"/page/" + props.id} className={styles.link}>{props.name}</Link> {login.access === "admin" ?
                <><EditPageLink id={props.id}/> <br/> <RemovePageButton id={props.id}/></>: <></>}
            </div>
            <div className={styles.description}>
                {props.short_description}
            </div>
        </div>)
}

function EditPageLink(props: { id: number }) {
    return (
        <Link className={styles.edit_link} to={`/page/${props.id}/edit`}>Изменить</Link>
    )
}

function RemovePageButton(props: { id: number }) {
    const dispatch = useAppDispatch();

    const remove = () => {
        const ok = window.confirm(`Действительно хотите удалить страницу ${props.id}`)
        if (ok) {
            dispatch(deletePage(props.id))
        }
    }
    return (
        <button className={styles.edit_link} onClick={remove}>Удалить</button>
    )
}

function NewPageLink() {
    return (
        <div className={styles.project}>
            <Link className={styles.new_link} to="/page/new">Добавить страницу</Link>
        </div>
    )
}


export function Pages() {
    const projects = useAppSelector(selectPages);
    const login = useAppSelector(selectLogin);
    let content

    switch (projects.status) {
        case 'loading':
            content = <div className={styles.spin}><Spinner/></div>
            break
        case 'idle':
            content = <>
                <h1>Добавление страниц</h1>
                {projects.value.map(p => <ProjectComponent {...p} key={p.id}/>)}
                {login.access === "admin" ? <NewPageLink/> : <></>}
            </>
            break
        case 'failed':
            content = 'server error'
            break
    }
    return <div className={styles.container}>
        {content}
    </div>
}