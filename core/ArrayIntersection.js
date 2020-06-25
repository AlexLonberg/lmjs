/* ArrayIntersection.js [ 04.02.2020 : 04:44:57 ] */

import { ArraySlice, ArraySplice, ArrayShift } from './Prototypes.js'
import { uniqSelfDefault } from './ArrayUniq.js'
import { countDuplicates } from './ArrayCountDuplicates.js'

/**
 * Возвращает массив уникальных элементов, которые включены во всех аргументах.  
 * 
 *   Если необходимо изменить целевой массив, используйте `intersectionSelf(...)`.
 * 
 * @memberof array
 * @param {...array} arrays Любое кол-во массивов.
 * @returns {array}         Новый массив уникальных элементов.
 * @example
 * intersection([1, 5, 2, 2, 3], [1, 4, 5, 2], [1, 3, 4, 2])
 * // => [1, 2]
 */
function intersection(...arrays) {
  let length = arrays.length
  let target = []
  let next
  for (next of arrays) {
    target.push(...uniqSelfDefault(ArraySlice.call(next)))
  }
  return countDuplicates(target).filter(({ count }) => count === length).map(({ value }) => value)
}

/**
 * Оставляет в первом массиве уникальные элементы, которые включены во всех аргументах.  
 *   Элементы удаляются с конца массива.
 * 
 * @memberof array
 * @param {...array} arrays Любое кол-во массивов.
 * @returns {array}         Первый аргумент.
 * @example
 * intersectionSelf([1, 5, 2, 2, 3], [1, 4, 5, 2], [1, 3, 4, 2])
 * // => [1, 2]
 */
function intersectionSelf(...arrays) {
  let uis = intersection(...arrays)
  let target = ArrayShift.call(arrays)
  let splice = ArraySplice.bind(target)

  let i = target.length
  while (i--) {
    if (!uis.includes(target[i])) {
      splice(i, 1)
    }
  }

  return uniqSelfDefault(target)
}

export {
  intersection,
  intersectionSelf
}
