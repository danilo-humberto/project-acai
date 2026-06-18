import { CheckCircle2, Clipboard, ExternalLink, RotateCcw, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/Button'

type OrderConfirmationModalProps = {
  isOpen: boolean
  publicCode?: string
  trackingUrl?: string
  onClose: () => void
  onNewOrder: () => void
}

export function OrderConfirmationModal({
  isOpen,
  publicCode,
  trackingUrl,
  onClose,
  onNewOrder,
}: OrderConfirmationModalProps) {
  const navigate = useNavigate()
  const [copyFeedback, setCopyFeedback] = useState('Copiar link')
  const absoluteTrackingUrl = useMemo(() => {
    if (!trackingUrl) {
      return ''
    }

    return new URL(trackingUrl, window.location.origin).toString()
  }, [trackingUrl])

  if (!isOpen || !publicCode || !trackingUrl) {
    return null
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(absoluteTrackingUrl)
      setCopyFeedback('Link copiado')
      window.setTimeout(() => setCopyFeedback('Copiar link'), 1800)
    } catch {
      setCopyFeedback('Não foi possível copiar')
      window.setTimeout(() => setCopyFeedback('Copiar link'), 1800)
    }
  }

  const handleTrackOrder = () => {
    onClose()
    navigate(trackingUrl)
  }

  return (
    <div
      className="fixed inset-0 z-[80] grid place-items-center bg-[oklch(14%_0.055_326_/_72%)] px-4 py-6 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="order-confirmation-title"
    >
      <div className="w-full max-w-lg overflow-hidden rounded-[2rem] bg-[var(--cream-50)] text-[var(--ink-900)] panel-shadow">
        <div className="flex items-start justify-between gap-4 bg-[linear-gradient(135deg,var(--plum-800),var(--berry-600))] px-6 py-5 text-[var(--cream-50)]">
          <div className="flex items-start gap-3">
            <span className="mt-1 grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[oklch(98%_0.01_326_/_14%)]">
              <CheckCircle2 size={24} />
            </span>
            <div>
              <h2 id="order-confirmation-title" className="font-display text-3xl font-extrabold leading-tight">
                Pedido realizado com sucesso!
              </h2>
              <p className="mt-1 text-sm leading-6 text-[oklch(96%_0.02_326)]">
                Seu pedido foi recebido e será preparado para retirada.
              </p>
            </div>
          </div>
          <button
            type="button"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-[var(--cream-50)] transition hover:bg-[oklch(98%_0.01_326_/_12%)]"
            onClick={onClose}
            aria-label="Fechar confirmação"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-5 p-6">
          <div className="grid gap-3 sm:grid-cols-[0.8fr_1.2fr]">
            <div className="rounded-2xl bg-[var(--cream-100)] p-4">
              <p className="text-xs font-extrabold uppercase text-[var(--ink-500)]">Código do pedido</p>
              <p className="mt-2 font-display text-3xl font-extrabold text-[var(--leaf-700)]">{publicCode}</p>
            </div>
            <div className="rounded-2xl bg-[var(--cream-100)] p-4">
              <p className="text-xs font-extrabold uppercase text-[var(--ink-500)]">Link de acompanhamento</p>
              <p className="mt-2 break-all text-sm font-bold leading-6 text-[var(--ink-700)]">{trackingUrl}</p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Button variant="soft" className="w-full" icon={<Clipboard size={18} />} onClick={handleCopyLink}>
              {copyFeedback}
            </Button>
            <Button variant="leaf" className="w-full" icon={<ExternalLink size={18} />} onClick={handleTrackOrder}>
              Acompanhar pedido
            </Button>
          </div>

          <Button variant="plum" className="w-full" icon={<RotateCcw size={18} />} onClick={onNewOrder}>
            Fazer novo pedido
          </Button>
        </div>
      </div>
    </div>
  )
}
