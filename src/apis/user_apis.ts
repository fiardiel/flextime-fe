import LoginForm from "../types/user/LoginForm"
import User from "../types/user/User"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const register = async ({ user }: { user: User }): Promise<User> => {
    const res = await fetch(`${baseUrl}/register`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    const data = await res.json()
    if (!res.ok) {
        if (data.email) {
            throw new Error(data.email)
        }
        throw new Error(data.username)
    }
    return data
}


export const login = async ({ loginForm }: { loginForm: LoginForm }): Promise<string> => {
    console.log('baseUrl', baseUrl)
    const res = await fetch(`${baseUrl}/login`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(loginForm)
    })
    const data = await res.json()
    if (!res.ok) {
        throw new Error("Invalid username or password")
    }
    return data.token
}

export const logout = async (): Promise<void> => {
    const res = await fetch(`${baseUrl}/logout`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        }
    })
    const data = await res.json()
    return data
}

export const getUser = async (token: string | undefined): Promise<number> => {
    const res = await fetch(`${baseUrl}/test_token`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Token ${token}`
        }
    })
    const data = await res.json()
    return data.user_id
}
