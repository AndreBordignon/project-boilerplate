import { InputHTMLAttributes } from 'react'
import clsx from 'clsx'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export default function Input({ label, error, className, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="font-medium text-text-primary">
          {label}
        </label>
      )}
      <input
        className={clsx(
          'px-3 py-3 rounded text-base',
          'border border-border',
          'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
          'transition-colors duration-200',
          'disabled:bg-secondary-100 disabled:cursor-not-allowed',
          error && 'border-danger-500 focus:ring-danger-500',
          className
        )}
        {...props}
      />
      {error && (
        <span className="text-danger-500 text-sm">
          {error}
        </span>
      )}
    </div>
  )
}
