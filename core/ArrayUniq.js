/* ArrayUniq.js [ 29.12.2019 : 15:34:12 ] */

import { ArraySplice, ArrayIncludes } from './Prototypes.js'
import { sameValueZero } from './LibIs.js'

/**
 * Удаление неуникальных элементов массива. Изменяет исходный массив.  
 *   Элементы удаляются с конца массива.
 * 
 * @private
 * @memberof array
 * @param {array} array Целевой массив.
 * @returns {array}     Целевой массив.
 * @example
 * uniqSelfDefault([1,2,1])
 * // => [1,2]
 */
function uniqSelfDefault(array) {
  let a
  let fi = (v) => {
    // TODO Это всегда возвратит индекс, т.к. врежется в элемент
    for (a = 0; a < array.length; ++a) {
      if (sameValueZero(v, array[a])) { return a }
    }
  }
  let splice = ArraySplice.bind(array)
  // i > 1 см ниже --i + первый элемент(0) сверять уже не с чем
  let i = array.length
  while (i > 1) {
    // при поиске с начала массива, i будет равным fi(arr[i]), 
    //   только в случае совпадения с текущим элементом
    if (--i !== fi(array[i])) {
      splice(i, 1)
    }
  }

  return array
}

/**
 * Удаление неуникальных элементов массива. Изменяет исходный массив.  
 *   Элементы удаляются с начала массива.
 * 
 * @private
 * @memberof array
 * @param {array} array Целевой массив.
 * @returns {array}     Целевой массив.
 * @example
 * uniqSelfReverse([1,2,1])
 * // => [2,1]
 */
function uniqSelfReverse(array) {
  let includes = ArrayIncludes.bind(array)
  let splice = ArraySplice.bind(array)
  let i = 0
  let l = array.length - 1 // последний элемент уже не с чем сравнивать
  while (i < l) {
    // поиск всегда со следующего элемента
    if (includes(array[i], ++i)) {
      splice(--i, 1)
    }
  }
  return array
}

export {
  uniqSelfDefault,
  uniqSelfReverse
}
