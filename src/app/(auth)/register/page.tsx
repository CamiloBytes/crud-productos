"use client"
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { Input, PasswordInput, Button } from '@/components/ui'
import { registerUser } from '@/hooks/useRegister'

type RegisterFormInputs = {
    username: string
    email: string
    password: string
    confirmPassword: string
}

export default function RegisterPage() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormInputs>()
    const [isLoading, setIsLoading] = useState(false)
    const [acceptTerms, setAcceptTerms] = useState(false)

    const password = watch('password')

    const onSubmit = async (data: RegisterFormInputs) => {
        if (!acceptTerms) {
            toast.error('Debes aceptar los términos y condiciones')
            return
        }
        
        setIsLoading(true)
        
        try {
            await registerUser({
                username: data.username,
                email: data.email,
                password: data.password,
                password_confirmation: data.confirmPassword,
            })
            
            toast.success('¡Cuenta creada exitosamente!', { icon: '🎉' })
            
            setTimeout(() => {
                window.location.href = '/login'
            }, 1500)
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error al registrarse'
            toast.error(errorMessage)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-[#0a0f1a] relative overflow-hidden">
            {/* Background */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-[#135bec]/5 blur-[120px] rounded-full"></div>
                <div className="absolute -bottom-[10%] -right-[10%] w-[30%] h-[30%] bg-[#135bec]/10 blur-[100px] rounded-full"></div>
            </div>

            <div className="w-full max-w-md z-10">
                {/* Header */}
                <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-11 h-11 bg-[#135bec] rounded-xl mb-3 shadow-lg shadow-[#135bec]/20">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                    </div>
                    <h1 className="text-xl font-bold text-white">Crear Cuenta</h1>
                    <p className="text-slate-400 text-sm mt-1">Completa tus datos para registrarte</p>
                </div>

                {/* Form */}
                <div className="bg-[#0d1424] border border-slate-800 rounded-xl shadow-2xl">
                    <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-4">
                        {/* Username */}
                        <Input
                            label="Usuario"
                            id="username"
                            placeholder="johndoe"
                            error={errors.username?.message}
                            {...register('username', { required: 'El usuario es requerido' })}
                        />

                        {/* Email */}
                        <Input
                            label="Correo electrónico"
                            id="email"
                            type="email"
                            placeholder="correo@ejemplo.com"
                            error={errors.email?.message}
                            {...register('email', { 
                                required: 'El correo es requerido',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Correo inválido'
                                }
                            })}
                        />

                        {/* Row: Passwords */}
                        <div className="grid grid-cols-2 gap-3">
                            <PasswordInput
                                label="Contraseña"
                                id="password"
                                placeholder="••••••••"
                                error={errors.password?.message}
                                {...register('password', { 
                                    required: 'Requerida',
                                    minLength: { value: 8, message: 'Mín. 8 caracteres' }
                                })}
                            />
                            <PasswordInput
                                label="Confirmar"
                                id="confirmPassword"
                                placeholder="••••••••"
                                error={errors.confirmPassword?.message}
                                {...register('confirmPassword', { 
                                    required: 'Requerida',
                                    validate: value => value === password || 'No coinciden'
                                })}
                            />
                        </div>

                        {/* Terms */}
                        <div className="flex items-center gap-2">
                            <input
                                className="w-4 h-4 text-[#135bec] bg-slate-800 border-slate-700 rounded focus:ring-[#135bec] cursor-pointer"
                                id="terms"
                                type="checkbox"
                                checked={acceptTerms}
                                onChange={(e) => setAcceptTerms(e.target.checked)}
                            />
                            <label className="text-xs text-slate-400" htmlFor="terms">
                                Acepto los <a className="text-[#135bec] hover:underline" href="#">términos</a> y <a className="text-[#135bec] hover:underline" href="#">privacidad</a>
                            </label>
                        </div>

                        {/* Submit */}
                        <Button type="submit" isLoading={isLoading}>
                            Crear Cuenta
                        </Button>

                        {/* Divider */}
                        <div className="relative py-2">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-800"></div>
                            </div>
                            <div className="relative flex justify-center text-xs">
                                <span className="bg-[#0d1424] px-3 text-slate-500">o continúa con</span>
                            </div>
                        </div>

                        {/* Social */}
                        <div className="grid grid-cols-2 gap-3">
                            <Button variant="secondary" type="button">
                                <svg className="w-4 h-4" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                </svg>
                                <span className="text-sm">Google</span>
                            </Button>
                            <Button variant="secondary" type="button">
                                <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.82 1.102.82 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                                </svg>
                                <span className="text-sm">GitHub</span>
                            </Button>
                        </div>
                    </form>

                    {/* Footer */}
                    <div className="bg-slate-900/50 px-5 py-3 text-center border-t border-slate-800">
                        <p className="text-sm text-slate-400">
                            ¿Ya tienes cuenta?
                            <Link className="text-[#135bec] font-semibold ml-1 hover:underline" href="/login">
                                Inicia sesión
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
