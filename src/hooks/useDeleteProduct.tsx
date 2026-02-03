import toast from 'react-hot-toast'

export const deleteProduct = async (id: number): Promise<void> => {
    try {
        const response = await fetch(`/api/products/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.error || 'Error al eliminar el producto')
        }

        return await response.json()
    } catch (error) {
        if (error instanceof Error) {
            throw error
        }
        throw new Error('Error al eliminar el producto')
    }
}
