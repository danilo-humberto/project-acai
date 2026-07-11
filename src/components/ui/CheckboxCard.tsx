import { Check } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '../../utils/cn'
import { formatCurrency } from '../../utils/formatCurrency'

type CheckboxCardProps = {
  title: string
  description: string
  price?: number
  selected: boolean
  icon?: ReactNode
  disabled?: boolean
  statusLabel?: string
  onClick: () => void
}

export function CheckboxCard({
  title,
  description,
  price,
  selected,
  icon,
  disabled = false,
  statusLabel,
  onClick,
}: CheckboxCardProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'touch-card flex min-h-24 w-full min-w-0 items-start gap-3 rounded-2xl border p-4 text-left transition duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--leaf-600)]',
        disabled
          ? 'cursor-not-allowed border-[var(--cream-200)] bg-[var(--cream-100)] opacity-65'
          : selected
          ? 'border-[var(--leaf-700)] bg-[oklch(72%_0.14_126_/_14%)] shadow-[0_14px_28px_oklch(48%_0.14_126_/_13%)]'
          : 'border-[var(--cream-200)] bg-[var(--cream-50)] hover:-translate-y-0.5 hover:border-[var(--leaf-500)] active:translate-y-0 active:scale-[0.99]',
      )}
    >
      <span
        className={cn(
          'grid h-8 w-8 shrink-0 place-items-center rounded-xl',
          selected ? 'bg-[var(--leaf-700)] text-[var(--cream-50)]' : 'bg-[var(--cream-100)] text-[var(--leaf-700)]',
        )}
      >
        {selected ? <Check size={17} /> : icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-extrabold text-[var(--ink-900)]">{title}</span>
        <span className="block text-sm leading-5 text-[var(--ink-500)]">{description}</span>
        {price !== undefined && (
          <span className="mt-1 block text-sm font-extrabold text-[var(--leaf-700)]">
            + {formatCurrency(price)}
          </span>
        )}
      </span>
      {statusLabel && (
        <span className="shrink-0 rounded-full bg-[oklch(45%_0.17_346_/_12%)] px-2.5 py-1 text-xs font-extrabold text-[var(--berry-600)]">
          {statusLabel}
        </span>
      )}
    </button>
  )
}
