/* ArrayDiff.js [ 03.02.2020 : 07:12:49 ] */

import { ArraySlice, ArraySplice, ArrayShift } from './Prototypes.js'
import { indexOf } from './Array.js'

/**
 * Сравнивает array_1 с несколькими другими массивами и удаляет значения из array_1,
 *   которые присутствуют во всех других массивах.   
 * 
 *   Альтернатива `diff(...)`, за исключениенм того, что изменяет первый массив аргументов.  
 * 
 * @memberof array
 * @param {...array} arrays Любое кол-во массивов.
 * @returns {array}         Первый аргумент.
 * @example
 * diffSelf([1, 1, 2, 3, 4, 50, NaN], [2, NaN], [50])
 * // => [1,1,3,4]
 */
function diffSelf(...arrays) {
  let target = ArrayShift.call(arrays)
  if (!target.length || !arrays.length) { return target }

  let splice = ArraySplice.bind(target)

  let next
  let item
  let i

  for (next of arrays) {
    for (item of next) {
      i = 0
      // элемент item может повторяться в target, поэтому проходимя до конца, пока не возвратит -1
      while ((i = indexOf(target, item, i)) !== -1) {
        splice(i, 1)
        // если все закончилось
        if (!target.length) { return target }
      }
    }
  }

  return target
}

/**
 * Сравнивает array_1 с несколькими другими массивами и возвращает значения из array_1,
 *   которые отсутствуют во всех других массивах.   
 *   Если только один аргумент, возвратиться его копия.   
 *   Для изменения первого массива аргументов, см. `diffSelf(...)`.
 * 
 * @memberof array
 * @param {...array} arrays Любое кол-во массивов.
 * @returns {array}         Новый массив.
 * @example
 * // 
 * diff([1, 1, 2, 3, 4, 50, NaN], [2, NaN], [50])
 * // => [1,1,3,4]
 */
function diff(...arrays) {
  let target = ArraySlice.call(ArrayShift.call(arrays))
  return diffSelf(target, ...arrays)
}

export {
  diffSelf,
  diff
}
