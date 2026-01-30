import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Rutas públicas que no requieren autenticación
const publicRoutes = ['/login', '/register']

// Rutas protegidas y sus roles permitidos
const protectedRoutes: { path: string; roles: string[] }[] = [
    { path: '/dashboard', roles: ['admin', 'user', 'manager'] },

]

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl
    const token = request.cookies.get('token')?.value
    const role = request.cookies.get('role')?.value || 'user'

    // Si el usuario está autenticado y trata de acceder a login/register, redirigir al dashboard
    if (token && publicRoutes.some(route => pathname.startsWith(route))) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    // Si el usuario no está autenticado y trata de acceder a rutas protegidas, redirigir al login
    if (!token && protectedRoutes.some(route => pathname.startsWith(route.path))) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    // Verificar permisos de rol para rutas protegidas
    if (token) {
        const matchedRoute = protectedRoutes.find(route => pathname.startsWith(route.path))
        if (matchedRoute && !matchedRoute.roles.includes(role)) {
            // Usuario no tiene permiso, redirigir a una página de acceso denegado o dashboard
            return NextResponse.redirect(new URL('/dashboard?error=unauthorized', request.url))
        }
    }

    return NextResponse.next()
}

// Configurar en qué rutas se ejecuta el middleware
export const config = {
    matcher: [
        '/dashboard/:path*',
        '/login',
        '/register',
    ]
}
