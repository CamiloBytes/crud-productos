"use client"
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { fadeInUp, staggerContainer } from './animations'

export const HeroSection = () => {
    const targetRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end start"]
    })
    
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

    return (
        <section ref={targetRef} className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div 
                    style={{ y, opacity }}
                    className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-[#135bec]/20 blur-[150px] rounded-full"
                />
                <motion.div 
                    style={{ y, opacity }}
                    className="absolute -bottom-[20%] -right-[10%] w-[40%] h-[40%] bg-[#135bec]/15 blur-[120px] rounded-full"
                />
            </div>

            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                >
                    {/* Badge */}
                    <motion.div 
                        variants={fadeInUp}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#135bec]/10 border border-[#135bec]/30 rounded-full mb-8"
                    >
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-sm text-slate-300">Nuevo: Integración con IA para predicciones</span>
                    </motion.div>

                    {/* Title */}
                    <motion.h1 
                        variants={fadeInUp}
                        className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight"
                    >
                        Gestiona tu inventario
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#135bec] to-[#00d4ff]">
                            de forma inteligente
                        </span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p 
                        variants={fadeInUp}
                        className="text-xl text-slate-400 max-w-2xl mx-auto mb-10"
                    >
                        La plataforma más completa para controlar tu stock, analizar tendencias 
                        y optimizar tu negocio con tecnología de última generación.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div 
                        variants={fadeInUp}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Link href="/register">
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(19, 91, 236, 0.5)" }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-[#135bec] hover:bg-[#1048c7] rounded-xl font-bold text-lg transition-all shadow-lg shadow-[#135bec]/25"
                            >
                                Comenzar Gratis →
                            </motion.button>
                        </Link>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 border border-slate-700 hover:border-slate-600 rounded-xl font-bold text-lg transition-all flex items-center gap-2"
                        >
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z"/>
                            </svg>
                            Ver Demo
                        </motion.button>
                    </motion.div>

                    {/* Floating Dashboard Preview */}
                    <motion.div 
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="mt-16 relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a] via-transparent to-transparent z-10 pointer-events-none" />
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 backdrop-blur-sm shadow-2xl"
                        >
                            <div className="bg-slate-900 rounded-xl overflow-hidden">
                                {/* Mock Dashboard */}
                                <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-800">
                                    <div className="w-3 h-3 rounded-full bg-red-500" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                    <div className="w-3 h-3 rounded-full bg-green-500" />
                                    <span className="ml-4 text-sm text-slate-500">dashboard.dashstock.com</span>
                                </div>
                                <div className="p-6 grid grid-cols-4 gap-4">
                                    {[
                                        { label: "Productos", value: "2,459", color: "text-blue-400" },
                                        { label: "Ventas Hoy", value: "$12,847", color: "text-green-400" },
                                        { label: "Stock Bajo", value: "23", color: "text-orange-400" },
                                        { label: "Alertas", value: "5", color: "text-red-400" }
                                    ].map((stat, i) => (
                                        <div key={i} className="bg-slate-800/50 rounded-lg p-4 text-center">
                                            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                                            <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-6 h-10 border-2 border-slate-600 rounded-full flex justify-center pt-2"
                >
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                </motion.div>
            </motion.div>
        </section>
    )
}
