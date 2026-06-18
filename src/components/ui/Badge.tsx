import type { ReactNode } from 'react'
import { cn } from '../../utils/cn'

type BadgeProps = {
  children: ReactNode
  icon?: ReactNode
  tone?: 'light' | 'leaf' | 'plum'
  className?: string
}

const toneClasses = {
  light: 'bg-[oklch(99%_0.01_326_/_78%)] text-[var(--ink-900)]',
  leaf: 'bg-[oklch(72%_0.14_126_/_16%)] text-[var(--leaf-700)]',
  plum: 'bg-[oklch(45%_0.13_326_/_12%)] text-[var(--plum-800)]',
}

export function Badge({ children, icon, tone = 'light', className }: BadgeProps) {
  return (
    <span className={cn('inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-extrabold', toneClasses[tone], className)}>
      {icon}
      {children}
    </span>
  )
}
