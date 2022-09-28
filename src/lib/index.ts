import { derived, get, writable, type Readable } from 'svelte/store'

export function debounce<T>(value: Readable<T>, delayMs = 300) {
  let timer: ReturnType<typeof setTimeout> | null = null
  return derived(
    value,
    ($value, set) => {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        set($value)
        timer = null
      }, delayMs)
    },
    get(value),
  )
}

export function debounceTimer(delayMs = 300) {
  let timer: ReturnType<typeof setTimeout> | null = null
  const _timeUp = writable(false)

  function up($timeUp: boolean) {
    if ($timeUp) {
      _timeUp.set(false)
      return true
    }
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      _timeUp.set(true)
      timer = null
    }, delayMs)
    return false
  }

  return derived(_timeUp, $timeUp => ({ up: () => up($timeUp) }))
}
