import type { OrderStep } from '../types/order'

export const orderSteps: OrderStep[] = [
  {
    id: 'order-type',
    title: 'Tipo',
    description: 'Açaí ou creme',
  },
  {
    id: 'size',
    title: 'Tamanho',
    description: 'P, M ou G',
  },
  {
    id: 'icecream-flavor',
    title: 'Sabor',
    description: 'Se tiver creme',
  },
  {
    id: 'fruits',
    title: 'Frutas',
    description: 'Ate 4 opcoes',
  },
  {
    id: 'toppings',
    title: 'Adicionais',
    description: 'Escolha à vontade',
  },
  {
    id: 'syrup',
    title: 'Calda',
    description: 'Escolha uma',
  },
  {
    id: 'customer',
    title: 'Dados',
    description: 'Nome e telefone',
  },
  {
    id: 'payment',
    title: 'Pagamento',
    description: 'Como vai pagar',
  },
  {
    id: 'review',
    title: 'Revisao',
    description: 'Conferir pedido',
  },
]
