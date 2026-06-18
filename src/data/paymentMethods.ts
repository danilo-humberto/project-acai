import type { PaymentMethodOption } from '../types/order'

export const paymentMethods: PaymentMethodOption[] = [
  {
    id: 'pix',
    name: 'Pix',
    description: 'Confirmação rápida',
  },
  {
    id: 'card',
    name: 'Cartão na retirada',
    description: 'Crédito ou débito no balcão',
  },
  {
    id: 'cash',
    name: 'Dinheiro na retirada',
    description: 'Com opção de troco',
  },
]
