import { Droplets } from 'lucide-react'
import type { SyrupOption } from '../../types/order'
import { RadioCard } from '../ui/RadioCard'

type SyrupSelectorProps = {
  syrups: SyrupOption[]
  selectedSyrupId: string
  stepNumber: number
  onSelect: (syrupId: string) => void
}

export function SyrupSelector({ syrups, selectedSyrupId, stepNumber, onSelect }: SyrupSelectorProps) {
  return (
    <section id="builder-syrup" className="scroll-mt-28">
      <div className="mb-5">
        <p className="text-sm font-extrabold text-[var(--leaf-700)]">{stepNumber}. Calda</p>
        <h3 className="break-words font-display text-3xl font-extrabold leading-tight text-[var(--ink-900)]">Escolha uma calda</h3>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {syrups.map((syrup) => (
          <RadioCard
            key={syrup.id}
            title={syrup.name}
            description={syrup.description}
            selected={syrup.id === selectedSyrupId}
            icon={<Droplets size={18} />}
            onClick={() => onSelect(syrup.id)}
          />
        ))}
      </div>
    </section>
  )
}
