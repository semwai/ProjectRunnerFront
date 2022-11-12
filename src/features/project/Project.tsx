import React from "react";
import styles from './Project.module.css'
import {useAppSelector} from "../../app/hooks";
import {selectProject} from "./projectSlice";
import {Input} from "./Input";
import {Spinner} from "react-bootstrap";


export function Project() {
    const project = useAppSelector(selectProject)

    let content
    switch (project.status) {
        case 'idle':
            content = project.value ? (<>
                <div><h1>{project.value.name}</h1></div>
                <div className={styles.containerItem}><Input/></div>
                <div className={styles.containerItem}>terminal</div>
            </>) : <Spinner className={styles.center}/>
            break
        case 'loading':
            content = <Spinner className={styles.center}/>
            break
        case 'failed':
            content = 'server error'
            break
    }

    return (<div className={styles.container}>{content}</div>)
}