"use client"
import { useLogin } from '@/hooks/useLogin'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import Link from 'next/link'

type LoginFormInputs = {
    email: string
    password: string
}

export default function LoginPage() {
    const { register, handleSubmit } = useForm<LoginFormInputs>()
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const onSubmit = async (data: LoginFormInputs) => {
        const { email, password } = data
        setIsLoading(true)
        try {
            await useLogin(email, password)
            alert('¡Login exitoso!')
        } catch (error) {
            alert('Error al iniciar sesión')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen w-full bg-white">
            {/* Left Side: Visual Anchor - 50% */}
            <div className="relative hidden lg:flex lg:w-1/2">
                <div className="absolute inset-0 h-full w-full bg-[#101622]">
                    <img
                        alt="Modern logistics warehouse with automated shelving systems"
                        className="h-full w-full object-cover opacity-90 mix-blend-overlay"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8hEYKoPmvQXiRqokZ3-XX9bSwszqMwo3xJD2HfVKRI03Pq8V3qLYtn0_FpcTWSn1BP93fuxdORgUd7FidT-u72u-3USKDt9jQrVPUlFcpDsHuvgy8hOLtVKRfobrtrHwQG0ejUnm2LLDnkUOcVnd3MlUKCQCE50T5awsVHFEvHE52mQKiH79RwyZZuWpE3_fSkSpDXq0FrYzzhOsV2bf7EkV4keG5IROVuUsTrItxj-lXcd6YPl0x4_yBNHu5LXck-yH8_Og3pN-o"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#135bec]/90 to-[#135bec]/40 mix-blend-multiply"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60"></div>
                </div>
                {/* Floating Content on Image */}
                <div className="absolute bottom-0 left-0 z-10 p-16 text-white">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="flex items-center justify-center rounded-lg bg-white/20 p-2 backdrop-blur-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold tracking-tight">LogiAdmin</h2>
                    </div>
                    <blockquote className="space-y-2">
                        <p className="text-lg font-medium leading-relaxed">
                            &quot;La mejor plataforma para gestionar nuestro inventario internacional. Hemos reducido los tiempos de despacho en un 40%.&quot;
                        </p>
                        <footer className="text-sm text-white/80 font-medium">– Maria Gonzalez, Directora de Operaciones</footer>
                    </blockquote>
                </div>
            </div>

            {/* Right Side: Login Form - 50% */}
            <div className="flex w-full lg:w-1/2 flex-col justify-center bg-white px-4 py-12 sm:px-6 lg:px-20 xl:px-24">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    {/* Header for Form */}
                    <div className="mb-10">
                        {/* Mobile Logo (visible only on small screens) */}
                        <div className="flex lg:hidden items-center gap-2 mb-6 text-[#135bec]">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                            </svg>
                            <h2 className="text-xl font-bold text-gray-900">LogiAdmin</h2>
                        </div>
                        <h1 className="text-3xl font-black tracking-tight text-gray-900 mb-2">
                            Inicia sesión
                        </h1>
                        <p className="text-sm text-gray-500">
                            Gestiona tu inventario y optimiza tus procesos logísticos en una sola plataforma.
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        {/* Correo Electrónico */}
                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900 mb-1.5" htmlFor="email">
                                Correo electrónico
                            </label>
                            <div className="relative rounded-lg shadow-sm">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <input
                                    {...register('email', { required: true })}
                                    className="block w-full rounded-lg border-0 py-3 pl-10 text-gray-900 bg-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#135bec] sm:text-sm sm:leading-6"
                                    id="email"
                                    placeholder="nombre@empresa.com"
                                    type="email"
                                />
                            </div>
                        </div>

                        {/* Contraseña */}
                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900 mb-1.5" htmlFor="password">
                                Contraseña
                            </label>
                            <div className="relative rounded-lg shadow-sm">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <input
                                    {...register('password', { required: true })}
                                    className="block w-full rounded-lg border-0 py-3 pl-10 pr-10 text-gray-900 bg-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#135bec] sm:text-sm sm:leading-6"
                                    id="password"
                                    placeholder="••••••••"
                                    type={showPassword ? "text" : "password"}
                                />
                                <div
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer group"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 group-hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 group-hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    className="h-4 w-4 rounded border-gray-300 text-[#135bec] focus:ring-[#135bec]"
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                />
                                <label className="ml-2 block text-sm text-gray-900" htmlFor="remember-me">
                                    Recordarme
                                </label>
                            </div>
                            <a className="text-sm font-medium text-[#135bec] hover:text-blue-500" href="#">
                                ¿Olvidaste tu contraseña?
                            </a>
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button
                                className="flex w-full justify-center rounded-lg bg-[#135bec] px-3 py-3.5 text-sm font-bold leading-6 text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#135bec] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                type="submit"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Cargando...' : 'Iniciar Sesión'}
                            </button>
                        </div>

                        {/* Register Link */}
                        <p className="mt-8 text-center text-sm text-gray-500">
                            ¿No tienes una cuenta?{' '}
                            <Link className="font-bold leading-6 text-[#135bec] hover:text-blue-500" href="/register">
                                Regístrate
                            </Link>
                        </p>
                    </form>

                    {/* Divider */}
                    <div className="mt-8">
                        <div className="relative">
                            <div aria-hidden="true" className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-center text-sm font-medium leading-6">
                                <span className="bg-white px-6 text-gray-500">
                                    Protegido por LogiAdmin Security
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
