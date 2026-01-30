import { Product, UpdateProductData } from '@/types'

export async function updateProduct(data: UpdateProductData): Promise<Product> {
    const { id, ...productData } = data
    
    const res = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
    })

    const result = await res.json()

    if (!res.ok) {
        throw new Error(result.error || 'Error al actualizar el producto')
    }

    return result.data
}
