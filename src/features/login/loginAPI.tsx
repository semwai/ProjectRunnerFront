interface FetchLogin {
    email: string
}

export async function fetchLogin(token: string): Promise<FetchLogin> {
    let res = await fetch(`http://${window.location.hostname}:8000/api/auth`,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify({token: token})
        })
    return res.json()
}

export async function fetchTestLogin(): Promise<FetchLogin> {
    let res = await fetch(`http://${window.location.hostname}:8000/api/me`,
        {

            credentials: "include",
        })
    return res.json()
}