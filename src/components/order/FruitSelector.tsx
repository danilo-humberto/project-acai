import { Apple, Banana, Cherry, Grape } from 'lucide-react'
import type { FruitOption } from '../../types/order'
import { CheckboxCard } from '../ui/CheckboxCard'

type FruitSelectorProps = {
  fruits: FruitOption[]
  selectedFruitIds: string[]
  unavailableFruitIds: string[]
  isAvailabilityReady: boolean
  stepNumber: number
  onToggle: (fruitId: string) => void
}

const fruitIcons = {
  banana: <Banana size={18} />,
  morango: <Cherry size={18} />,
  uva: <Grape size={18} />,
  manga: <Apple size={18} />,
}

export function FruitSelector({
  fruits,
  selectedFruitIds,
  unavailableFruitIds,
  isAvailabilityReady,
  stepNumber,
  onToggle,
}: FruitSelectorProps) {
  return (
    <section id="builder-fruits" className="scroll-mt-28">
      <div className="mb-5">
        <p className="text-sm font-extrabold text-[var(--leaf-700)]">{stepNumber}. Frutas</p>
        <h3 className="break-words font-display text-3xl font-extrabold leading-tight text-[var(--ink-900)]">Escolha até 4 opções</h3>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {fruits.map((fruit) => (
          <CheckboxCard
            key={fruit.id}
            title={fruit.name}
            description={fruit.description}
            selected={selectedFruitIds.includes(fruit.id)}
            disabled={!isAvailabilityReady || unavailableFruitIds.includes(fruit.id)}
            statusLabel={unavailableFruitIds.includes(fruit.id) ? 'Esgotado' : undefined}
            icon={fruitIcons[fruit.id as keyof typeof fruitIcons]}
            onClick={() => onToggle(fruit.id)}
          />
        ))}
      </div>
    </section>
  )
}
