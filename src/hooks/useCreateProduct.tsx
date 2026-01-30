import { Product, CreateProductData } from '@/types'

export async function createProduct(data: CreateProductData): Promise<Product> {
    const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

    const result = await res.json()

    if (!res.ok) {
        throw new Error(result.error || 'Error al crear el producto')
    }

    return result.data
}
