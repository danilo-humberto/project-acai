import type { ReactNode } from 'react'
import { cn } from '../../utils/cn'

type SectionTitleProps = {
  eyebrow?: string
  title: string
  description?: string
  action?: ReactNode
  className?: string
}

export function SectionTitle({ eyebrow, title, description, action, className }: SectionTitleProps) {
  return (
    <div className={cn('mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between', className)}>
      <div className="max-w-2xl">
        {eyebrow && <p className="mb-2 text-sm font-extrabold text-[var(--leaf-700)]">{eyebrow}</p>}
        <h2 className="font-display text-4xl font-extrabold leading-[0.98] text-[var(--ink-900)] md:text-5xl">
          {title}
        </h2>
        {description && <p className="mt-3 max-w-xl text-base leading-7 text-[var(--ink-700)]">{description}</p>}
      </div>
      {action}
    </div>
  )
}
