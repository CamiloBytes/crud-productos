export interface ApiResponse<T> {
    success: boolean
    data?: T
    message?: string
    error?: string
}

export interface ApiErrorResponse {
    error: string
    message?: string
    status?: number
}
