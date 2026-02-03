export type Status = 'disponible' | 'agotado' | 'bajo_stock' | string

export interface Product {
    id: number
    user_id?: number
    name: string
    sku: string
    category: string
    price: string | number
    stock: number
    status: Status
    image?: string
    created_at?: string
    updated_at?: string
}

export interface CreateProductData {
    name: string
    sku: string
    category: string
    price: number
    stock: number
    status: string
    avatar?: string
    image?: File | string
}

export interface UpdateProductData extends Partial<CreateProductData> {
    id: number
}

export interface PaginationInfo {
    current_page: number
    last_page: number
    per_page: number
    total: number
}

export interface ProductsResponse {
    data: Product[]
    pagination: PaginationInfo
}
