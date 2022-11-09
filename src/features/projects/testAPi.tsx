
// A mock function to mimic making an async request for data
import {Project} from "./testSlice";

interface FetchProject {
    data: Project[]
}

export async function fetchProjects(): Promise<FetchProject> {
    let res = await fetch('/api/projects')
    return res.json()
}
