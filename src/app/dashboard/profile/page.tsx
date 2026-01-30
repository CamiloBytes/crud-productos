"use client"
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Navbar } from '@/components/Navbar'
import { Input, Button } from '@/components/ui'
import { useProfile, updateProfile } from '@/hooks/useProfile'

type ProfileFormInputs = {
    username: string
    email: string
    phone_number: string
}

export default function ProfilePage() {
    const { user, loading, error, refetch } = useProfile()
    const [isEditing, setIsEditing] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    
    const { register, handleSubmit, formState: { errors }, reset } = useForm<ProfileFormInputs>()

    const onSubmit = async (data: ProfileFormInputs) => {
        setIsSubmitting(true)
        try {
            await updateProfile({
                username: data.username,
                email: data.email,
                phone_number: data.phone_number || undefined,
            })
            toast.success('¡Perfil actualizado exitosamente!', { icon: '✅' })
            setIsEditing(false)
            refetch()
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error al actualizar el perfil'
            toast.error(errorMessage)
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleEditClick = () => {
        if (user) {
            reset({
                username: user.username,
                email: user.email,
                phone_number: user.phone_number || '',
            })
        }
        setIsEditing(true)
    }

    const handleCancelEdit = () => {
        setIsEditing(false)
    }

    const formatDate = (dateString?: string) => {
        if (!dateString) return 'N/A'
        return new Date(dateString).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const getRoleBadgeColor = (role?: string) => {
        switch (role) {
            case 'admin':
                return 'bg-purple-900/30 text-purple-400'
            case 'user':
                return 'bg-blue-900/30 text-blue-400'
            default:
                return 'bg-slate-800 text-slate-400'
        }
    }

    return (
        <div className="min-h-screen bg-[#0a0f1a]">
            <Navbar />
            
            <main className="p-8">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-white">Mi Perfil</h1>
                        <p className="text-slate-400 text-sm mt-1">Gestiona tu información personal</p>
                    </div>

                    {loading ? (
                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 flex items-center justify-center">
                            <div className="flex flex-col items-center gap-4">
                                <div className="w-8 h-8 border-4 border-[#135bec] border-t-transparent rounded-full animate-spin"></div>
                                <p className="text-slate-400">Cargando perfil...</p>
                            </div>
                        </div>
                    ) : error ? (
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
                    ) : user ? (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Avatar y Info básica */}
                            <div className="lg:col-span-1">
                                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                                    <div className="flex flex-col items-center text-center">
                                        {/* Avatar */}
                                        <div className="relative mb-4">
                                            {user.avatar ? (
                                                <img 
                                                    src={user.avatar} 
                                                    alt={user.username}
                                                    className="w-24 h-24 rounded-full object-cover border-4 border-slate-800"
                                                />
                                            ) : (
                                                <div className="w-24 h-24 bg-gradient-to-br from-[#135bec] to-[#0d47a1] rounded-full flex items-center justify-center text-white text-3xl font-bold border-4 border-slate-800">
                                                    {user.username.charAt(0).toUpperCase()}
                                                </div>
                                            )}
                                            <button className="absolute bottom-0 right-0 p-2 bg-[#135bec] rounded-full text-white hover:bg-[#1048c7] transition-colors shadow-lg">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                            </button>
                                        </div>
                                        
                                        {/* Username */}
                                        <h2 className="text-xl font-bold text-white mb-1">{user.username}</h2>
                                        
                                        {/* Role Badge */}
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(user.role)}`}>
                                            {user.role === 'admin' ? ' Administrador' : ' Usuario'}
                                        </span>
                                        
                                        {/* Email */}
                                        <p className="text-slate-400 text-sm mt-3">{user.email}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Información detallada */}
                            <div className="lg:col-span-2">
                                <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                                    {/* Header del card */}
                                    <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
                                        <h3 className="text-lg font-bold text-white">Información Personal</h3>
                                        {!isEditing && (
                                            <button
                                                onClick={handleEditClick}
                                                className="flex items-center gap-2 px-3 py-1.5 text-sm text-[#135bec] hover:bg-[#135bec]/10 rounded-lg transition-colors"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                                Editar
                                            </button>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        {isEditing ? (
                                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                                <Input
                                                    label="Nombre de usuario"
                                                    id="username"
                                                    placeholder="Tu nombre de usuario"
                                                    error={errors.username?.message}
                                                    {...register('username', { required: 'El nombre de usuario es requerido' })}
                                                />
                                                <Input
                                                    label="Correo electrónico"
                                                    id="email"
                                                    type="email"
                                                    placeholder="tu@email.com"
                                                    error={errors.email?.message}
                                                    {...register('email', { 
                                                        required: 'El correo es requerido',
                                                        pattern: {
                                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                            message: 'Correo inválido'
                                                        }
                                                    })}
                                                />
                                                <Input
                                                    label="Teléfono"
                                                    id="phone_number"
                                                    type="tel"
                                                    placeholder="+1 234 567 890"
                                                    error={errors.phone_number?.message}
                                                    {...register('phone_number')}
                                                />
                                                
                                                <div className="flex gap-3 pt-4">
                                                    <button
                                                        type="button"
                                                        onClick={handleCancelEdit}
                                                        className="flex-1 px-4 py-2.5 border border-slate-700 text-slate-300 rounded-lg font-medium hover:bg-slate-800 transition-colors"
                                                    >
                                                        Cancelar
                                                    </button>
                                                    <Button type="submit" isLoading={isSubmitting} className="flex-1">
                                                        Guardar Cambios
                                                    </Button>
                                                </div>
                                            </form>
                                        ) : (
                                            <div className="space-y-6">
                                                {/* Username */}
                                                <div className="flex items-start gap-4">
                                                    <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center flex-shrink-0">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">Nombre de usuario</p>
                                                        <p className="text-white font-medium mt-1">{user.username}</p>
                                                    </div>
                                                </div>

                                                {/* Email */}
                                                <div className="flex items-start gap-4">
                                                    <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center flex-shrink-0">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">Correo electrónico</p>
                                                        <p className="text-white font-medium mt-1">{user.email}</p>
                                                    </div>
                                                </div>

                                                {/* Phone */}
                                                <div className="flex items-start gap-4">
                                                    <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center flex-shrink-0">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">Teléfono</p>
                                                        <p className="text-white font-medium mt-1">{user.phone_number || <span className="text-slate-500 italic">No especificado</span>}</p>
                                                    </div>
                                                </div>

                                                {/* Role */}
                                                <div className="flex items-start gap-4">
                                                    <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center flex-shrink-0">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">Rol</p>
                                                        <p className="text-white font-medium mt-1 capitalize">{user.role || 'Usuario'}</p>
                                                    </div>
                                                </div>

                                                {/* Divider */}
                                                <div className="border-t border-slate-800 pt-6">
                                                    <h4 className="text-sm font-medium text-slate-400 mb-4">Información de la cuenta</h4>
                                                    
                                                    {/* Created at */}
                                                    <div className="flex items-start gap-4 mb-4">
                                                        <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center flex-shrink-0">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                            </svg>
                                                        </div>
                                                        <div>
                                                            <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">Fecha de registro</p>
                                                            <p className="text-white font-medium mt-1">{formatDate(user.created_at)}</p>
                                                        </div>
                                                    </div>

                                                    {/* Updated at */}
                                                    <div className="flex items-start gap-4">
                                                        <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center flex-shrink-0">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                                            </svg>
                                                        </div>
                                                        <div>
                                                            <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">Última actualización</p>
                                                            <p className="text-white font-medium mt-1">{formatDate(user.updated_at)}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Danger Zone */}
                                <div className="mt-6 bg-slate-900 border border-red-900/30 rounded-xl overflow-hidden">
                                    <div className="px-6 py-4 border-b border-red-900/30">
                                        <h3 className="text-lg font-bold text-red-400">Zona de peligro</h3>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-white font-medium">Eliminar cuenta</p>
                                                <p className="text-slate-400 text-sm mt-1">Esta acción es irreversible</p>
                                            </div>
                                            <button className="px-4 py-2 border border-red-700 text-red-400 rounded-lg font-medium hover:bg-red-900/20 transition-colors">
                                                Eliminar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : null}
                </div>
            </main>
        </div>
    )
}
