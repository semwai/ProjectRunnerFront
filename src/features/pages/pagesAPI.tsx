import {TinyPage} from "../../app/interfaces";

interface FetchPages {
    data: TinyPage[]
}

export async function fetchPages(): Promise<FetchPages> {
    let res = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/pages`,
        {credentials: "include",})
    if (res.status !== 200)
        throw new Error(res.statusText)
    return res.json()
}

export async function fetchDeletePage(id: Number): Promise<Boolean> {
    let res = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/page?id=${id}`,
        {credentials: "include", method: "DELETE"})
    if (res.status !== 200)
        throw new Error(res.statusText)
    return res.json()
}