import {Project} from "../../app/interfaces";

export async function fetchProject(id: number): Promise<Project> {
    let res = await fetch(`http://${window.location.hostname}:8000/api/project/${id}`)
    return res.json()
}
