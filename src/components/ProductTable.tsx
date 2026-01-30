"use client"
import { useState } from 'react'
import { useGetProducts } from '@/hooks/useGetProducts'
import { Modal } from '@/components/ui'
import { AddProductForm } from '@/components/AddProductForm'
import { EditProductForm } from '@/components/EditProductForm'
import { Product } from '@/types'

// Configuración de estados del backend
const statusConfig: Record<string, { label: string; bgColor: string; textColor: string }> = {
    'disponible': { label: 'Disponible', bgColor: 'bg-emerald-900/30', textColor: 'text-emerald-400' },
    'agotado': { label: 'Agotado', bgColor: 'bg-red-900/30', textColor: 'text-red-400' },
    'bajo_stock': { label: 'Stock Bajo', bgColor: 'bg-orange-900/30', textColor: 'text-orange-400' },
}

const getStockColor = (stock: number) => {
    if (stock > 50) return 'bg-[#135bec]'
    if (stock > 20) return 'bg-orange-500'
    return 'bg-red-500'
}

const getStockTextColor = (stock: number) => {
    if (stock > 50) return 'text-white'
    if (stock > 20) return 'text-orange-500'
    return 'text-red-500'
}

export const ProductTable = () => {
    const { products, pagination, error, loading, currentPage, refetch, goToPage, nextPage, prevPage } = useGetProducts()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

    const handleProductCreated = () => {
        setIsModalOpen(false)
        refetch()
    }

    const handleProductUpdated = () => {
        setIsEditModalOpen(false)
        setSelectedProduct(null)
        refetch()
    }

    const handleEditClick = (product: Product) => {
        setSelectedProduct(product)
        setIsEditModalOpen(true)
    }

    if (loading) {
        return (
            <>
                {/* Header con botón de agregar */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-white">Productos</h2>
                        <p className="text-slate-400 text-sm mt-1">Gestiona tu inventario de productos</p>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2.5 bg-[#135bec] hover:bg-[#1048c7] text-white rounded-lg font-medium transition-colors shadow-lg shadow-[#135bec]/20"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Agregar Producto
                    </button>
                </div>
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-8 h-8 border-4 border-[#135bec] border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-slate-400">Cargando productos...</p>
                    </div>
                </div>
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Agregar Nuevo Producto">
                    <AddProductForm onSuccess={handleProductCreated} onCancel={() => setIsModalOpen(false)} />
                </Modal>
            </>
        )
    }

    if (error) {
        return (
            <>
                {/* Header con botón de agregar */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-white">Productos</h2>
                        <p className="text-slate-400 text-sm mt-1">Gestiona tu inventario de productos</p>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2.5 bg-[#135bec] hover:bg-[#1048c7] text-white rounded-lg font-medium transition-colors shadow-lg shadow-[#135bec]/20"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Agregar Producto
                    </button>
                </div>
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4 text-center">
                        <div className="w-12 h-12 bg-red-900/30 rounded-full flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <p className="text-red-400">{error}</p>
                    </div>
                </div>
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Agregar Nuevo Producto">
                    <AddProductForm onSuccess={handleProductCreated} onCancel={() => setIsModalOpen(false)} />
                </Modal>
            </>
        )
    }

    if (!products || products.length === 0) {
        return (
            <>
                {/* Header con botón de agregar */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-white">Productos</h2>
                        <p className="text-slate-400 text-sm mt-1">Gestiona tu inventario de productos</p>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2.5 bg-[#135bec] hover:bg-[#1048c7] text-white rounded-lg font-medium transition-colors shadow-lg shadow-[#135bec]/20"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Agregar Producto
                    </button>
                </div>
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4 text-center">
                        <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                        </div>
                        <p className="text-slate-400">No hay productos disponibles</p>
                    </div>
                </div>
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Agregar Nuevo Producto">
                    <AddProductForm onSuccess={handleProductCreated} onCancel={() => setIsModalOpen(false)} />
                </Modal>
            </>
        )
    }

    return (
        <>
            {/* Header con botón de agregar */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-white">Productos</h2>
                    <p className="text-slate-400 text-sm mt-1">Gestiona tu inventario de productos</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2.5 bg-[#135bec] hover:bg-[#1048c7] text-white rounded-lg font-medium transition-colors shadow-lg shadow-[#135bec]/20"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Agregar Producto
                </button>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-800/50 border-b border-slate-800">
                            <th className="px-6 py-4 text-sm font-bold text-slate-400 uppercase tracking-wider">Producto</th>
                            <th className="px-6 py-4 text-sm font-bold text-slate-400 uppercase tracking-wider">Categoría</th>
                            <th className="px-6 py-4 text-sm font-bold text-slate-400 uppercase tracking-wider text-right">Precio</th>
                            <th className="px-6 py-4 text-sm font-bold text-slate-400 uppercase tracking-wider">Stock</th>
                            <th className="px-6 py-4 text-sm font-bold text-slate-400 uppercase tracking-wider text-center">Estado</th>
                            <th className="px-6 py-4 text-sm font-bold text-slate-400 uppercase tracking-wider text-right">Acción</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                        {products.map((product) => (
                            <tr key={product.id} className="hover:bg-slate-800/30 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        {product.avatar ? (
                                            <img 
                                                src={product.avatar} 
                                                alt={product.name}
                                                className="h-10 w-10 rounded-lg object-cover"
                                            />
                                        ) : (
                                            <div className="h-10 w-10 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400">
                                                📦
                                            </div>
                                        )}
                                        <div className="flex flex-col">
                                            <span className="font-bold text-slate-100">{product.name}</span>
                                            <span className="text-xs text-slate-400">SKU: {product.sku}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-xs font-bold">
                                        {product.category}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right font-mono text-slate-100">
                                    ${Number(product.price).toFixed(2)}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3 min-w-[140px]">
                                        <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full ${getStockColor(product.stock)} rounded-full`}
                                                style={{ width: `${Math.min(product.stock, 100)}%` }}
                                            />
                                        </div>
                                        <span className={`text-sm font-bold w-8 ${getStockTextColor(product.stock)}`}>
                                            {product.stock}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig[product.status]?.bgColor || 'bg-slate-800'} ${statusConfig[product.status]?.textColor || 'text-slate-400'}`}>
                                        {statusConfig[product.status]?.label || product.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button 
                                        onClick={() => handleEditClick(product)}
                                        className="text-slate-400 hover:text-[#135bec] transition-colors"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Table Footer */}
            <div className="px-6 py-4 bg-slate-800/50 flex items-center justify-between border-t border-slate-800">
                <span className="text-sm text-slate-400 font-medium">
                    {pagination ? (
                        <>Mostrando {products.length} de {pagination.total} productos</>
                    ) : (
                        <>{products.length} productos</>
                    )}
                </span>
                <div className="flex items-center gap-2">
                    <button
                        onClick={prevPage}
                        disabled={currentPage <= 1}
                        className="px-3 py-1 border border-slate-700 rounded-lg text-sm text-slate-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-800 transition-colors"
                    >
                        Anterior
                    </button>
                    
                    {/* Números de página */}
                    {pagination && (
                        <div className="flex gap-1">
                            {Array.from({ length: pagination.last_page }, (_, i) => i + 1)
                                .filter(page => {
                                    // Mostrar primera, última, actual y adyacentes
                                    return page === 1 || 
                                           page === pagination.last_page || 
                                           Math.abs(page - currentPage) <= 1
                                })
                                .map((page, index, array) => {
                                    // Agregar ellipsis si hay saltos
                                    const prevPage = array[index - 1]
                                    const showEllipsis = prevPage && page - prevPage > 1
                                    
                                    return (
                                        <span key={page} className="flex items-center gap-1">
                                            {showEllipsis && (
                                                <span className="px-2 text-slate-500">...</span>
                                            )}
                                            <button
                                                onClick={() => goToPage(page)}
                                                className={`px-3 py-1 rounded-lg text-sm font-bold transition-colors ${
                                                    currentPage === page
                                                        ? 'bg-[#135bec] text-white'
                                                        : 'border border-slate-700 text-slate-400 hover:bg-slate-800'
                                                }`}
                                            >
                                                {page}
                                            </button>
                                        </span>
                                    )
                                })
                            }
                        </div>
                    )}
                    
                    {!pagination && (
                        <button className="px-3 py-1 bg-[#135bec] text-white rounded-lg text-sm font-bold">
                            1
                        </button>
                    )}
                    
                    <button
                        onClick={nextPage}
                        disabled={!pagination || currentPage >= pagination.last_page}
                        className="px-3 py-1 border border-slate-700 rounded-lg text-sm text-slate-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-800 transition-colors"
                    >
                        Siguiente
                    </button>
                </div>
            </div>
        </div>

            {/* Modal para agregar producto */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Agregar Nuevo Producto"
            >
                <AddProductForm
                    onSuccess={handleProductCreated}
                    onCancel={() => setIsModalOpen(false)}
                />
            </Modal>

            {/* Modal para editar producto */}
            <Modal
                isOpen={isEditModalOpen}
                onClose={() => {
                    setIsEditModalOpen(false)
                    setSelectedProduct(null)
                }}
                title="Editar Producto"
            >
                {selectedProduct && (
                    <EditProductForm
                        product={selectedProduct}
                        onSuccess={handleProductUpdated}
                        onCancel={() => {
                            setIsEditModalOpen(false)
                            setSelectedProduct(null)
                        }}
                    />
                )}
            </Modal>
        </>
    )
}
