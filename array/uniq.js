/* uniq.js [ 26.12.2019 : 20:30:35 ] */

import { ArraySlice } from '../core/Prototypes.js'
import { uniqSelfDefault, uniqSelfReverse } from '../core/ArrayUniq.js'

/**
 * Возвращает новый массив уникальных элементов.   
 *   Для изменения целевого массива, используйте `uniqSelf(...)`.  
 * 
 * @memberof array
 * @param {array}             array Целевой массив.
 * @param {boolean} [reverse=false] Удаление элементов начинается с конца массива `[1,2,1] => [1,2]`.   
 *                                    При `true`, элементы удаляются с начала.
 * @returns {array}                 Массив уникальных элементов.
 * @example
 * uniq([1,2,1])
 * // => [1,2]
 * uniq([1,2,1], true)
 * // => [2,1]
 */
function uniq(array, reverse) {
  let a = ArraySlice.call(array)
  return reverse ? uniqSelfReverse(a) : uniqSelfDefault(a)
}

export default uniq
