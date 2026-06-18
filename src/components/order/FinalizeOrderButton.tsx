import { CheckCircle2, LoaderCircle } from 'lucide-react'
import type { OrderValidation } from '../../types/order'
import { Button } from '../ui/Button'

type FinalizeOrderButtonProps = {
  validation: OrderValidation
  isFinalizing: boolean
  finalizeError: string | null
  onFinalize: () => void
}

export function FinalizeOrderButton({
  validation,
  isFinalizing,
  finalizeError,
  onFinalize,
}: FinalizeOrderButtonProps) {
  if (!validation.isValid) {
    return (
      <div className="space-y-3">
        <Button variant="leaf" className="min-h-14 w-full" icon={<CheckCircle2 size={18} />} disabled>
          Finalizar pedido
        </Button>
        <div className="rounded-2xl bg-[oklch(45%_0.17_346_/_10%)] p-4 text-sm leading-6 text-[var(--berry-600)]">
          <p className="font-extrabold">Preencha os dados obrigatórios para finalizar.</p>
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
    <div className="space-y-3">
      <Button
        variant="leaf"
        className="min-h-14 w-full"
        icon={isFinalizing ? <LoaderCircle className="animate-spin" size={18} /> : <CheckCircle2 size={18} />}
        onClick={onFinalize}
        disabled={isFinalizing}
      >
        {isFinalizing ? 'Finalizando...' : 'Finalizar pedido'}
      </Button>
      {finalizeError && (
        <div className="rounded-2xl bg-[oklch(45%_0.17_346_/_10%)] p-4 text-sm font-bold leading-6 text-[var(--berry-600)]">
          {finalizeError}
        </div>
      )}
    </div>
  )
}
