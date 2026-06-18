import { useMemo, useState } from 'react'
import { fruits } from '../data/fruits'
import { iceCreamFlavors } from '../data/iceCreamFlavors'
import { orderTypeNeedsIceCreamFlavor, orderTypes } from '../data/orderTypes'
import { sizes } from '../data/sizes'
import { syrups } from '../data/syrups'
import { toppings } from '../data/toppings'
import type {
  CustomerData,
  OrderConfirmationData,
  OrderDraft,
  OrderTypeId,
  PaymentData,
  PaymentMethod,
} from '../types/order'
import { calculateOrderTotal } from '../utils/calculateOrderTotal'
import { validateOrder } from '../utils/validateOrder'

const initialOrder: OrderDraft = {
  sizeId: '',
  orderTypeId: '',
  iceCreamFlavorId: '',
  fruitIds: [],
  toppingIds: [],
  syrupId: 'sem-calda',
  observation: '',
  customer: {
    name: '',
    phone: '',
  },
  payment: {
    method: '',
    needsChange: false,
    changeFor: '',
  },
}

export function useOrderBuilder() {
  const [order, setOrder] = useState<OrderDraft>(initialOrder)
  const [confirmationData, setConfirmationData] = useState<OrderConfirmationData | null>(null)
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false)
  const [isFinalizing, setIsFinalizing] = useState(false)
  const [finalizeError, setFinalizeError] = useState<string | null>(null)

  const selectedSize = useMemo(() => sizes.find((size) => size.id === order.sizeId), [order.sizeId])
  const selectedOrderType = useMemo(
    () => orderTypes.find((orderType) => orderType.id === order.orderTypeId),
    [order.orderTypeId],
  )
  const shouldChooseIceCreamFlavor = orderTypeNeedsIceCreamFlavor(order.orderTypeId)
  const selectedIceCreamFlavor = useMemo(
    () => iceCreamFlavors.find((flavor) => flavor.id === order.iceCreamFlavorId),
    [order.iceCreamFlavorId],
  )
  const selectedFruits = useMemo(
    () => fruits.filter((fruit) => order.fruitIds.includes(fruit.id)),
    [order.fruitIds],
  )
  const selectedToppings = useMemo(
    () => toppings.filter((topping) => order.toppingIds.includes(topping.id)),
    [order.toppingIds],
  )
  const selectedSyrup = useMemo(
    () =>
      syrups.find((syrup) => syrup.id === order.syrupId) ??
      syrups.find((syrup) => syrup.id === 'sem-calda') ??
      syrups[0],
    [order.syrupId],
  )

  const total = useMemo(() => calculateOrderTotal(order), [order])
  const validation = useMemo(() => validateOrder(order), [order])

  const setSize = (sizeId: string) => {
    setOrder((current) => ({ ...current, sizeId }))
  }

  const setOrderType = (orderTypeId: OrderTypeId) => {
    setOrder((current) => ({
      ...current,
      orderTypeId,
      iceCreamFlavorId: orderTypeNeedsIceCreamFlavor(orderTypeId)
        ? current.iceCreamFlavorId
        : '',
    }))
  }

  const setIceCreamFlavor = (iceCreamFlavorId: string) => {
    setOrder((current) => ({ ...current, iceCreamFlavorId }))
  }

  const toggleFruit = (fruitId: string) => {
    setOrder((current) => {
      const alreadySelected = current.fruitIds.includes(fruitId)
      const fruitIds = alreadySelected
        ? current.fruitIds.filter((id) => id !== fruitId)
        : current.fruitIds.length < 4
          ? [...current.fruitIds, fruitId]
          : current.fruitIds

      return { ...current, fruitIds }
    })
  }

  const toggleTopping = (toppingId: string) => {
    setOrder((current) => {
      const alreadySelected = current.toppingIds.includes(toppingId)
      const toppingIds = alreadySelected
        ? current.toppingIds.filter((id) => id !== toppingId)
        : current.toppingIds.length < 6
          ? [...current.toppingIds, toppingId]
          : current.toppingIds

      return { ...current, toppingIds }
    })
  }

  const setSyrup = (syrupId: string) => {
    setOrder((current) => ({ ...current, syrupId }))
  }

  const setObservation = (observation: string) => {
    setOrder((current) => ({ ...current, observation }))
  }

  const updateCustomerData = (field: keyof CustomerData, value: string) => {
    setOrder((current) => ({
      ...current,
      customer: { ...current.customer, [field]: value },
    }))
  }

  const setPaymentMethod = (method: PaymentMethod) => {
    setOrder((current) => ({
      ...current,
      payment: {
        ...current.payment,
        method,
        needsChange: method === 'cash' ? current.payment.needsChange : false,
        changeFor: method === 'cash' ? current.payment.changeFor : '',
      },
    }))
  }

  const updatePaymentData = (field: keyof PaymentData, value: string | boolean) => {
    setOrder((current) => ({
      ...current,
      payment: { ...current.payment, [field]: value },
    }))
  }

  const closeConfirmationModal = () => {
    setIsConfirmationModalOpen(false)
  }

  const finalizeOrder = async () => {
    const currentValidation = validateOrder(order)

    if (!currentValidation.isValid) {
      return false
    }

    setIsFinalizing(true)
    setFinalizeError(null)

    try {
      const { createOrder } = await import('../services/orderService')
      const createdOrder = await createOrder(order)

      setConfirmationData(createdOrder)
      setIsConfirmationModalOpen(true)

      return true
    } catch (error) {
      console.error('[pedido] Falha ao finalizar pedido no Firestore:', error)
      setFinalizeError('Não foi possível finalizar o pedido agora. Tente novamente em instantes.')

      return false
    } finally {
      setIsFinalizing(false)
    }
  }

  const resetOrder = () => {
    setOrder(initialOrder)
    setConfirmationData(null)
    setIsConfirmationModalOpen(false)
    setFinalizeError(null)
  }

  return {
    order,
    selectedSize,
    selectedOrderType,
    selectedIceCreamFlavor,
    shouldChooseIceCreamFlavor,
    selectedFruits,
    selectedToppings,
    selectedSyrup,
    total,
    validation,
    confirmationData,
    isConfirmationModalOpen,
    isFinalizing,
    finalizeError,
    setSize,
    setOrderType,
    setIceCreamFlavor,
    toggleFruit,
    toggleTopping,
    setSyrup,
    setObservation,
    updateCustomerData,
    setPaymentMethod,
    updatePaymentData,
    finalizeOrder,
    closeConfirmationModal,
    resetOrder,
  }
}

export type OrderBuilder = ReturnType<typeof useOrderBuilder>
