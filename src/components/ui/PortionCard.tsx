import { Check, Minus, Plus } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '../../utils/cn'
import { formatCurrency } from '../../utils/formatCurrency'
import { EXTRA_PORTION_PRICE_CENTS } from '../../utils/portionSelections'

type PortionCardProps = {
  title: string
  description: string
  quantity: number
  icon?: ReactNode
  disabled?: boolean
  statusLabel?: string
  onToggle: () => void
  onIncrement: () => void
  onDecrement: () => void
}

export function PortionCard({
  title,
  description,
  quantity,
  icon,
  disabled = false,
  statusLabel,
  onToggle,
  onIncrement,
  onDecrement,
}: PortionCardProps) {
  const selected = quantity > 0
  const extraSubtotal = Math.max(quantity - 1, 0) * (EXTRA_PORTION_PRICE_CENTS / 100)

  return (
    <article
      className={cn(
        'touch-card min-h-24 min-w-0 self-start overflow-hidden rounded-2xl border transition duration-300 ease-out',
        disabled
          ? 'border-[var(--cream-200)] bg-[var(--cream-100)] opacity-65'
          : selected
            ? 'border-[var(--leaf-700)] bg-[oklch(72%_0.14_126_/_14%)] shadow-[0_14px_28px_oklch(48%_0.14_126_/_13%)]'
            : 'border-[var(--cream-200)] bg-[var(--cream-50)] hover:-translate-y-0.5 hover:border-[var(--leaf-500)]',
      )}
    >
      <button
        type="button"
        aria-pressed={selected}
        disabled={disabled}
        onClick={onToggle}
        className={cn(
          'flex w-full min-w-0 items-start gap-3 p-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--leaf-600)]',
          disabled ? 'cursor-not-allowed' : 'active:scale-[0.99]',
        )}
      >
        <span
          className={cn(
            'grid h-8 w-8 shrink-0 place-items-center rounded-xl',
            selected
              ? 'bg-[var(--leaf-700)] text-[var(--cream-50)]'
              : 'bg-[var(--cream-100)] text-[var(--leaf-700)]',
          )}
        >
          {selected ? <Check size={17} /> : icon}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-extrabold text-[var(--ink-900)]">{title}</span>
          <span className="block text-sm leading-5 text-[var(--ink-500)]">{description}</span>
          {selected && (
            <span className="mt-1 block text-xs font-extrabold text-[var(--leaf-700)]">
              {quantity === 1
                ? '1 porção incluída'
                : `${quantity} porções · + ${formatCurrency(extraSubtotal)}`}
            </span>
          )}
        </span>
        {statusLabel && (
          <span className="shrink-0 rounded-full bg-[oklch(45%_0.17_346_/_12%)] px-2.5 py-1 text-xs font-extrabold text-[var(--berry-600)]">
            {statusLabel}
          </span>
        )}
      </button>

      {selected && (
        <div className="flex items-center justify-between border-t border-[oklch(48%_0.14_126_/_18%)] px-4 py-3">
          <span className="text-xs font-bold text-[var(--ink-500)]">
            Extra: {formatCurrency(EXTRA_PORTION_PRICE_CENTS / 100)} por porção
          </span>
          <div
            className="flex items-center gap-2"
            role="group"
            aria-label={`Quantidade de ${title}`}
          >
            <button
              type="button"
              disabled={disabled}
              onClick={onDecrement}
              aria-label={`Diminuir quantidade de ${title}`}
              className="grid h-9 w-9 place-items-center rounded-xl border border-[var(--cream-200)] bg-[var(--cream-50)] text-[var(--leaf-700)] transition hover:border-[var(--leaf-500)] hover:bg-[var(--cream-100)] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Minus size={16} />
            </button>
            <output
              aria-live="polite"
              aria-label={`${quantity} ${quantity === 1 ? 'porção' : 'porções'} de ${title}`}
              className="min-w-7 text-center font-display text-lg font-extrabold text-[var(--ink-900)]"
            >
              {quantity}
            </output>
            <button
              type="button"
              disabled={disabled}
              onClick={onIncrement}
              aria-label={`Aumentar quantidade de ${title}`}
              className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--leaf-700)] text-[var(--cream-50)] transition hover:bg-[var(--leaf-600)] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
      )}
    </article>
  )
}
