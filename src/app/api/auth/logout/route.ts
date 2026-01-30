import { NextResponse } from 'next/server'

export async function POST() {
    const response = NextResponse.json({ success: true, message: 'Sesión cerrada' })
    
    // Eliminar cookie token (httpOnly)
    response.cookies.set('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 0, // Expira inmediatamente
    })
    
    // Eliminar cookie role
    response.cookies.set('role', '', {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 0,
    })
    
    return response
}
