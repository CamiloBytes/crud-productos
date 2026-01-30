"use client"
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'

// Animaciones reutilizables
const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
}

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
}

// Componente para animaciones al hacer scroll
const ScrollReveal = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export default function LandingPage() {
    const targetRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end start"]
    })
    
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

    const features = [
        {
            icon: "📦",
            title: "Gestión de Inventario",
            description: "Control total de tu stock en tiempo real con alertas automáticas de bajo inventario."
        },
        {
            icon: "📊",
            title: "Análisis Avanzado",
            description: "Dashboards interactivos con métricas clave para tomar mejores decisiones."
        },
        {
            icon: "🔒",
            title: "Seguridad Total",
            description: "Autenticación robusta y control de acceso basado en roles."
        },
        {
            icon: "⚡",
            title: "Velocidad Extrema",
            description: "Rendimiento optimizado para manejar miles de productos sin demoras."
        },
        {
            icon: "🌐",
            title: "Acceso Global",
            description: "Accede desde cualquier dispositivo, en cualquier momento y lugar."
        },
        {
            icon: "🔄",
            title: "Sincronización",
            description: "Datos actualizados en tiempo real entre todos tus dispositivos."
        }
    ]

    const stats = [
        { number: "10K+", label: "Usuarios Activos" },
        { number: "50M+", label: "Productos Gestionados" },
        { number: "99.9%", label: "Uptime Garantizado" },
        { number: "24/7", label: "Soporte Técnico" }
    ]

    const testimonials = [
        {
            name: "María García",
            role: "CEO, TechStore",
            image: "https://randomuser.me/api/portraits/women/44.jpg",
            quote: "DashStock transformó completamente la manera en que gestionamos nuestro inventario. ¡Increíble!"
        },
        {
            name: "Carlos Rodríguez",
            role: "Gerente, SuperMarket Plus",
            image: "https://randomuser.me/api/portraits/men/32.jpg",
            quote: "La mejor inversión que hemos hecho. Redujimos errores de inventario en un 90%."
        },
        {
            name: "Ana Martínez",
            role: "Fundadora, EcoProducts",
            image: "https://randomuser.me/api/portraits/women/68.jpg",
            quote: "Interfaz intuitiva y soporte excepcional. Lo recomiendo totalmente."
        }
    ]

    return (
        <div className="min-h-screen bg-[#0a0f1a] text-white overflow-x-hidden">
            {/* Navbar */}
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
                        <a href="#pricing" className="text-slate-400 hover:text-white transition-colors">Precios</a>
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

            {/* Hero Section */}
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

            {/* Features Section */}
            <section id="features" className="py-32 relative">
                <div className="max-w-7xl mx-auto px-6">
                    <ScrollReveal className="text-center mb-16">
                        <span className="text-[#135bec] font-semibold text-sm uppercase tracking-wider">Características</span>
                        <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">Todo lo que necesitas</h2>
                        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                            Herramientas poderosas diseñadas para simplificar la gestión de tu inventario
                        </p>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -5, scale: 1.02 }}
                                className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-[#135bec]/50 transition-all group"
                            >
                                <motion.div 
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    className="w-14 h-14 bg-[#135bec]/10 rounded-xl flex items-center justify-center text-3xl mb-4 group-hover:bg-[#135bec]/20 transition-colors"
                                >
                                    {feature.icon}
                                </motion.div>
                                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                                <p className="text-slate-400">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section id="stats" className="py-32 relative bg-gradient-to-b from-[#0a0f1a] via-[#0d1424] to-[#0a0f1a]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.5 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="text-center"
                            >
                                <motion.p 
                                    className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#135bec] to-[#00d4ff]"
                                    whileInView={{ scale: [1, 1.1, 1] }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                                >
                                    {stat.number}
                                </motion.p>
                                <p className="text-slate-400 mt-2 font-medium">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How it Works */}
            <section className="py-32 relative">
                <div className="max-w-7xl mx-auto px-6">
                    <ScrollReveal className="text-center mb-16">
                        <span className="text-[#135bec] font-semibold text-sm uppercase tracking-wider">Proceso</span>
                        <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">Cómo funciona</h2>
                        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                            Comienza a gestionar tu inventario en solo 3 simples pasos
                        </p>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-3 gap-8 relative">
                        {/* Connecting Line */}
                        <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#135bec]/30 to-transparent -translate-y-1/2" />
                        
                        {[
                            { step: "01", title: "Crea tu cuenta", desc: "Regístrate gratis en menos de 2 minutos" },
                            { step: "02", title: "Agrega productos", desc: "Importa o añade tu inventario fácilmente" },
                            { step: "03", title: "¡Listo!", desc: "Comienza a gestionar y analizar tu stock" }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                className="relative text-center"
                            >
                                <motion.div 
                                    whileHover={{ scale: 1.1 }}
                                    className="w-20 h-20 mx-auto bg-gradient-to-br from-[#135bec] to-[#0d47a1] rounded-2xl flex items-center justify-center text-2xl font-bold mb-6 shadow-lg shadow-[#135bec]/25"
                                >
                                    {item.step}
                                </motion.div>
                                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                <p className="text-slate-400">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section id="testimonials" className="py-32 relative bg-gradient-to-b from-[#0a0f1a] via-[#0d1424] to-[#0a0f1a]">
                <div className="max-w-7xl mx-auto px-6">
                    <ScrollReveal className="text-center mb-16">
                        <span className="text-[#135bec] font-semibold text-sm uppercase tracking-wider">Testimonios</span>
                        <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">Lo que dicen nuestros clientes</h2>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-3 gap-6">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6"
                            >
                                <div className="flex items-center gap-1 text-yellow-400 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-slate-300 mb-6 italic">&ldquo;{testimonial.quote}&rdquo;</p>
                                <div className="flex items-center gap-4">
                                    <img 
                                        src={testimonial.image} 
                                        alt={testimonial.name}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                    <div>
                                        <p className="font-bold">{testimonial.name}</p>
                                        <p className="text-sm text-slate-400">{testimonial.role}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-32 relative">
                <div className="max-w-7xl mx-auto px-6">
                    <ScrollReveal className="text-center mb-16">
                        <span className="text-[#135bec] font-semibold text-sm uppercase tracking-wider">Precios</span>
                        <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">Planes para todos</h2>
                        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                            Elige el plan que mejor se adapte a tu negocio
                        </p>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {[
                            { 
                                name: "Básico", 
                                price: "Gratis", 
                                desc: "Para pequeños negocios",
                                features: ["Hasta 100 productos", "1 usuario", "Reportes básicos", "Soporte por email"],
                                popular: false
                            },
                            { 
                                name: "Pro", 
                                price: "$29", 
                                desc: "Para negocios en crecimiento",
                                features: ["Productos ilimitados", "5 usuarios", "Reportes avanzados", "Soporte prioritario", "Integraciones API", "Exportar datos"],
                                popular: true
                            },
                            { 
                                name: "Enterprise", 
                                price: "$99", 
                                desc: "Para grandes empresas",
                                features: ["Todo en Pro", "Usuarios ilimitados", "Soporte 24/7", "Personalización", "SLA garantizado", "Manager dedicado"],
                                popular: false
                            }
                        ].map((plan, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -10 }}
                                className={`relative bg-slate-900/50 border rounded-2xl p-8 ${
                                    plan.popular 
                                        ? 'border-[#135bec] shadow-xl shadow-[#135bec]/20' 
                                        : 'border-slate-800'
                                }`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#135bec] rounded-full text-sm font-bold">
                                        Más Popular
                                    </div>
                                )}
                                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                                <p className="text-slate-400 text-sm mb-4">{plan.desc}</p>
                                <div className="mb-6">
                                    <span className="text-4xl font-extrabold">{plan.price}</span>
                                    {plan.price !== "Gratis" && <span className="text-slate-400">/mes</span>}
                                </div>
                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-2 text-slate-300">
                                            <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`w-full py-3 rounded-xl font-bold transition-all ${
                                        plan.popular
                                            ? 'bg-[#135bec] hover:bg-[#1048c7] shadow-lg shadow-[#135bec]/25'
                                            : 'border border-slate-700 hover:border-slate-600'
                                    }`}
                                >
                                    Comenzar
                                </motion.button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 relative">
                <div className="max-w-4xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative bg-gradient-to-r from-[#135bec]/20 to-[#0d47a1]/20 border border-[#135bec]/30 rounded-3xl p-12 text-center overflow-hidden"
                    >
                        {/* Background Glow */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#135bec]/10 to-[#0d47a1]/10 blur-3xl" />
                        
                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-5xl font-bold mb-6">
                                ¿Listo para empezar?
                            </h2>
                            <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto">
                                Únete a miles de negocios que ya optimizan su inventario con DashStock
                            </p>
                            <Link href="/register">
                                <motion.button
                                    whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(19, 91, 236, 0.6)" }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-10 py-4 bg-[#135bec] hover:bg-[#1048c7] rounded-xl font-bold text-lg transition-all shadow-lg shadow-[#135bec]/30"
                                >
                                    Crear Cuenta Gratis
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-10 h-10 bg-gradient-to-br from-[#135bec] to-[#0d47a1] rounded-xl flex items-center justify-center">
                                    <span className="text-xl">📊</span>
                                </div>
                                <span className="text-xl font-bold">DashStock</span>
                            </div>
                            <p className="text-slate-400 text-sm">
                                La plataforma líder en gestión de inventario para negocios modernos.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4">Producto</h4>
                            <ul className="space-y-2 text-slate-400 text-sm">
                                <li><a href="#" className="hover:text-white transition-colors">Características</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Precios</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Integraciones</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4">Empresa</h4>
                            <ul className="space-y-2 text-slate-400 text-sm">
                                <li><a href="#" className="hover:text-white transition-colors">Sobre Nosotros</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Carreras</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Contacto</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4">Legal</h4>
                            <ul className="space-y-2 text-slate-400 text-sm">
                                <li><a href="#" className="hover:text-white transition-colors">Privacidad</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Términos</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-slate-500 text-sm">
                            © 2026 DashStock. Todos los derechos reservados.
                        </p>
                        <div className="flex items-center gap-4">
                            {['twitter', 'github', 'linkedin'].map((social) => (
                                <motion.a
                                    key={social}
                                    href="#"
                                    whileHover={{ scale: 1.2, y: -2 }}
                                    className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                                >
                                    {social === 'twitter' && (
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                                    )}
                                    {social === 'github' && (
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                                    )}
                                    {social === 'linkedin' && (
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                                    )}
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
