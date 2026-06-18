import { Cookie, Milk, Nut, Sparkles } from 'lucide-react'
import type { ToppingOption } from '../../types/order'
import { CheckboxCard } from '../ui/CheckboxCard'

type ToppingSelectorProps = {
  toppings: ToppingOption[]
  selectedToppingIds: string[]
  stepNumber: number
  onToggle: (toppingId: string) => void
}

const toppingIcons = {
  amendoim: <Nut size={18} />,
  granola: <Sparkles size={18} />,
  leite: <Milk size={18} />,
  biscoito: <Cookie size={18} />,
  jujuba: <Sparkles size={18} />,
  cereais: <Sparkles size={18} />,
  mms: <Cookie size={18} />,
  pacoca: <Cookie size={18} />,
  canudo: <Cookie size={18} />,
}

export function ToppingSelector({ toppings, selectedToppingIds, stepNumber, onToggle }: ToppingSelectorProps) {
  return (
    <section id="builder-toppings" className="scroll-mt-28">
      <div className="mb-5">
        <p className="text-sm font-extrabold text-[var(--leaf-700)]">{stepNumber}. Adicionais</p>
        <h3 className="break-words font-display text-3xl font-extrabold leading-tight text-[var(--ink-900)]">Capriche na cobertura</h3>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {toppings.map((topping) => (
          <CheckboxCard
            key={topping.id}
            title={topping.name}
            description={topping.description}
            selected={selectedToppingIds.includes(topping.id)}
            icon={toppingIcons[topping.id as keyof typeof toppingIcons]}
            onClick={() => onToggle(topping.id)}
          />
        ))}
      </div>
    </section>
  )
}
