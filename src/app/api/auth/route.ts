import { NextRequest, NextResponse } from 'next/server'

const API_URL = process.env.API_URL || 'http://localhost:8000/api'

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json()
        
        const res = await fetch(`${API_URL}/auth/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })

        const data = await res.json()

        if (!res.ok || !data.success) {
            return NextResponse.json({ 
                error: data.message || data.detail || data.error || 'Credenciales inválidas' 
            }, { status: 401 })
        }
        
        // Obtener token y rol del usuario (estructura: data.data.access_token)
        const backendData = data.data || data
        const token = backendData.access_token || backendData.access || backendData.token || backendData.key
        
        if (!token) {
            return NextResponse.json({ error: 'No se recibió token de autenticación' }, { status: 500 })
        }
        
        const user = backendData.user || {}
        const role = user.role || backendData.role || 'user'
        const userId = user.id || backendData.id
        
        const response = NextResponse.json({ 
            success: true,
            user: {
                id: userId,
                email: user.email || email,
                role: role,
                name: user.username || user.name || user.full_name || email.split('@')[0]
            }
        })
        
        // Guardar token en cookie httpOnly
        response.cookies.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24,
        })
        
        // Guardar rol en cookie (no httpOnly para poder leerla en el cliente)
        response.cookies.set('role', role, {
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24,
        })

        // Guardar user_id en cookie
        if (userId) {
            response.cookies.set('user_id', String(userId), {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                path: '/',
                maxAge: 60 * 60 * 24,
            })
        }
        
        return response
    } catch (error) {
        return NextResponse.json({ 
            error: 'Error de conexión con el servidor' 
        }, { status: 500 })
    }
}