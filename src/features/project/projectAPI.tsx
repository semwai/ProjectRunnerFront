import {Project} from "../../app/interfaces";

export async function fetchProject(id: number): Promise<Project> {
    let res = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/project/${id}`,
        {credentials: "include",})
    if (res.status !== 200)
        throw new Error(res.statusText)
    return res.json()
}
