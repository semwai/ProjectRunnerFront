import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import styles from './Project.module.css'
import {useAppSelector} from "../../app/hooks";
import {selectProject} from "./projectSlice";
import {store} from "../../app/store";
import {getProject} from "./projectSlice";
import {Input} from "./Input";
import {Spinner} from "react-bootstrap";
import {TerminalDemo} from "./terminal/TerminalDemo";


export function Project() {
    const {id} = useParams()
    //const [ code, setCode ] = useState(" ")
    const project = useAppSelector(selectProject)


    useEffect(() => {
        // fetch data
        if (typeof id === "string")
            store.dispatch(getProject(parseInt(id)))
    }, [id]);


    if (project.value == null) {
         return <Spinner className={styles.center}/>
    } else {
         return (
             <div className={styles.container}>
                 <div><h1>{project.value.name}</h1></div>
                 <div className={styles.containerItem}><Input/></div>
                 <div className={styles.containerItem}><TerminalDemo/></div>
             </div>)
    }

}