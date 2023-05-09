interface FetchLogin {
    email: string
    name: string
    access: "user" | "admin"
}

export async function fetchLogin(token: string): Promise<FetchLogin> {
    let res = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/auth`,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify({token: token})
        })
    if (res.status !== 200) {
        throw new Error(res.statusText);
    }
    return res.json()
}

export async function fetchTestLogin(): Promise<FetchLogin> {
    let res = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/me`,
        {
            credentials: "include",
        })
    if (res.status !== 200) {
        throw new Error(res.statusText);
    }
    return res.json()
}

export async function fetchLogout(): Promise<string> {
    let res = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/api/logout`,
        {
            credentials: "include",
        })
    if (res.status !== 200) {
        throw new Error(res.statusText);
    }
    return res.json()
}