import { Check } from 'lucide-react'
import { cn } from '../../utils/cn'
import { formatCurrency } from '../../utils/formatCurrency'

type OptionCardProps = {
  title: string
  description: string
  price?: number
  image?: string
  selected?: boolean
  onClick: () => void
}

export function OptionCard({ title, description, price, image, selected = false, onClick }: OptionCardProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        'touch-card relative flex min-h-44 w-full min-w-0 flex-col items-center justify-between rounded-2xl border bg-[var(--cream-50)] p-4 text-center transition duration-300 ease-out hover:-translate-y-1 active:translate-y-0 active:scale-[0.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--leaf-600)]',
        selected
          ? 'border-[var(--leaf-700)] bg-[oklch(98%_0.025_126)] shadow-[0_18px_36px_oklch(48%_0.14_126_/_20%)]'
          : 'border-[var(--cream-200)] shadow-[0_14px_30px_oklch(20%_0.04_326_/_8%)] hover:border-[var(--leaf-500)]',
      )}
    >
      {selected && (
        <span className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-full bg-[var(--leaf-700)] text-[var(--cream-50)]">
          <Check size={16} />
        </span>
      )}
      {image && <img src={image} alt="" className="h-20 w-full object-contain" loading="lazy" />}
      <span className="mt-2 block font-extrabold text-[var(--ink-900)]">{title}</span>
      <span className="text-xs font-bold text-[var(--ink-500)]">{description}</span>
      {price !== undefined && (
        <span className="mt-2 text-sm font-extrabold text-[var(--ink-700)]">
          {formatCurrency(price)}
        </span>
      )}
    </button>
  )
}
