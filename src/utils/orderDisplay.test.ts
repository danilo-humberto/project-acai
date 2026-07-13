import { describe, expect, it } from 'vitest'
import { getOrderIceCreamFlavors } from './orderDisplay'

describe('getOrderIceCreamFlavors', () => {
  it('retorna os sabores plurais dos pedidos novos', () => {
    expect(
      getOrderIceCreamFlavors({
        iceCreamFlavors: ['Morango', 'Chocomenta'],
        iceCreamFlavor: 'Morango',
      }),
    ).toEqual(['Morango', 'Chocomenta'])
  })

  it('mantém compatibilidade com o sabor singular dos pedidos antigos', () => {
    expect(getOrderIceCreamFlavors({ iceCreamFlavor: 'Morango' })).toEqual(['Morango'])
  })
})
