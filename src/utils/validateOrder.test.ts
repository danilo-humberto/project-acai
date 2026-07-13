import { describe, expect, it } from 'vitest'
import type { OrderDraft } from '../types/order'
import { validateOrder } from './validateOrder'

const validOrder: OrderDraft = {
  sizeId: 'm',
  orderTypeId: 'icecream',
  iceCreamFlavorIds: ['morango'],
  fruitSelections: [],
  toppingSelections: [],
  syrupId: 'sem-calda',
  observation: '',
  customer: {
    name: 'Cliente',
    phone: '(99) 99999-9999',
  },
  payment: {
    method: 'pix',
    needsChange: false,
    changeFor: '',
  },
}

describe('validateOrder cream flavors', () => {
  it('aceita dois sabores quando o pedido é só creme', () => {
    const validation = validateOrder({
      ...validOrder,
      iceCreamFlavorIds: ['morango', 'chocomenta'],
    })

    expect(validation.isValid).toBe(true)
  })

  it('rejeita mais de dois sabores quando o pedido é só creme', () => {
    const validation = validateOrder({
      ...validOrder,
      iceCreamFlavorIds: ['morango', 'chocomenta', 'pacoca'],
    })

    expect(validation.fieldErrors.iceCreamFlavorIds).toBe(
      'Escolha no máximo dois sabores de creme.',
    )
  })

  it('mantém o limite de um sabor para açaí com creme', () => {
    const validation = validateOrder({
      ...validOrder,
      orderTypeId: 'acai-icecream',
      iceCreamFlavorIds: ['morango', 'chocomenta'],
    })

    expect(validation.fieldErrors.iceCreamFlavorIds).toBe(
      'Escolha apenas um sabor para o açaí com creme.',
    )
  })

  it('exige pelo menos um sabor nos pedidos com creme', () => {
    const validation = validateOrder({
      ...validOrder,
      iceCreamFlavorIds: [],
    })

    expect(validation.fieldErrors.iceCreamFlavorIds).toBe(
      'Escolha pelo menos um sabor de creme.',
    )
  })
})
