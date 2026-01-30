"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { getUser, getUserRole, logoutUser, UserData } from '@/hooks/useAuht'

export const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [user, setUser] = useState<UserData | null>(null)
    const [role, setRole] = useState<string>('')
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setUser(getUser())
        setRole(getUserRole())
        setMounted(true)
    }, [])

    const handleLogout = async () => {
        try {
            await logoutUser()
            toast.success('Sesión cerrada correctamente')
            window.location.href = '/login'
        } catch (error) {
            toast.error('Error al cerrar sesión')
        }
    }

    const getInitials = (name?: string, email?: string): string => {
        if (name) {
            const parts = name.split(' ')
            return parts.length > 1 
                ? `${parts[0][0]}${parts[1][0]}`.toUpperCase()
                : name.substring(0, 2).toUpperCase()
        }
        return email ? email[0].toUpperCase() : 'U'
    }

    const getRoleBadgeColor = (roleValue: string): string => {
        switch (roleValue) {
            case 'admin': return 'bg-red-500/20 text-red-400'
            case 'manager': return 'bg-yellow-500/20 text-yellow-400'
            default: return 'bg-blue-500/20 text-blue-400'
        }
    }

    // Funciones de permisos usando el estado local


    const displayName = user?.name || user?.email?.split('@')[0] || 'Usuario'
    const displayEmail = user?.email || 'usuario@email.com'

    return (
        <nav className="bg-[#0d1424] border-b border-slate-800 px-6 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link href="/dashboard" className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-[#135bec] rounded-xl shadow-lg shadow-[#135bec]/20">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                    </div>
                    <span className="text-xl font-bold text-white">DashStock</span>
                </Link>

                {/* User Menu */}
                <div className="relative">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                    >
                        <div className="flex flex-col items-end">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-white">{displayName}</span>
                                <span className={`text-xs px-2 py-0.5 rounded-full ${getRoleBadgeColor(role)}`}>
                                    {role}
                                </span>
                            </div>
                            <span className="text-xs text-slate-400">{displayEmail}</span>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#135bec] to-blue-400 flex items-center justify-center text-white font-bold">
                            {getInitials(user?.name, user?.email)}
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-56 bg-[#0d1424] border border-slate-800 rounded-xl shadow-2xl overflow-hidden z-50">
                            <div className="p-4 border-b border-slate-800">
                                <p className="text-sm font-semibold text-white">{displayName}</p>
                                <p className="text-xs text-slate-400">{displayEmail}</p>
                                <span className={`text-xs px-2 py-0.5 rounded-full mt-2 inline-block ${getRoleBadgeColor(role)}`}>
                                    {role}
                                </span>
                            </div>
                            <div className="py-2">
                                <Link href="/dashboard/profile" className="flex items-center gap-3 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800/50 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    Mi Perfil
                                </Link>
                                
                            </div>
                            <div className="border-t border-slate-800 py-2">
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-slate-800/50 transition-colors w-full"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    Cerrar Sesión
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}
