import { NextRequest, NextResponse } from 'next/server'

const API_URL = process.env.API_URL

export async function GET(request: NextRequest) {
    try {
        // Obtener el token de las cookies
        const token = request.cookies.get('token')?.value
        
        if (!token) {
            return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
        }

        // Obtener parámetros de paginación de la URL
        const { searchParams } = new URL(request.url)
        const page = searchParams.get('page') || '1'
        const perPage = searchParams.get('per_page') || '10'

        const response = await fetch(`${API_URL}/products/?page=${page}&per_page=${perPage}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        
        if (!response.ok) {
            return NextResponse.json({ error: 'Error al obtener productos' }, { status: response.status })
        }
        
        const data = await response.json()
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching products' }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    try {
        // Obtener el token de las cookies
        const token = request.cookies.get('token')?.value
        
        if (!token) {
            return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
        }

        // Obtener FormData con posible imagen
        const formData = await request.formData()
        
        // Crear FormData para enviar al backend
        const backendFormData = new FormData()
        
        // Copiar todos los campos al FormData del backend
        formData.forEach((value, key) => {
            backendFormData.append(key, value)
        })

        const response = await fetch(`${API_URL}/products/`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                // NO incluir Content-Type, fetch lo establecerá automáticamente con boundary
            },
            body: backendFormData,
        })
        
        if (!response.ok) {
            const errorData = await response.json()
            return NextResponse.json({ error: errorData.message || 'Error creating product' }, { status: response.status })
        }
        
        const data = await response.json()
        return NextResponse.json(data, { status: 201 })
    } catch (error) {
        console.error('Error creating product:', error)
        return NextResponse.json({ error: 'Error creating product' }, { status: 500 })
    }
}