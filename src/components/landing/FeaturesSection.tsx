"use client"
import { motion } from 'framer-motion'
import { ScrollReveal } from './ScrollReveal'

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

export const FeaturesSection = () => {
    return (
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
    )
}
