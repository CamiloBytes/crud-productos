"use client"
import { useState } from 'react'
import { useGetProducts } from '@/hooks/useGetProducts'
import { deleteProduct } from '@/hooks/useDeleteProduct'
import { Modal } from '@/components/ui'
import { AddProductForm } from '@/components/AddProductForm'
import { EditProductForm } from '@/components/EditProductForm'
import { Product } from '@/types'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

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
    if (stock > 50) return 'text-emerald-400'
    if (stock > 20) return 'text-orange-400'
    return 'text-red-400'
}

export const ProductCards = () => {
    const { products, pagination, error, loading, currentPage, refetch, goToPage, nextPage, prevPage } = useGetProducts()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
    const [isDeleting, setIsDeleting] = useState(false)

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

    const handleDeleteClick = (product: Product) => {
        setSelectedProduct(product)
        setIsDeleteModalOpen(true)
    }

    const handleDeleteConfirm = async () => {
        if (!selectedProduct) return

        setIsDeleting(true)
        try {
            await deleteProduct(selectedProduct.id)
            toast.success('¡Producto eliminado exitosamente!', { icon: '🗑️' })
            setIsDeleteModalOpen(false)
            setSelectedProduct(null)
            refetch()
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error al eliminar el producto'
            toast.error(errorMessage)
        } finally {
            setIsDeleting(false)
        }
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
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="mt-2 px-4 py-2 bg-[#135bec] hover:bg-[#1048c7] text-white rounded-lg font-medium transition-colors"
                        >
                            Agregar primer producto
                        </button>
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
                    <p className="text-slate-400 text-sm mt-1">
                        {pagination ? (
                            <>Mostrando {products.length} de {pagination.total} productos</>
                        ) : (
                            <>{products.length} productos</>
                        )}
                    </p>
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

            {/* Grid de Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                {products.map((product, index) => (
                    <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition-all group"
                    >
                        {/* Imagen del producto */}
                        <div className="relative h-48 bg-slate-800 overflow-hidden">
                            {product.image ? (
                                <img 
                                    src={product.image} 
                                    alt={product.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-6xl">
                                    📦
                                </div>
                            )}
                            
                            {/* Badge de estado */}
                            <div className="absolute top-3 right-3">
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${statusConfig[product.status]?.bgColor || 'bg-slate-800/80'} ${statusConfig[product.status]?.textColor || 'text-slate-400'}`}>
                                    {statusConfig[product.status]?.label || product.status}
                                </span>
                            </div>
                        </div>

                        {/* Contenido del card */}
                        <div className="p-5">
                            {/* Nombre y SKU */}
                            <div className="mb-3">
                                <h3 className="text-lg font-bold text-white mb-1 line-clamp-1">{product.name}</h3>
                                <p className="text-xs text-slate-500">SKU: {product.sku}</p>
                            </div>

                            {/* Categoría */}
                            <div className="mb-4">
                                <span className="inline-flex items-center px-2.5 py-1 bg-slate-800 text-slate-300 rounded-md text-xs font-medium">
                                    📂 {product.category}
                                </span>
                            </div>

                            {/* Precio */}
                            <div className="mb-4">
                                <p className="text-2xl font-bold text-white">
                                    ${Number(product.price).toFixed(2)}
                                </p>
                            </div>

                            {/* Stock con barra de progreso */}
                            <div className="mb-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-slate-400">Stock</span>
                                    <span className={`text-sm font-bold ${getStockTextColor(product.stock)}`}>
                                        {product.stock} unidades
                                    </span>
                                </div>
                                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full ${getStockColor(product.stock)} rounded-full transition-all`}
                                        style={{ width: `${Math.min((product.stock / 100) * 100, 100)}%` }}
                                    />
                                </div>
                            </div>

                            {/* Botones de acción */}
                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    onClick={() => handleEditClick(product)}
                                    className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-[#135bec] text-slate-300 hover:text-white rounded-lg font-medium transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    Editar
                                </button>
                                <button
                                    onClick={() => handleDeleteClick(product)}
                                    className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-red-600 text-slate-300 hover:text-white rounded-lg font-medium transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Paginación */}
            {pagination && pagination.last_page > 1 && (
                <div className="bg-slate-900 border border-slate-800 rounded-xl px-6 py-4 flex items-center justify-between">
                    <span className="text-sm text-slate-400 font-medium">
                        Página {currentPage} de {pagination.last_page}
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
                        
                        <button
                            onClick={nextPage}
                            disabled={currentPage >= pagination.last_page}
                            className="px-3 py-1 border border-slate-700 rounded-lg text-sm text-slate-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-800 transition-colors"
                        >
                            Siguiente
                        </button>
                    </div>
                </div>
            )}

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

            {/* Modal de confirmación para eliminar producto */}
            <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => {
                    setIsDeleteModalOpen(false)
                    setSelectedProduct(null)
                }}
                title="Confirmar Eliminación"
            >
                <div className="space-y-4">
                    <div className="bg-red-900/20 border border-red-800 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                            <div className="flex-shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="text-red-400 font-semibold mb-1">¡Advertencia!</h4>
                                <p className="text-slate-300 text-sm">
                                    Esta acción no se puede deshacer. Se eliminará permanentemente el producto.
                                </p>
                            </div>
                        </div>
                    </div>

                    {selectedProduct && (
                        <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                            <p className="text-slate-400 text-sm mb-2">Producto a eliminar:</p>
                            <div className="flex items-center gap-3">
                                {selectedProduct.image ? (
                                    <img 
                                        src={selectedProduct.image} 
                                        alt={selectedProduct.name}
                                        className="w-12 h-12 rounded-lg object-cover"
                                    />
                                ) : (
                                    <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center text-2xl">
                                        📦
                                    </div>
                                )}
                                <div>
                                    <p className="text-white font-semibold">{selectedProduct.name}</p>
                                    <p className="text-slate-400 text-xs">SKU: {selectedProduct.sku}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={() => {
                                setIsDeleteModalOpen(false)
                                setSelectedProduct(null)
                            }}
                            disabled={isDeleting}
                            className="flex-1 px-4 py-2.5 border border-slate-700 text-slate-300 rounded-lg font-medium hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Cancelar
                        </button>
                        <button
                            type="button"
                            onClick={handleDeleteConfirm}
                            disabled={isDeleting}
                            className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isDeleting ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Eliminando...
                                </>
                            ) : (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    Sí, eliminar
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    )
}
