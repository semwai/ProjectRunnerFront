import React from 'react';
import {useAppSelector} from '../../app/hooks';
import {selectProjects,} from './projectsSlice';
import styles from './Projects.module.css'
import {Link} from "react-router-dom";
import {Spinner} from "../spinner/Spinner";
import {Project} from "../../app/interfaces";
import {selectLogin} from "../login/loginSlice";


function ProjectComponent(props: Project) {
    const login = useAppSelector(selectLogin);
    //const ex = props.example.length > 25 ? props.example.substring(0, 25) + '...' : props.example
    return (
    <div className={styles.project} >
        <div className={styles.name}>
            <Link to={"/project/" + props.id} className={styles.link}>{props.name}</Link> {login.access === "admin"?<EditProjectLink id={props.id}/>:<></>}
        </div>
        <div className={styles.description}>
            {props.description}
            {login.access === "admin"?<><br/><a href={`${process.env.REACT_APP_BACKEND_HOST}/api/project/${props.id}/json`}>Скачать</a></>:<></>}
        </div>
    </div>)
}

function EditProjectLink(props: {id: number}) {
    return (
            <Link className={styles.edit_link} to={`/project/${props.id}/edit`}>Изменить</Link>
    )
}

function NewProjectLink() {
    return (
        <div className={styles.project}>
            <Link className={styles.new_link} to="/project/new">Добавить проект</Link>
        </div>
    )
}


export function Projects() {
    const projects = useAppSelector(selectProjects);
    const login = useAppSelector(selectLogin);

    let content
    switch (projects.status) {
        case 'loading':
            content = <div className={styles.spin}><Spinner/></div>
            break
        case 'idle':
            content = <>
                {[...projects.value].sort((a, b) => a.id > b.id ? 1 : -1).map(p => <ProjectComponent {...p} key={p.id}/>)}
                {login.access === "admin"?<NewProjectLink/>:<></>}
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