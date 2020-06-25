/* xor.js [ 04.02.2020 : 03:23:20 ] */

import { ArraySlice } from '../core/Prototypes.js'
import { uniqSelfDefault } from '../core/ArrayUniq.js'
import countDuplicates from './countDuplicates.js'

/**
 * Возвращает массив уникальных элементов, которые не повторяются ни в одном из аргументов.
 * 
 * @memberof array
 * @param {...array} arrays Любое кол-во массивов.
 * @returns {array}         Новый массив уникальных элементов.
 * @example
 * xor([1, 2, 2], [4, 5], [1, 3, 4])
 * // => [ 2, 5, 3 ]
 */
function xor(...arrays) {
  let target = []
  let next
  for (next of arrays) {
    target.push(...uniqSelfDefault(ArraySlice.call(next)))
  }
  return countDuplicates(target).filter(({ count }) => count === 1).map(({ value }) => value)
}

export default xor
