import orderAcaiIceCreamImage from '../assets/images/order-acai-icecream.png'
import orderAcaiImage from '../assets/images/order-acai.png'
import orderIceCreamImage from '../assets/images/order-icecream.png'
import type { OrderTypeId, OrderTypeOption } from '../types/order'

export const orderTypes: OrderTypeOption[] = [
  {
    id: 'acai',
    name: 'Só açaí',
    description: 'Açaí puro como base do pote',
    image: orderAcaiImage,
  },
  {
    id: 'acai-icecream',
    name: 'Açaí + 1 sorvete',
    description: 'Açaí com um sabor de sorvete',
    image: orderAcaiIceCreamImage,
  },
  {
    id: 'icecream',
    name: 'Só sorvete',
    description: 'Um sabor de sorvete no pote',
    image: orderIceCreamImage,
  },
]

export function orderTypeNeedsIceCreamFlavor(orderTypeId: OrderTypeId | '') {
  return orderTypeId === 'acai-icecream' || orderTypeId === 'icecream'
}
