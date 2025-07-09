import React, { useEffect } from "react"

export interface MultiselectOption {
  value: string
  label: string
  icon?: React.ComponentType<{ className?: string }>
  disable?: boolean
  fixed?: boolean
  [key: string]: string | React.ComponentType<{ className?: string }> | boolean | undefined
}

export interface MultipleSelectorRef {
  selectedValue: MultiselectOption[]
  input: HTMLInputElement
  focus: () => void
  reset: () => void
}

export function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}