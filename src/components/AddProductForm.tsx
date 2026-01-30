"use client"
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Input, Button } from '@/components/ui'
import { createProduct } from '@/hooks/useCreateProduct'
import { CreateProductData } from '@/types'

interface AddProductFormProps {
    onSuccess: () => void
    onCancel: () => void
}

type ProductFormInputs = {
    name: string
    sku: string
    category: string
    price: number
    stock: number
    status: string
}

export const AddProductForm = ({ onSuccess, onCancel }: AddProductFormProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm<ProductFormInputs>()
    const [isLoading, setIsLoading] = useState(false)

    const onSubmit = async (data: ProductFormInputs) => {
        setIsLoading(true)
        
        try {
            const productData: CreateProductData = {
                name: data.name,
                sku: data.sku,
                category: data.category,
                price: Number(data.price),
                stock: Number(data.stock),
                status: data.status,
            }

            await createProduct(productData)
            toast.success('¡Producto creado exitosamente!', { icon: '🎉' })
            onSuccess()
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error al crear el producto'
            toast.error(errorMessage)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Nombre */}
            <Input
                label="Nombre del producto"
                id="name"
                placeholder="Ej: Laptop Gaming Pro"
                error={errors.name?.message}
                {...register('name', { required: 'El nombre es requerido' })}
            />

            {/* SKU y Categoría */}
            <div className="grid grid-cols-2 gap-3">
                <Input
                    label="SKU"
                    id="sku"
                    placeholder="Ej: LAP-001"
                    error={errors.sku?.message}
                    {...register('sku', { required: 'El SKU es requerido' })}
                />
                <Input
                    label="Categoría"
                    id="category"
                    placeholder="Ej: Electrónica"
                    error={errors.category?.message}
                    {...register('category', { required: 'La categoría es requerida' })}
                />
            </div>

            {/* Precio y Stock */}
            <div className="grid grid-cols-2 gap-3">
                <Input
                    label="Precio"
                    id="price"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    error={errors.price?.message}
                    {...register('price', { 
                        required: 'El precio es requerido',
                        min: { value: 0, message: 'El precio debe ser positivo' }
                    })}
                />
                <Input
                    label="Stock"
                    id="stock"
                    type="number"
                    placeholder="0"
                    error={errors.stock?.message}
                    {...register('stock', { 
                        required: 'El stock es requerido',
                        min: { value: 0, message: 'El stock debe ser positivo' }
                    })}
                />
            </div>

            {/* Estado */}
            <div>
                <label htmlFor="status" className="block text-sm font-medium text-slate-300 mb-1.5">
                    Estado
                </label>
                <select
                    id="status"
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#135bec] focus:border-transparent transition-all"
                    {...register('status', { required: 'El estado es requerido' })}
                >
                    <option value="disponible">Disponible</option>
                    <option value="bajo_stock">Stock Bajo</option>
                    <option value="agotado">Agotado</option>
                </select>
                {errors.status && (
                    <p className="text-red-400 text-xs mt-1">{errors.status.message}</p>
                )}
            </div>

            {/* Botones */}
            <div className="flex gap-3 pt-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="flex-1 px-4 py-2.5 border border-slate-700 text-slate-300 rounded-lg font-medium hover:bg-slate-800 transition-colors"
                >
                    Cancelar
                </button>
                <Button type="submit" isLoading={isLoading} className="flex-1">
                    Crear Producto
                </Button>
            </div>
        </form>
    )
}
