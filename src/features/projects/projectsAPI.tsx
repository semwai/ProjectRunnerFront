import {TinyProject} from "../../app/interfaces";

interface FetchProject {
    data: TinyProject[]
}

export async function fetchProjects(): Promise<FetchProject> {
    let res = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/projects`,
        {credentials: "include",})
    if (res.status !== 200)
        throw new Error(res.statusText)
    return res.json()
}
