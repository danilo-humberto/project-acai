import { Check } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '../../utils/cn'
import { formatCurrency } from '../../utils/formatCurrency'

type RadioCardProps = {
  title: string
  description: string
  selected: boolean
  price?: number
  icon?: ReactNode
  onClick: () => void
}

export function RadioCard({ title, description, selected, price, icon, onClick }: RadioCardProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        'touch-card flex min-h-24 w-full min-w-0 items-center gap-3 rounded-2xl border p-4 text-left transition duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--leaf-600)]',
        selected
          ? 'border-[var(--leaf-700)] bg-[oklch(72%_0.14_126_/_14%)] shadow-[0_14px_28px_oklch(48%_0.14_126_/_13%)]'
          : 'border-[var(--cream-200)] bg-[var(--cream-50)] hover:border-[var(--leaf-500)]',
      )}
    >
      <span
        className={cn(
          'grid h-9 w-9 shrink-0 place-items-center rounded-xl',
          selected ? 'bg-[var(--leaf-700)] text-[var(--cream-50)]' : 'bg-[var(--cream-100)] text-[var(--leaf-700)]',
        )}
      >
        {selected ? <Check size={18} /> : icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-extrabold text-[var(--ink-900)]">{title}</span>
        <span className="block text-sm leading-5 text-[var(--ink-500)]">{description}</span>
      </span>
      {price !== undefined && <span className="shrink-0 text-sm font-extrabold text-[var(--leaf-700)]">{formatCurrency(price)}</span>}
    </button>
  )
}
