import { useEffect, useState } from 'react'
import type { IngredientAvailability } from '../types/availability'
import { emptyIngredientAvailability } from '../utils/ingredientAvailability'

export function useIngredientAvailability() {
  const [availability, setAvailability] = useState<IngredientAvailability>(
    emptyIngredientAvailability,
  )
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isCancelled = false
    let unsubscribe: (() => void) | undefined

    void import('../services/ingredientAvailabilityService').then(
      ({ listenIngredientAvailability }) => {
        if (isCancelled) {
          return
        }

        unsubscribe = listenIngredientAvailability(
          (currentAvailability) => {
            setAvailability(currentAvailability)
            setIsLoading(false)
            setError(null)
          },
          () => {
            setIsLoading(false)
            setError('Não foi possível carregar a disponibilidade dos ingredientes.')
          },
        )
      },
      () => {
        if (!isCancelled) {
          setIsLoading(false)
          setError('Não foi possível carregar a disponibilidade dos ingredientes.')
        }
      },
    )

    return () => {
      isCancelled = true
      unsubscribe?.()
    }
  }, [])

  return { availability, isLoading, error }
}
