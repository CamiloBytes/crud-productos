"use client"
import { motion } from 'framer-motion'
import { ScrollReveal } from './ScrollReveal'

export const HowItWorksSection = () => {
    const steps = [
        { step: "01", title: "Crea tu cuenta", desc: "Regístrate gratis en menos de 2 minutos" },
        { step: "02", title: "Agrega productos", desc: "Importa o añade tu inventario fácilmente" },
        { step: "03", title: "¡Listo!", desc: "Comienza a gestionar y analizar tu stock" }
    ]

    return (
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
                    
                    {steps.map((item, index) => (
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
    )
}
