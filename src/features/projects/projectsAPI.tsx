import {TinyProject} from "../../app/interfaces";

interface FetchProject {
    data: TinyProject[]
}

export async function fetchProjects(): Promise<FetchProject> {
    let res = await fetch(`http://${window.location.hostname}:8000/api/projects`,
        {credentials: "include",})
    if (res.status !== 200)
        throw new Error(res.statusText)
    return res.json()
}
