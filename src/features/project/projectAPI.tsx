import {Project} from "../../app/interfaces";

export async function fetchProject(id: number): Promise<Project> {
    let res = await fetch(`http://${window.location.hostname}:8000/api/project/${id}`,
        {credentials: "include",})
    if (res.status !== 200)
        throw new Error(res.statusText)
    return res.json()
}
