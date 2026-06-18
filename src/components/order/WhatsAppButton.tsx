import { MessageCircle } from 'lucide-react'
import type { OrderValidation } from '../../types/order'
import { Button } from '../ui/Button'

type WhatsAppButtonProps = {
  whatsappUrl: string
  validation: OrderValidation
}

export function WhatsAppButton({ whatsappUrl, validation }: WhatsAppButtonProps) {
  if (!validation.isValid) {
    return (
      <div className="space-y-3">
        <Button variant="leaf" className="min-h-14 w-full" icon={<MessageCircle size={18} />} disabled>
          Enviar pedido no WhatsApp
        </Button>
        <div className="rounded-2xl bg-[oklch(45%_0.17_346_/_10%)] p-4 text-sm leading-6 text-[var(--berry-600)]">
          <p className="font-extrabold">Preencha os dados obrigatórios para enviar.</p>
          <ul className="mt-2 list-inside list-disc">
            {validation.errors.slice(0, 4).map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  return (
    <Button
      href={whatsappUrl}
      target="_blank"
      variant="leaf"
      className="min-h-14 w-full"
      icon={<MessageCircle size={18} />}
    >
      Enviar pedido no WhatsApp
    </Button>
  )
}
