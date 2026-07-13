import { fruits } from '../data/fruits'
import { getIceCreamFlavorsByIds } from '../data/iceCreamFlavors'
import { orderTypeNeedsIceCreamFlavor, orderTypes } from '../data/orderTypes'
import { paymentMethods } from '../data/paymentMethods'
import { sizes } from '../data/sizes'
import { syrups } from '../data/syrups'
import { toppings } from '../data/toppings'
import type { OrderDraft } from '../types/order'
import type { StoreConfig } from '../types/store'
import { calculateOrderTotal } from './calculateOrderTotal'
import { formatCurrency } from './formatCurrency'

function toBulletList(items: string[]) {
  if (items.length === 0) {
    return '* Nenhum'
  }

  return items.map((item) => `* ${item}`).join('\n')
}

export function buildWhatsAppMessage(order: OrderDraft, store: StoreConfig) {
  const selectedSize = sizes.find((size) => size.id === order.sizeId)
  const selectedOrderType = orderTypes.find((orderType) => orderType.id === order.orderTypeId)
  const selectedIceCreamFlavors = getIceCreamFlavorsByIds(order.iceCreamFlavorIds)
  const selectedFruits = fruits.filter((fruit) => order.fruitIds.includes(fruit.id))
  const selectedToppings = toppings.filter((topping) => order.toppingIds.includes(topping.id))
  const selectedSyrup = syrups.find((syrup) => syrup.id === order.syrupId)
  const selectedPayment = paymentMethods.find((payment) => payment.id === order.payment.method)
  const total = calculateOrderTotal(order)
  const changeText =
    order.payment.method === 'cash' && order.payment.needsChange
      ? `Troco para: ${order.payment.changeFor || 'informar'}`
      : ''

  return [
    `Olá! Gostaria de fazer um pedido na ${store.shortName}.`,
    '',
    'DADOS DO CLIENTE',
    `Nome: ${order.customer.name.trim()}`,
    `Telefone: ${order.customer.phone.trim()}`,
    '',
    'PEDIDO',
    `Tamanho: ${selectedSize?.name ?? 'Não informado'}`,
    `Tipo do pedido: ${selectedOrderType?.name ?? 'Não informado'}`,
    orderTypeNeedsIceCreamFlavor(order.orderTypeId)
      ? `${selectedIceCreamFlavors.length > 1 ? 'Sabores' : 'Sabor'} do creme: ${selectedIceCreamFlavors.map((flavor) => flavor.name).join(', ') || 'Não informado'}`
      : '',
    '',
    'Frutas:',
    toBulletList(selectedFruits.map((fruit) => fruit.name)),
    '',
    'Adicionais:',
    toBulletList(selectedToppings.map((topping) => topping.name)),
    '',
    'Calda:',
    toBulletList([selectedSyrup?.name ?? 'Sem calda']),
    '',
    'Observação:',
    order.observation.trim() || 'Sem observação.',
    '',
    'PAGAMENTO',
    `Forma: ${selectedPayment?.name ?? 'Não informado'}`,
    order.payment.method === 'cash' ? `Precisa de troco: ${order.payment.needsChange ? 'Sim' : 'Não'}` : '',
    changeText,
    '',
    'TOTAL ESTIMADO',
    formatCurrency(total),
  ]
    .filter(Boolean)
    .join('\n')
}
