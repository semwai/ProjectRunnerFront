
// A mock function to mimic making an async request for data
import {Project} from "./projectsSlice";

interface FetchProject {
    data: Project[]
}

export async function fetchProjects(): Promise<FetchProject> {
    let res = await fetch(`http://${window.location.hostname}:8000/api/projects`)
    return res.json()
}
