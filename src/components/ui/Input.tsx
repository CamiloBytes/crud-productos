import { InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string
    icon?: React.ReactNode
    error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, icon, error, className = '', ...props }, ref) => {
        return (
            <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-300" htmlFor={props.id}>
                    {label}
                </label>
                <div className="relative">
                    {icon && (
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                            {icon}
                        </span>
                    )}
                    <input
                        ref={ref}
                        className={`w-full ${icon ? 'pl-11' : 'pl-4'} pr-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:ring-2 focus:ring-[#135bec] focus:border-transparent transition-all outline-none ${error ? 'border-red-500' : ''} ${className}`}
                        {...props}
                    />
                </div>
                {error && <p className="text-xs text-red-500">{error}</p>}
            </div>
        )
    }
)

Input.displayName = 'Input'
