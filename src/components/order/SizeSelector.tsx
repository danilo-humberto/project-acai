import type { OrderValidation, SizeOption } from '../../types/order'
import { OptionCard } from '../ui/OptionCard'

type SizeSelectorProps = {
  sizes: SizeOption[]
  selectedSizeId: string
  fieldErrors: OrderValidation['fieldErrors']
  stepNumber: number
  onSelect: (sizeId: string) => void
}

export function SizeSelector({
  sizes,
  selectedSizeId,
  fieldErrors,
  stepNumber,
  onSelect,
}: SizeSelectorProps) {
  return (
    <section id="builder-size" className="scroll-mt-28">
      <div className="mb-5">
        <p className="text-sm font-extrabold text-[var(--leaf-700)]">{stepNumber}. Escolha o tamanho</p>
        <h3 className="break-words font-display text-3xl font-extrabold leading-tight text-[var(--ink-900)]">Qual vai ser o tamanho?</h3>
      </div>
      <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-3">
        {sizes.map((size) => (
          <OptionCard
            key={size.id}
            title={size.name}
            description={size.description}
            price={size.price}
            image={size.image}
            selected={size.id === selectedSizeId}
            onClick={() => onSelect(size.id)}
          />
        ))}
      </div>
      {fieldErrors.sizeId && (
        <p className="mt-3 text-sm font-bold text-[var(--berry-600)]">{fieldErrors.sizeId}</p>
      )}
    </section>
  )
}
