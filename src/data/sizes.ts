import product300Image from '../assets/images/product-300.png'
import product500Image from '../assets/images/product-500.png'
import product700Image from '../assets/images/product-700.png'
import type { OrderTypeId, SizeOption } from '../types/order'

export const sizes: SizeOption[] = [
  {
    id: 'p',
    name: 'P',
    volume: 'P',
    description: 'Pote pequeno',
    price: 8,
    creamPrice: 9,
    image: product300Image,
  },
  {
    id: 'm',
    name: 'M',
    volume: 'M',
    description: 'Pote médio',
    price: 10,
    creamPrice: 11,
    image: product500Image,
  },
  {
    id: 'g',
    name: 'G',
    volume: 'G',
    description: 'Pote grande',
    price: 13,
    creamPrice: 14,
    image: product700Image,
  },
]

export function getSizePrice(size: SizeOption, orderTypeId: OrderTypeId | '') {
  if (!orderTypeId) {
    return 0
  }

  return orderTypeId === 'acai' ? size.price : size.creamPrice
}
