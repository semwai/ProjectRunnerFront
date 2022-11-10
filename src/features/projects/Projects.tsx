import React from 'react';
import {useAppSelector} from '../../app/hooks';
import {Project, selectTest,} from './projectsSlice';
import {Spinner} from "react-bootstrap";
import styles from './Projects.module.css'
import {Link} from "react-router-dom";


function ProjectComponent(props: Project) {
    //const ex = props.example.length > 25 ? props.example.substring(0, 25) + '...' : props.example
    return <Link className={styles.project} to={"/project/" + props.id}><div>{props.name}</div></Link>
}

export function Projects() {
    const store = useAppSelector(selectTest);

    return <div className={styles.container}>{store.status === 'loading'?<Spinner className={styles.spin}/>:''}
        {store.projects.map(p =>
            <ProjectComponent {...p} key={p.id}/>
        )}
    </div>
}