import { ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger'
  fullWidth?: boolean
}

export default function Button({
  children,
  variant = 'primary',
  fullWidth = false,
  disabled,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        // Base styles
        'px-4 py-2 rounded font-medium transition-colors duration-200',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-60',
        // Variant styles
        {
          'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500': variant === 'primary',
          'bg-secondary-200 text-secondary-800 hover:bg-secondary-300 focus:ring-secondary-500': variant === 'secondary',
          'bg-danger-600 text-white hover:bg-danger-700 focus:ring-danger-500': variant === 'danger',
        },
        // Width
        fullWidth && 'w-full',
        // Custom className
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
