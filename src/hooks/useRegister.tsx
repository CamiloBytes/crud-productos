import { RegisterData, RegisterResponse } from '@/types'

export async function registerUser(data: RegisterData): Promise<RegisterResponse> {
    const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

    const result = await res.json()

    if (!res.ok) {
        throw new Error(result.error || 'Error al registrar usuario')
    }

    return result
}
