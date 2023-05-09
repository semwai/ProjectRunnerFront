import {Page} from "../../app/interfaces";

export async function fetchPage(id: number): Promise<Page> {
    let res = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/page/${id}`,
        {credentials: "include",})
    if (res.status !== 200)
        throw new Error(res.statusText)
    return res.json()
}
