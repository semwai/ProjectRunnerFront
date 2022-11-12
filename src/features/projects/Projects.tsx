import React from 'react';
import {useAppSelector} from '../../app/hooks';
import {Project, selectProjects,} from './projectsSlice';
import {Spinner} from "react-bootstrap";
import styles from './Projects.module.css'
import {Link} from "react-router-dom";


function ProjectComponent(props: Project) {
    //const ex = props.example.length > 25 ? props.example.substring(0, 25) + '...' : props.example
    return (
    <Link className={styles.project} to={"/project/" + props.id}>
        <div className={styles.name}>
            {props.name}
        </div>
        <div className={styles.description}>
            {props.description}
        </div>
    </Link>)
}

export function Projects() {
    const projects = useAppSelector(selectProjects);

    let content

    switch (projects.status) {
        case 'loading':
            content = <Spinner className={styles.spin}/>
            break
        case 'idle':
            content = projects.value.map(p =>
                <ProjectComponent {...p} key={p.id}/>
            )
            break
        case 'failed':
            content = 'server error'
            break
    }
    return <div className={styles.container}>
        {content}
    </div>
}