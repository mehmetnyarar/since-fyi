import { useEffect, useRef } from 'react'

/**
 * Callback function.
 */
export type UseIntervalCallback = (...args: never[]) => void

/**
 * Interval hook.
 * @param callback Function to run.
 * @param delay Delay between each calls.
 * @see https://overreacted.io/making-setinterval-declarative-with-react-hooks/
 */
export const useInterval = (callback: UseIntervalCallback, delay?: number) => {
  const savedCallback = useRef<UseIntervalCallback>()

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    function tick () {
      savedCallback.current && savedCallback.current()
    }

    if (delay) {
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}
