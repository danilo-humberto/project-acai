import { orderTypeNeedsIceCreamFlavor } from '../data/orderTypes'
import type { OrderDraft, OrderValidation, OrderValidationField } from '../types/order'
import { getPhoneDigits, isCompletePhoneNumber } from './phone'

function addError(
  validation: OrderValidation,
  field: OrderValidationField,
  message: string,
) {
  validation.errors.push(message)
  validation.fieldErrors[field] = message
}

export function validateOrder(order: OrderDraft): OrderValidation {
  const validation: OrderValidation = {
    isValid: true,
    errors: [],
    fieldErrors: {},
  }

  if (!order.sizeId) {
    addError(validation, 'sizeId', 'Escolha o tamanho.')
  }

  if (!order.orderTypeId) {
    addError(validation, 'orderTypeId', 'Escolha se o pedido será açaí, açaí com creme ou creme.')
  }

  if (
    order.orderTypeId &&
    orderTypeNeedsIceCreamFlavor(order.orderTypeId) &&
    !order.iceCreamFlavorId
  ) {
    addError(validation, 'iceCreamFlavorId', 'Escolha o sabor do creme.')
  }

  if (!order.customer.name.trim()) {
    addError(validation, 'customer.name', 'Informe o nome do cliente.')
  }

  if (!getPhoneDigits(order.customer.phone)) {
    addError(validation, 'customer.phone', 'Informe o telefone do cliente.')
  } else if (!isCompletePhoneNumber(order.customer.phone)) {
    addError(validation, 'customer.phone', 'Informe um telefone com DDD.')
  }

  if (!order.payment.method) {
    addError(validation, 'payment.method', 'Escolha a forma de pagamento.')
  }

  if (order.payment.method === 'cash' && order.payment.needsChange && !order.payment.changeFor.trim()) {
    addError(validation, 'payment.changeFor', 'Informe para quanto precisa de troco.')
  }

  validation.isValid = validation.errors.length === 0

  return validation
}
