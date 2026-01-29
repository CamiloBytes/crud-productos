import { useState } from "react"

export async function useLogin(email: string, password: string) {

    try {
    const res = await fetch('/api/auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })

    if (!res.ok) {
        throw new Error('Login failed')
    }

    const data = await res.json()
    return data
    } catch (error) {
        console.error('Error during login:', error)
        throw error
    }
}