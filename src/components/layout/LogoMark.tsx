import { cn } from '../../utils/cn'

type LogoMarkProps = {
  compact?: boolean
  className?: string
  href?: string
}

export function LogoMark({ compact = false, className, href = '#inicio' }: LogoMarkProps) {
  return (
    <a href={href} className={cn('inline-flex items-center gap-3', className)} aria-label="The Açaí Co.">
      <span className="relative grid h-9 w-9 place-items-center">
        <span className="absolute left-1 top-3 h-4 w-4 rounded-full bg-[var(--berry-600)] shadow-[0_6px_18px_oklch(30%_0.1_326_/_38%)]" />
        <span className="absolute right-1 top-3 h-4 w-4 rounded-full bg-[var(--plum-800)] shadow-[0_6px_18px_oklch(30%_0.1_326_/_32%)]" />
        <span className="absolute right-2 top-0 h-4 w-2 rotate-45 rounded-full bg-[var(--leaf-500)]" />
      </span>
      {!compact && <span className="font-display text-2xl font-extrabold text-[var(--cream-50)]">The Açaí Co.</span>}
    </a>
  )
}
