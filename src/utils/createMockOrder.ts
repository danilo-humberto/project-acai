import { fruits } from '../data/fruits'
import { iceCreamFlavors } from '../data/iceCreamFlavors'
import { orderTypes } from '../data/orderTypes'
import { paymentMethods } from '../data/paymentMethods'
import { sizes } from '../data/sizes'
import { syrups } from '../data/syrups'
import { toppings } from '../data/toppings'
import type { Order, OrderConfirmationData, OrderDraft } from '../types/order'
import { calculateOrderTotal } from './calculateOrderTotal'
import { parseBRLCurrencyInput } from './formatCurrency'

export type MockOrderResult = OrderConfirmationData & {
  order: Order
}

function createPublicCode() {
  const code = Math.floor(1000 + Math.random() * 9000)

  return `AC-${code}`
}

function createTrackingSuffix() {
  return Math.random().toString(36).slice(2, 7)
}

export function createMockOrder(orderDraft: OrderDraft): MockOrderResult {
  const publicCode = createPublicCode()
  const trackingCode = `${publicCode}-${createTrackingSuffix()}`
  const trackingUrl = `/pedido/${trackingCode}`
  const selectedOrderType = orderTypes.find((orderType) => orderType.id === orderDraft.orderTypeId)
  const selectedSize = sizes.find((size) => size.id === orderDraft.sizeId)
  const selectedIceCreamFlavor = iceCreamFlavors.find((flavor) => flavor.id === orderDraft.iceCreamFlavorId)
  const selectedFruits = fruits.filter((fruit) => orderDraft.fruitIds.includes(fruit.id))
  const selectedToppings = toppings.filter((topping) => orderDraft.toppingIds.includes(topping.id))
  const selectedSyrup = syrups.find((syrup) => syrup.id === orderDraft.syrupId)
  const selectedPayment = paymentMethods.find((payment) => payment.id === orderDraft.payment.method)
  const now = new Date().toISOString()

  return {
    publicCode,
    trackingCode,
    trackingUrl,
    order: {
      id: trackingCode,
      publicCode,
      trackingCode,
      status: 'received',
      customer: {
        name: orderDraft.customer.name.trim(),
        phone: orderDraft.customer.phone.trim(),
      },
      items: {
        productName: selectedOrderType?.name,
        size: selectedSize?.name,
        iceCreamFlavor: selectedIceCreamFlavor?.name,
        fruits: selectedFruits.map((fruit) => fruit.name),
        toppings: selectedToppings.map((topping) => topping.name),
        syrup: selectedSyrup?.name,
        observation: orderDraft.observation.trim() || undefined,
      },
      payment: {
        method: selectedPayment?.id,
        needsChange: orderDraft.payment.method === 'cash' ? orderDraft.payment.needsChange : false,
        changeFor:
          orderDraft.payment.method === 'cash' && orderDraft.payment.needsChange
            ? parseBRLCurrencyInput(orderDraft.payment.changeFor)
            : undefined,
      },
      total: calculateOrderTotal(orderDraft),
      createdAt: now,
      updatedAt: now,
    },
  }
}
