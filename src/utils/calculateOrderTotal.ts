import { getSizePrice, sizes } from '../data/sizes'
import type { OrderDraft } from '../types/order'

export function calculateOrderTotal(order: OrderDraft) {
  const selectedSize = sizes.find((size) => size.id === order.sizeId)

  return selectedSize ? getSizePrice(selectedSize, order.orderTypeId) : 0
}
