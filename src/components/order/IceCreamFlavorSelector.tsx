import { Snowflake } from 'lucide-react'
import type { IceCreamFlavorOption, OrderValidation } from '../../types/order'
import { RadioCard } from '../ui/RadioCard'

type IceCreamFlavorSelectorProps = {
  flavors: IceCreamFlavorOption[]
  selectedFlavorId: string
  fieldErrors: OrderValidation['fieldErrors']
  stepNumber: number
  onSelect: (flavorId: string) => void
}

export function IceCreamFlavorSelector({
  flavors,
  selectedFlavorId,
  fieldErrors,
  stepNumber,
  onSelect,
}: IceCreamFlavorSelectorProps) {
  return (
    <section id="builder-icecream-flavor" className="scroll-mt-28">
      <div className="mb-5">
        <p className="text-sm font-extrabold text-[var(--leaf-700)]">
          {stepNumber}. Sabor do creme
        </p>
        <h3 className="break-words font-display text-3xl font-extrabold leading-tight text-[var(--ink-900)]">
          Escolha 1 sabor
        </h3>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {flavors.map((flavor) => (
          <RadioCard
            key={flavor.id}
            title={flavor.name}
            description={flavor.description}
            selected={flavor.id === selectedFlavorId}
            icon={<Snowflake size={18} />}
            onClick={() => onSelect(flavor.id)}
          />
        ))}
      </div>
      {fieldErrors.iceCreamFlavorId && (
        <p className="mt-3 text-sm font-bold text-[var(--berry-600)]">
          {fieldErrors.iceCreamFlavorId}
        </p>
      )}
    </section>
  )
}
