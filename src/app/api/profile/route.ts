import { NextRequest, NextResponse } from 'next/server'

const API_URL = process.env.API_URL

export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get('token')?.value
        const userId = request.cookies.get('user_id')?.value
        
        if (!token) {
            return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
        }

        if (!userId) {
            return NextResponse.json({ error: 'Usuario no identificado' }, { status: 401 })
        }

        // Obtener el perfil del usuario por ID
        const response = await fetch(`${API_URL}/users/${userId}/`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        
        if (!response.ok) {
            return NextResponse.json({ error: 'Error al obtener el perfil' }, { status: response.status })
        }
        
        const data = await response.json()
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching profile' }, { status: 500 })
    }
}

export async function PUT(request: NextRequest) {
    try {
        const token = request.cookies.get('token')?.value
        const userId = request.cookies.get('user_id')?.value
        
        if (!token) {
            return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
        }

        if (!userId) {
            return NextResponse.json({ error: 'Usuario no identificado' }, { status: 401 })
        }

        const profileData = await request.json()
        const response = await fetch(`${API_URL}/users/${userId}/`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(profileData),
        })
        
        if (!response.ok) {
            const errorData = await response.json()
            return NextResponse.json({ error: errorData.message || 'Error updating profile' }, { status: response.status })
        }
        
        const data = await response.json()
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json({ error: 'Error updating profile' }, { status: 500 })
    }
}
