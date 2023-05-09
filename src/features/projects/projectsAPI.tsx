import {Project} from "../../app/interfaces";


export async function fetchProjects(): Promise<Project[]> {
    let res = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/projects`,
        {credentials: "include",})
    if (res.status !== 200)
        throw new Error(res.statusText)
    return res.json()
}

export async function fetchDeleteProject(id: Number): Promise<Boolean> {
    let res = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/project?id=${id}`,
        {credentials: "include", method: "DELETE"})
    if (res.status !== 200)
        throw new Error(res.statusText)
    return res.json()
}