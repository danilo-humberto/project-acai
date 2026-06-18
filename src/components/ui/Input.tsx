import type { ChangeEventHandler, InputHTMLAttributes } from 'react'
import { cn } from '../../utils/cn'

type InputProps = {
  id: string
  label: string
  value: string
  placeholder?: string
  type?: string
  onChange: ChangeEventHandler<HTMLInputElement>
  className?: string
  error?: string
  required?: boolean
  inputMode?: InputHTMLAttributes<HTMLInputElement>['inputMode']
  maxLength?: number
  autoComplete?: string
}

export function Input({
  id,
  label,
  value,
  placeholder,
  type = 'text',
  onChange,
  className,
  error,
  required = false,
  inputMode,
  maxLength,
  autoComplete,
}: InputProps) {
  return (
    <label className={cn('block', className)} htmlFor={id}>
      <span className="mb-2 block text-sm font-extrabold text-[var(--ink-900)]">
        {label}
        {required && <span className="text-[var(--berry-600)]"> *</span>}
      </span>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        inputMode={inputMode}
        maxLength={maxLength}
        autoComplete={autoComplete}
        onChange={onChange}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          'min-h-12 w-full rounded-2xl border bg-[var(--cream-50)] px-4 text-[var(--ink-900)] outline-none transition placeholder:text-[var(--ink-500)] focus:border-[var(--leaf-600)] focus:ring-4 focus:ring-[oklch(56%_0.16_126_/_15%)]',
          error ? 'border-[var(--berry-600)]' : 'border-[var(--cream-200)]',
        )}
      />
      {error && (
        <span id={`${id}-error`} className="mt-2 block text-xs font-bold text-[var(--berry-600)]">
          {error}
        </span>
      )}
    </label>
  )
}
