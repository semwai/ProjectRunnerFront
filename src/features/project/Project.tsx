import React from 'react';
import {useAppSelector} from '../../app/hooks';
import styles from './Project.module.css'
import {Link} from "react-router-dom";
import {Spinner} from "../spinner/Spinner";
import {Content, Project} from "../../app/interfaces";
import {selectProjects} from "../projects/projectsSlice";
import ReactMarkdown from "react-markdown";
import ComponentError from "../default/СomponentError";


export function ProjectComponent(props: Project) {
    return (
    <div className={styles.project} >
        <div>
            <h2>{props.name}</h2>
        </div>
        <div>
            <ReactMarkdown>
                {props.description}
            </ReactMarkdown>
        </div>
        <ContentComponent {...props.content}/>
    </div>)
}

function ContentComponent(c: Content) {
    if ('id' in c && 'short_description' in c) {
        return <li><Link className={styles.link} to={`/page/${c.id}`}>{String(c.short_description)}</Link></li>
    } else {
        return <div>
            {c.description}
            <ul>{c.data.map((ch, i) => <ContentComponent key={i}  {...ch as Content}/>)}</ul>
        </div>
    }
}

export function OneProject(props: {id: number}) {
    const projects = useAppSelector(selectProjects);
    let content


    switch (projects.status) {
        case 'loading':
            content = <div className={styles.spin}><Spinner/></div>
            break
        case 'idle':
            let project = projects?.value?.filter(p => p.id === props.id).at(0)
            if (project === undefined) {
                return <ComponentError msg={'Проект не найден'}/>
            }
            content = <>
                {<ProjectComponent {...project}/>}
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