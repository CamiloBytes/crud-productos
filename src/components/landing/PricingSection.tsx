"use client"
import { motion } from 'framer-motion'
import { ScrollReveal } from './ScrollReveal'

const plans = [
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
]

export const PricingSection = () => {
    return (
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
                    {plans.map((plan, index) => (
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
    )
}
