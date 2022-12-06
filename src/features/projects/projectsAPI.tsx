import {TinyProject} from "../../app/interfaces";

interface FetchProject {
    data: TinyProject[]
}

export async function fetchProjects(): Promise<FetchProject> {
    let res = await fetch(`http://${window.location.hostname}:8000/api/projects`)
    return res.json()
}
