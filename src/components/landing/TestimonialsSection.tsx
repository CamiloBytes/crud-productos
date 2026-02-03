"use client"
import { motion } from 'framer-motion'
import { ScrollReveal } from './ScrollReveal'

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

export const TestimonialsSection = () => {
    return (
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
    )
}
