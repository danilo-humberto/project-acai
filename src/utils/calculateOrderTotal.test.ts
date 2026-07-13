import { describe, expect, it } from 'vitest'
import type { OrderDraft, OrderTypeId } from '../types/order'
import { calculateOrderTotal } from './calculateOrderTotal'

const baseOrder: OrderDraft = {
  sizeId: '',
  orderTypeId: '',
  iceCreamFlavorIds: [],
  fruitSelections: [],
  toppingSelections: [],
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

describe('calculateOrderTotal', () => {
  it.each([
    ['p', 8],
    ['m', 10],
    ['g', 12],
    ['barca-p', 20],
    ['barca-m', 30],
  ])('retorna o preço fixo do tamanho %s', (sizeId, expectedTotal) => {
    expect(calculateOrderTotal({ ...baseOrder, sizeId })).toBe(expectedTotal)
  })

  it.each<OrderTypeId>(['acai', 'acai-icecream', 'icecream'])(
    'mantém o preço ao trocar o tipo para %s',
    (orderTypeId) => {
      expect(calculateOrderTotal({ ...baseOrder, sizeId: 'g', orderTypeId })).toBe(12)
    },
  )

  it('retorna zero enquanto nenhum tamanho foi escolhido', () => {
    expect(calculateOrderTotal(baseOrder)).toBe(0)
  })

  it('cobra somente as porções adicionais de frutas e guloseimas', () => {
    expect(
      calculateOrderTotal({
        ...baseOrder,
        sizeId: 'm',
        fruitSelections: [
          { id: 'banana', quantity: 1 },
          { id: 'morango', quantity: 3 },
        ],
        toppingSelections: [{ id: 'pacoca', quantity: 2 }],
      }),
    ).toBe(11.5)
  })

  it('permite quantidades altas sem aplicar limite de porções', () => {
    expect(
      calculateOrderTotal({
        ...baseOrder,
        sizeId: 'p',
        fruitSelections: [{ id: 'banana', quantity: 21 }],
      }),
    ).toBe(18)
  })
})
