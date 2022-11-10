
// A mock function to mimic making an async request for data
import {Project} from "./projectSlice";


export async function fetchProject(id: number): Promise<Project> {
    let res = await fetch(`/api/project/${id}`)
    return res.json()
}
