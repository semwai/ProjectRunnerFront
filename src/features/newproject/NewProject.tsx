import React from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import styles from "./NewProject.module.css";
import {addPage, selectNewProject, setProjectDescription, setProjectName, setDescription} from "./newprojectSlice";
import {Content, Entry} from "../../app/interfaces";
import {selectPages} from "../pages/pagesSlice";
import {ProjectComponent} from "../project/Project";


export function NewProject() {
    const dispatch = useAppDispatch();
    const np = useAppSelector(selectNewProject);

    return <div className={styles.container}>

        <h1>Новый проект</h1>
        <p><span className={styles.label}>Название</span><input value={np.name}
                                                                onChange={e => dispatch(setProjectName(e.target.value))}/>
        </p>
        <p><span className={styles.label}>Описание</span><input value={np.description}
                                                                onChange={e => dispatch(setProjectDescription(e.target.value))}/>
        </p>
        <p><span className={styles.label}>Публичный</span><input type='checkbox' value='false'/>
        </p>
        <h2>Оглавление</h2>
        <NewContent c={np.content} path={[0]}/>
        <h1>
            <button>сохранить</button>
        </h1>

        <hr/>
        <ProjectComponent {...np}/>
    </div>
}

function NewContent(p: { c: Content, path: number[] }) {
    const dispatch = useAppDispatch();




    return <ol>
        <details open>
            <summary>
                <p><input type="text" value={p.c.description} onChange={e => dispatch(setDescription({path: p.path, value: e.target.value}))}/></p>
            </summary>
            {
                p.c.data?.map((v, i) =>
                    <li key={i}>{
                        (v as Content).data?
                            <NewContent c={v as Content} path={[...p.path, i]}/>:
                            <NewEntry c={v as Entry} path={[...p.path, i]}/>
                    }</li>
                )
            }

            <p>
                <button onClick={() => dispatch(addPage({path: p.path, obj: {id: 0, short_description: ''}}))}>Добавить страницу</button>
                <button onClick={() => dispatch(addPage({path: p.path, obj: {description: 'описание раздела', data: []}}))}>Добавить раздел</button>
            </p>
        </details>
    </ol>
}

function NewEntry(p: { c: Entry, path: number[] }) {
    const pages = useAppSelector(selectPages)
    const dispatch = useAppDispatch()

    return <select value={p.c.short_description} onChange={event => dispatch(setDescription({path: p.path, value: event.target.value}))}>
        <option key={-1} value=''></option>
        {
            pages.value.map((page, i) => <option key={i} value={page.short_description}>#{page.id} {page.short_description}</option>)
        }
    </select>
}