import {Project} from "../../app/interfaces";


export async function fetchAddProject(body: Project): Promise<Project> {
    // Добавляет новую страницу, обновляет если есть
    let res = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/project`,

        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: "include",
            method: 'POST',
            body: JSON.stringify(body)
        })
    if (res.status !== 200)
        throw new Error(await res.text())
    return res.json()
}
