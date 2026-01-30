import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline'
    isLoading?: boolean
    icon?: React.ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ children, variant = 'primary', isLoading, icon, className = '', disabled, ...props }, ref) => {
        const baseStyles = "w-full py-3.5 font-bold rounded-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        
        const variants = {
            primary: "bg-[#135bec] hover:bg-[#135bec]/90 text-white shadow-lg shadow-[#135bec]/30",
            secondary: "bg-slate-800/50 hover:bg-slate-800 text-slate-200 border border-slate-700",
            outline: "bg-transparent hover:bg-slate-800/50 text-slate-200 border border-slate-700"
        }

        return (
            <button
                ref={ref}
                className={`${baseStyles} ${variants[variant]} ${className}`}
                disabled={disabled || isLoading}
                {...props}
            >
                {isLoading ? 'Cargando...' : children}
                {!isLoading && icon}
            </button>
        )
    }
)

Button.displayName = 'Button'
