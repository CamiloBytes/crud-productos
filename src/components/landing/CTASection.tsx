"use client"
import { motion } from 'framer-motion'
import Link from 'next/link'

export const CTASection = () => {
    return (
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
    )
}
