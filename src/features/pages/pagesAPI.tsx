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
