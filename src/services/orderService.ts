import { collection, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore'
import { fruits } from '../data/fruits'
import { iceCreamFlavors } from '../data/iceCreamFlavors'
import { orderTypes } from '../data/orderTypes'
import { paymentMethods } from '../data/paymentMethods'
import { sizes } from '../data/sizes'
import { syrups } from '../data/syrups'
import { toppings } from '../data/toppings'
import { db } from '../lib/firebase'
import type { Order, OrderConfirmationData, OrderDraft, OrderStatus } from '../types/order'
import { calculateOrderTotal } from '../utils/calculateOrderTotal'
import { parseBRLCurrencyInput } from '../utils/formatCurrency'
import { generatePublicCode, generateTrackingCode } from '../utils/orderCode'

const ORDERS_COLLECTION = 'orders'

function removeUndefinedFields<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map(removeUndefinedFields) as T
  }

  if (value && typeof value === 'object' && Object.getPrototypeOf(value) === Object.prototype) {
    return Object.entries(value).reduce<Record<string, unknown>>((cleanObject, [key, itemValue]) => {
      if (itemValue !== undefined) {
        cleanObject[key] = removeUndefinedFields(itemValue)
      }

      return cleanObject
    }, {}) as T
  }

  return value
}

function buildOrderDocument(orderDraft: OrderDraft, publicCode: string, trackingCode: string): Order {
  const selectedOrderType = orderTypes.find((orderType) => orderType.id === orderDraft.orderTypeId)
  const selectedSize = sizes.find((size) => size.id === orderDraft.sizeId)
  const selectedIceCreamFlavor = iceCreamFlavors.find((flavor) => flavor.id === orderDraft.iceCreamFlavorId)
  const selectedFruits = fruits.filter((fruit) => orderDraft.fruitIds.includes(fruit.id))
  const selectedToppings = toppings.filter((topping) => orderDraft.toppingIds.includes(topping.id))
  const selectedSyrup = syrups.find((syrup) => syrup.id === orderDraft.syrupId)
  const selectedPayment = paymentMethods.find((payment) => payment.id === orderDraft.payment.method)

  return {
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
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  }
}

export async function createOrder(orderDraft: OrderDraft): Promise<OrderConfirmationData> {
  const publicCode = generatePublicCode()
  const trackingCode = generateTrackingCode(publicCode)
  const trackingUrl = `/pedido/${trackingCode}`
  const order = removeUndefinedFields(buildOrderDocument(orderDraft, publicCode, trackingCode))

  try {
    await setDoc(doc(db, ORDERS_COLLECTION, trackingCode), order)
  } catch (error) {
    console.error('[orderService] Erro ao salvar pedido no Firestore:', error)
    throw error
  }

  return {
    publicCode,
    trackingCode,
    trackingUrl,
  }
}

export function listenOrderByTrackingCode(
  trackingCode: string,
  callback: (order: Order | null) => void,
  onError?: (error: Error) => void,
) {
  const orderRef = doc(db, ORDERS_COLLECTION, trackingCode)

  return onSnapshot(
    orderRef,
    (snapshot) => {
      if (!snapshot.exists()) {
        callback(null)
        return
      }

      callback({
        id: snapshot.id,
        ...snapshot.data(),
      } as Order)
    },
    (error) => {
      console.error('[orderService] Erro ao acompanhar pedido no Firestore:', error)
      onError?.(error)
    },
  )
}

export function listenOrders(callback: (orders: Order[]) => void, onError?: (error: Error) => void) {
  const ordersQuery = query(collection(db, ORDERS_COLLECTION), orderBy('createdAt', 'desc'))

  return onSnapshot(
    ordersQuery,
    (snapshot) => {
      const orders = snapshot.docs.map((orderDoc) => ({
        id: orderDoc.id,
        ...orderDoc.data(),
      })) as Order[]

      callback(orders)
    },
    (error) => {
      console.error('[orderService] Erro ao listar pedidos no Firestore:', error)
      onError?.(error)
    },
  )
}

export async function updateOrderStatus(trackingCode: string, status: OrderStatus) {
  try {
    await updateDoc(doc(db, ORDERS_COLLECTION, trackingCode), {
      status,
      updatedAt: serverTimestamp(),
    })
  } catch (error) {
    console.error('[orderService] Erro ao atualizar status do pedido:', error)
    throw error
  }
}
