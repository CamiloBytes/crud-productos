"use client"
import { motion } from 'framer-motion'

const stats = [
    { number: "10K+", label: "Usuarios Activos" },
    { number: "50M+", label: "Productos Gestionados" },
    { number: "99.9%", label: "Uptime Garantizado" },
    { number: "24/7", label: "Soporte Técnico" }
]

export const StatsSection = () => {
    return (
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
    )
}
