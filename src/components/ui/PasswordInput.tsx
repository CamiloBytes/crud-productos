import { InputHTMLAttributes, forwardRef, useState } from 'react'

interface PasswordInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
    label: string
    error?: string
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
    ({ label, error, className = '', ...props }, ref) => {
        const [showPassword, setShowPassword] = useState(false)

        return (
            <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-300" htmlFor={props.id}>
                    {label}
                </label>
                <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </span>
                    <input
                        ref={ref}
                        type={showPassword ? "text" : "password"}
                        className={`w-full pl-11 pr-12 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:ring-2 focus:ring-[#135bec] focus:border-transparent transition-all outline-none ${error ? 'border-red-500' : ''} ${className}`}
                        {...props}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
                    >
                        {showPassword ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        )}
                    </button>
                </div>
                {error && <p className="text-xs text-red-500">{error}</p>}
            </div>
        )
    }
)

PasswordInput.displayName = 'PasswordInput'
