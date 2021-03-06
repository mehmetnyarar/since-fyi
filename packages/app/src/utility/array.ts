/**
 * Updates an array by replacing an item at the specific index.
 * @param array Array.
 * @param index Location.
 * @param value Update.
 * @returns Array.
 */
function replace<T> (array: T[], index: number, value: T) {
  return [
    ...array.slice(0, index),
    value,
    ...array.slice(index + 1, array.length)
  ]
}

/**
 * Removes an item from the array at the specific index.
 * @param array Array.
 * @param index Location.
 * @param value Update.
 * @returns Array.
 */
function remove<T> (array: T[], index: number) {
  return [...array.slice(0, index), ...array.slice(index + 1, array.length)]
}

/**
 * Array utilities.
 */
export const ArrayUtils = {
  replace,
  remove
}
