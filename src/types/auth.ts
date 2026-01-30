export interface LoginData {
    email: string
    password: string
}

export interface LoginResponse {
    success: boolean
    message?: string
    error?: string
}

export interface RegisterData {
    username: string
    email: string
    password: string
    password_confirmation: string
}

export interface RegisterResponse {
    success: boolean
    message?: string
    error?: string
}

export interface User {
    id: number
    username: string
    email: string
    phone_number?: string | null
    avatar?: string | null
    role?: string
    created_at?: string
    updated_at?: string
}
