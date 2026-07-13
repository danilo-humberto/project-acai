import type { OrderTypeId, OrderTypeOption, OrderValidation } from '../../types/order'
import { OptionCard } from '../ui/OptionCard'

type OrderTypeSelectorProps = {
  orderTypes: OrderTypeOption[]
  selectedOrderTypeId: OrderTypeId | ''
  isBarcaSelected: boolean
  fieldErrors: OrderValidation['fieldErrors']
  stepNumber: number
  onSelect: (orderTypeId: OrderTypeId) => void
}

export function OrderTypeSelector({
  orderTypes,
  selectedOrderTypeId,
  isBarcaSelected,
  fieldErrors,
  stepNumber,
  onSelect,
}: OrderTypeSelectorProps) {
  return (
    <section id="builder-order-type" className="scroll-mt-28">
      <div className="mb-5">
        <p className="text-sm font-extrabold text-[var(--leaf-700)]">
          {stepNumber}. Tipo do pedido
        </p>
        <h3 className="break-words font-display text-3xl font-extrabold leading-tight text-[var(--ink-900)]">
          O que vai {isBarcaSelected ? 'na barca' : 'no pote'}?
        </h3>
      </div>
      <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-3">
        {orderTypes.map((orderType) => (
          <OptionCard
            key={orderType.id}
            title={orderType.name}
            description={orderType.description}
            image={orderType.image}
            selected={orderType.id === selectedOrderTypeId}
            onClick={() => onSelect(orderType.id)}
          />
        ))}
      </div>
      {fieldErrors.orderTypeId && (
        <p className="mt-3 text-sm font-bold text-[var(--berry-600)]">
          {fieldErrors.orderTypeId}
        </p>
      )}
    </section>
  )
}
