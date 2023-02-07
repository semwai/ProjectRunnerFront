import React from 'react';
import ReactMarkdown from "react-markdown";
import styles from './NewProjects.module.css'
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectNewProject, setDescription, setName, setShortDescription, setVersion} from "./newprojectsSlice";


export function NewProject() {
    const dispatch = useAppDispatch();
    const np = useAppSelector(selectNewProject);

    return <div>
        <h1>New Project</h1>
        <p><span className={styles.label}>name</span><input value={np.name} onChange={e => dispatch(setName(e.target.value))}/></p>
        <p><span className={styles.label}>version</span><input value={np.version} onChange={e => dispatch(setVersion(e.target.value))}/></p>
        <p><span className={styles.label}>short description</span><input value={np.short_description} onChange={e => dispatch(setShortDescription(e.target.value))}/></p>
        <p><span className={styles.label}>description (markdown):</span></p>
        <div className={styles.row}>
            <div className={styles.column}>
                <textarea value={np.description} onChange={e => dispatch(setDescription(e.target.value))}/>
            </div>
            <div className={styles.column}>
                <ReactMarkdown>{np.description}</ReactMarkdown>
            </div>
        </div>
        <h1><button>Save</button></h1>
    </div>
}

export function UpdateProject(props: {id: Number}) {
    return <div>Update</div>
}