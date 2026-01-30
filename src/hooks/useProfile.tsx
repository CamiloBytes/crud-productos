import { User } from '@/types'
import { useState, useEffect, useCallback } from 'react'

export const useProfile = () => {
    const [user, setUser] = useState<User | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)

    const fetchProfile = useCallback(async () => {
        setLoading(true)
        setError(null)
        try {
            const response = await fetch('/api/profile')
            if (!response.ok) {
                throw new Error('Error al cargar el perfil')
            }
            const result = await response.json()
            setUser(result.user || result.data || result)
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Error desconocido')
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchProfile()
    }, [fetchProfile])

    return { user, error, loading, refetch: fetchProfile }
}

export interface UpdateProfileData {
    username?: string
    email?: string
    phone_number?: string
    avatar?: string
}

export async function updateProfile(data: UpdateProfileData): Promise<User> {
    const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

    const result = await res.json()

    if (!res.ok) {
        throw new Error(result.error || 'Error al actualizar el perfil')
    }

    return result.user || result.data || result
}
