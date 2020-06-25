/* ArrayUnion.js [ 27.12.2019 : 17:32:05 ] */

import { ArraySlice, ArrayIncludes, ArrayPush, ArrayShift } from './Prototypes.js'
import { uniqSelfDefault } from './ArrayUniq.js'

/**
 * Очищает первый аргумент(массив) от дубликатов и добавляет уникальные элементы из всех заданных аргументов.
 *   Если передан только один аргумент, возвратится массив уникальных элементов.  
 *   Элементы добавляются в конец массива.
 * 
 * @memberof array
 * @param {...array} arrays Любое кол-во массивов.
 * @returns {array}         Первый аргумент.
 * @example
 * unionSelf([1, 1, 2, 3], [1, 2, 5, 5, 8])
 * // => [ 1, 2, 3, 5, 8 ]
 */
function unionSelf(...arrays) {
  let target = uniqSelfDefault(ArrayShift.call(arrays))
  let includes = ArrayIncludes.bind(target)
  let push = ArrayPush.bind(target)

  let next
  let item
  for (next of arrays) {
    for (item of next) {
      if (!includes(item)) { push(item) }
    }
  }

  return target
}

/**
 * Возвращает объединенный массив уникальных элементов из всех заданных аргументов.
 *   Если передан только один аргумент, возвратится массив уникальных элементов.
 * 
 *   Для изменения целевого массива, используйте `unionSelf(...)`.
 * 
 * @memberof array
 * @param {...array} arrays Любое кол-во массивов.
 * @returns {array}         Новый массив уникальных элементов.
 * @example
 * union([1, 1, 2, 3], [1, 2, 5, 5, 8])
 * // => [ 1, 2, 3, 5, 8 ]
 */
function union(...arrays) {
  let target = ArraySlice.call(ArrayShift.call(arrays))
  return unionSelf(target, ...arrays)
}

export {
  unionSelf,
  union
}
