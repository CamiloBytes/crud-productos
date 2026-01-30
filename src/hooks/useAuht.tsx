
export interface UserData {
    email: string;
    name: string;
    role: string;
}

export interface LoginResponse {
    success: boolean;
    user?: UserData;
    error?: string;
}

export async function loginUser(email: string, password: string): Promise<LoginResponse> {
    const res = await fetch('/api/auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })

    if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || 'Credenciales inválidas')
    }

    const data = await res.json()
    
    // Guardar datos del usuario en localStorage
    if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user))
    }
    
    return data
}

export async function logoutUser(): Promise<void> {
    // Llamar al endpoint de logout para eliminar cookies httpOnly
    await fetch('/api/auth/logout', { method: 'POST' })
    
    // Eliminar datos del localStorage
    localStorage.removeItem('user')
}

export function getUser(): UserData | null {
    if (typeof window === 'undefined') return null
    const userStr = localStorage.getItem('user')
    if (!userStr) return null
    try {
        return JSON.parse(userStr) as UserData
    } catch {
        return null
    }
}

export function getUserRole(): string {
    if (typeof document === 'undefined') return 'user'
    const cookies = document.cookie.split(';')
    const roleCookie = cookies.find(c => c.trim().startsWith('role='))
    return roleCookie ? roleCookie.split('=')[1] : 'user'
}

export function isAdmin(): boolean {
    return getUserRole() === 'admin'
}

export function hasRole(allowedRoles: string[]): boolean {
    return allowedRoles.includes(getUserRole())
}