import { useCallback, useRef } from 'react'

export const useDebounce = (delay = 800) => {
  const debouncing = useRef<number | undefined>()

  const debounce = useCallback(
    (func: () => void) => {
      if (debouncing.current) {
        clearTimeout(debouncing.current)
      }

      debouncing.current = setTimeout(() => func(), delay)
    },
    [delay],
  )

  return { debounce }
}
