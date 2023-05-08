import {Page} from "../../app/interfaces";


export async function fetchAddPage(body: Page): Promise<Page> {
    // Добавляет новую страницу, обновляет если есть
    let res = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/page`,

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
