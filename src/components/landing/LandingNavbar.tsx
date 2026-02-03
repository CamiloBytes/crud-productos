"use client"
import { motion } from 'framer-motion'
import Link from 'next/link'

export const LandingNavbar = () => {
    return (
        <motion.nav 
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-50 bg-[#0a0f1a]/80 backdrop-blur-lg border-b border-slate-800/50"
        >
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <motion.div 
                    className="flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                >
                    <div className="w-10 h-10 bg-gradient-to-br from-[#135bec] to-[#0d47a1] rounded-xl flex items-center justify-center">
                        <span className="text-xl">📊</span>
                    </div>
                    <span className="text-xl font-bold">DashStock</span>
                </motion.div>
                
                <div className="hidden md:flex items-center gap-8">
                    <a href="#features" className="text-slate-400 hover:text-white transition-colors">Características</a>
                    <a href="#stats" className="text-slate-400 hover:text-white transition-colors">Estadísticas</a>
                    <a href="#testimonials" className="text-slate-400 hover:text-white transition-colors">Testimonios</a>
                </div>
                
                <div className="flex items-center gap-4">
                    <Link href="/login">
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="text-slate-300 hover:text-white transition-colors"
                        >
                            Iniciar Sesión
                        </motion.button>
                    </Link>
                    <Link href="/register">
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 bg-[#135bec] hover:bg-[#1048c7] rounded-lg font-medium transition-colors"
                        >
                            Comenzar Gratis
                        </motion.button>
                    </Link>
                </div>
            </div>
        </motion.nav>
    )
}
