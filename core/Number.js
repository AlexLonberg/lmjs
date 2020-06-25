/* Number.js [ 29.01.2020 : 07:01:48 ] */

import { minMaxInteger } from './Constants.js'
import { isInt } from './LibIs.js'

/**
 * Возвращает допустимый диапазон Integer
 * 
 * @private
 * @memberof core
 * @param {number} l
 * @param {number} u
 * @returns {[number,number]} 
 */
function minMax(l, u) {
  if (!isInt(l)) { l = minMaxInteger.min }
  if (!isInt(u) || u < l) { u = minMaxInteger.max }
  return [l, u]
}

/**
 * Возвращает случайное число `Integer`.
 * 
 * @memberof number
 * @param {number} [min=Number.MIN_SAFE_INTEGER] По умолчанию `Number.MIN_SAFE_INTEGER`.
 * @param {number} [max=Number.MAX_SAFE_INTEGER] По умолчанию `Number.MAX_SAFE_INTEGER`.
 * @returns {number} 
 * @example
 * randomInt(1, 3)
 * // => 1
 */
function randomInt(l, u) {
  [l, u] = minMax(l, u)
  return Math.floor(Math.random() * (++u - l)) + l
}

export {
  randomInt
}
