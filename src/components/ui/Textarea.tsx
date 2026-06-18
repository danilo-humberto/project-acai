import type { ChangeEventHandler } from 'react'
import { cn } from '../../utils/cn'

type TextareaProps = {
  id: string
  label: string
  value: string
  placeholder?: string
  onChange: ChangeEventHandler<HTMLTextAreaElement>
  error?: string
  required?: boolean
}

export function Textarea({ id, label, value, placeholder, onChange, error, required = false }: TextareaProps) {
  return (
    <label className="block" htmlFor={id}>
      <span className="mb-2 block text-sm font-extrabold text-[var(--ink-900)]">
        {label}
        {required && <span className="text-[var(--berry-600)]"> *</span>}
      </span>
      <textarea
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        rows={4}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          'w-full resize-none rounded-2xl border bg-[var(--cream-50)] px-4 py-3 text-[var(--ink-900)] outline-none transition placeholder:text-[var(--ink-500)] focus:border-[var(--leaf-600)] focus:ring-4 focus:ring-[oklch(56%_0.16_126_/_15%)]',
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
