import { NextRequest, NextResponse } from 'next/server'

const API_URL = process.env.API_URL || 'http://localhost:8000/api'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        
        const res = await fetch(`${API_URL}/auth/register/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })

        const data = await res.json()

        if (!res.ok) {
            return NextResponse.json({ 
                error: data.message || data.detail || data.error || 'Error al registrar usuario' 
            }, { status: res.status })
        }
        
        return NextResponse.json({ 
            success: true,
            message: data.message || 'Usuario registrado exitosamente',
            data: data.data || data
        })
    } catch (error) {
        return NextResponse.json({ 
            error: 'Error de conexión con el servidor' 
        }, { status: 500 })
    }
}
