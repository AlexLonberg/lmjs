/* uniqSelf.js [ 04.02.2020 : 04:18:55 ] */

import { uniqSelfDefault, uniqSelfReverse } from '../core/ArrayUniq.js'

/**
 * Удаление неуникальных элементов массива. Изменяет исходный массив.
 * 
 * @memberof array
 * @param {array}             array Целевой массив.
 * @param {boolean} [reverse=false] Удаление элементов начинается с конца массива `[1,2,1] => [1,2]`.   
 *                                    При `true`, элементы удаляются с начала.
 * @returns {array}                 Целевой массив.
 * @example
 * uniqSelf([1,2,1])
 * // => [1,2]
 * uniqSelf([1,2,1], true)
 * // => [2,1]
 */
function uniqSelf(array, reverse) {
  return reverse ? uniqSelfReverse(array) : uniqSelfDefault(array)
}

export default uniqSelf
