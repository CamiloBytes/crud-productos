import { NextRequest, NextResponse } from 'next/server'

const API_URL = process.env.API_URL

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const token = request.cookies.get('token')?.value
        
        if (!token) {
            return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
        }

        const response = await fetch(`${API_URL}/products/${id}/`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        
        if (!response.ok) {
            return NextResponse.json({ error: 'Error al obtener el producto' }, { status: response.status })
        }
        
        const data = await response.json()
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching product' }, { status: 500 })
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const token = request.cookies.get('token')?.value
        
        if (!token) {
            return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
        }

        const productData = await request.json()
        const response = await fetch(`${API_URL}/products/${id}/`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
        })
        
        if (!response.ok) {
            const errorData = await response.json()
            return NextResponse.json({ error: errorData.message || 'Error updating product' }, { status: response.status })
        }
        
        const data = await response.json()
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json({ error: 'Error updating product' }, { status: 500 })
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const token = request.cookies.get('token')?.value
        
        if (!token) {
            return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
        }

        const response = await fetch(`${API_URL}/products/${id}/`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        
        if (!response.ok) {
            const errorData = await response.json()
            return NextResponse.json({ error: errorData.message || 'Error deleting product' }, { status: response.status })
        }
        
        return NextResponse.json({ success: true, message: 'Producto eliminado' })
    } catch (error) {
        return NextResponse.json({ error: 'Error deleting product' }, { status: 500 })
    }
}
