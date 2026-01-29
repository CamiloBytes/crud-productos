import { NextRequest, NextResponse } from 'next/server'

const API_URL = process.env.API_URL || 'http://localhost:8000/api'

export async function POST(request: NextRequest) {
    const { email, password } = await request.json()
    const res = await fetch(`${API_URL}/auth/login/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })

    if (!res.ok) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }
    const data = await res.json()
    // Suponiendo que el token viene en data.access o data.token
    const token = data.access || data.token
    const response = NextResponse.json({ success: true })
    response.cookies.set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24, // 1 día
    })
    return response
}