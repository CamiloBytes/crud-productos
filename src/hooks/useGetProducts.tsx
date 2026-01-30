import { Product, PaginationInfo } from '@/types'
import { useState, useEffect, useCallback } from 'react'

export const useGetProducts = (initialPage: number = 1) => {
    const [products, setProducts] = useState<Product[]>([])
    const [pagination, setPagination] = useState<PaginationInfo | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(initialPage)
    
    const fetchProducts = useCallback(async (page: number = currentPage) => {
        setLoading(true)
        setError(null)
        try {
            const response = await fetch(`/api/products?page=${page}`)
            if (!response.ok) {
                throw new Error('Error al cargar productos')
            }
            const result = await response.json()
            
            // Extraer productos del campo data
            const productList = result.data || result.products || result
            
            if (Array.isArray(productList)) {
                setProducts(productList)
            } else {
                setProducts([])
            }
            
            // Extraer información de paginación si existe
            if (result.pagination) {
                setPagination(result.pagination)
            } else if (result.meta) {
                // Algunos backends usan "meta" para paginación
                setPagination({
                    current_page: result.meta.current_page || page,
                    last_page: result.meta.last_page || 1,
                    per_page: result.meta.per_page || 10,
                    total: result.meta.total || productList.length
                })
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Error desconocido')
        } finally {
            setLoading(false)
        }
    }, [currentPage])

    const goToPage = useCallback((page: number) => {
        setCurrentPage(page)
        fetchProducts(page)
    }, [fetchProducts])

    const nextPage = useCallback(() => {
        if (pagination && currentPage < pagination.last_page) {
            goToPage(currentPage + 1)
        }
    }, [pagination, currentPage, goToPage])

    const prevPage = useCallback(() => {
        if (currentPage > 1) {
            goToPage(currentPage - 1)
        }
    }, [currentPage, goToPage])

    useEffect(() => {
        fetchProducts()
    }, [])

    return { 
        products, 
        pagination, 
        error, 
        loading, 
        currentPage,
        refetch: () => fetchProducts(currentPage),
        goToPage,
        nextPage,
        prevPage
    }
}
