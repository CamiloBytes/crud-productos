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
    image?: FileList
}

export const AddProductForm = ({ onSuccess, onCancel }: AddProductFormProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm<ProductFormInputs>()
    const [isLoading, setIsLoading] = useState(false)
    const [imagePreview, setImagePreview] = useState<string | null>(null)

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setImagePreview(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const onSubmit = async (data: ProductFormInputs) => {
        setIsLoading(true)
        
        try {
            const formData = new FormData()
            formData.append('name', data.name)
            formData.append('sku', data.sku)
            formData.append('category', data.category || '')
            formData.append('price', data.price.toString())
            formData.append('stock', data.stock.toString())
            formData.append('status', data.status || 'disponible')
            
            if (data.image && data.image[0]) {
                formData.append('image', data.image[0])
            }

            const response = await fetch('/api/products', {
                method: 'POST',
                body: formData,
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || 'Error al crear el producto')
            }

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

            {/* Imagen del producto */}
            <div>
                <label htmlFor="image" className="block text-sm font-medium text-slate-300 mb-1.5">
                    Imagen del producto
                </label>
                <input
                    type="file"
                    id="image"
                    accept="image/jpeg,image/png,image/jpg,image/gif,image/webp"
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2.5 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#135bec] file:text-white hover:file:bg-[#1048c7] file:cursor-pointer cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#135bec] focus:border-transparent transition-all"
                    {...register('image')}
                    onChange={(e) => {
                        register('image').onChange(e)
                        handleImageChange(e)
                    }}
                />
                <p className="text-xs text-slate-500 mt-1">Formatos: JPEG, PNG, JPG, GIF, WEBP (máx. 5MB)</p>
                
                {imagePreview && (
                    <div className="mt-3">
                        <img 
                            src={imagePreview} 
                            alt="Vista previa" 
                            className="w-32 h-32 object-cover rounded-lg border border-slate-700"
                        />
                    </div>
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
