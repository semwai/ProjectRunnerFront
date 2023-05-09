import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import styles from "./NewProject.module.css";
import {
    addPage,
    postProject,
    removeItem,
    selectNewProject,
    setContentDescription,
    setEntryDescription,
    setProjectDescription,
    setProjectName,
    setProjectPublic
} from "./newprojectSlice";
import {Content, Entry} from "../../app/interfaces";
import {selectPages} from "../pages/pagesSlice";
import {ProjectComponent} from "../project/Project";
import 'primeicons/primeicons.css'

export function NewProject() {
    const dispatch = useAppDispatch();
    const np = useAppSelector(selectNewProject);

    return <div className={styles.container}>

        {np.id === 0?<h1>Новый проект</h1>:<h1>Редактирование проекта #{np.id}</h1>}
        <p><span className={styles.label}>Название</span><input value={np.name}
                                                                onChange={e => dispatch(setProjectName(e.target.value))}/>
        </p>
        <p><span className={styles.label}>Описание</span><input value={np.description}
                                                                onChange={e => dispatch(setProjectDescription(e.target.value))}/>
        </p>
        <p><span className={styles.label}>Публичный</span><input type='checkbox' value={String(np.public)}
                                                                 onChange={e => dispatch(setProjectPublic(e.target.checked))}/>
        </p>
        <h2>Оглавление</h2>
        <NewContent c={np.content} path={[]}/>
        <h1>
            <button onClick={() => dispatch(postProject(np))}>сохранить</button>
        </h1>


        <ProjectComponent {...np}/>
    </div>
}

function NewContent(p: { c: Content, path: number[] }) {
    const dispatch = useAppDispatch();
    const [border, setBorder] = useState(false)

    return <ol style={{outline: border ? '2px solid black' : ''}}>
        <p>
            {p.path.length > 0 ? <input type="text" value={p.c.description}
                                        onChange={e => dispatch(setContentDescription({
                                            path: p.path,
                                            value: e.target.value
                                        }))}/>
                : <></>}
        </p>
        {
            p.c.data?.map((v, i) =>
                <li key={i}>{
                    (v as Content).data ?
                        <NewContent c={v as Content} path={[...p.path, i]}/> :
                        <NewEntry c={v as Entry} path={[...p.path, i]}/>
                }</li>
            )
        }

        <p>
            <button onClick={() => dispatch(addPage({path: p.path, obj: {id: 0, short_description: ''}}))}>Добавить
                страницу
            </button>
            &nbsp;
            <button onClick={() => dispatch(addPage({
                path: p.path,
                obj: {description: 'описание раздела', data: []}
            }))}>Добавить раздел
            </button>
            &nbsp;
            {p.path.length > 0 &&
                <button onClick={() => dispatch(removeItem(p.path))} onMouseEnter={() => setBorder(true)}
                        onMouseLeave={() => setBorder(false)}><i className="pi pi-times"></i></button>}
        </p>
    </ol>
}

function NewEntry(p: { c: Entry, path: number[] }) {
    const pages = useAppSelector(selectPages)
    const dispatch = useAppDispatch()

    return <div><select value={p.c.id}
                        onChange={event => dispatch(setEntryDescription({
                            path: p.path,
                            value: {id: Number(event.target.value), short_description: pages.value.filter(v => v.id === Number(event.target.value))[0]?.short_description}
                        }))}>
        <option key={-1} value=''></option>
        {
            pages.value.map(page =>
                <option key={page.id} value={String(page.id)}>
                    #{page.id} {page.short_description}
                </option>)
        }
    </select>
        <button onClick={() => dispatch(removeItem(p.path))}><i className="pi pi-times"></i></button>
    </div>
}