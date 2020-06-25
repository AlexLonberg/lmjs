/* ArrayIsEqual.js [ 04.02.2020 : 02:27:56 ] */

import { ArrayForEach } from './Prototypes.js'
import { isUndefined, sameValueZero } from './LibIs.js'
import { indexOf } from './Array.js'

/**
 * Сравнивает кол-во и значения элементов двух массивов, используя точное расположение элементов.
 * 
 * @private
 * @memberof array
 * @param {array} array1 Первый массив.
 * @param {array} array2 Второй.
 * @returns {boolean} 
 */
function isEqualByIndex(array1, array2) {
  let i = array1.length
  while (i--) {
    if (!sameValueZero(array1[i], array2[i])) { return false }
  }
  return true
}

/**
 * Сравнивает кол-во и значения элементов двух массивов, используя беспорядочное расположение элементов.
 * 
 * @private
 * @memberof array
 * @param {array} array1 Первый массив.
 * @param {array} array2 Второй.
 * @returns {boolean} 
 */
function isEqualChaotic(array1, array2) {
  let values = []
  let counted = [[], []]
  let fe = ArrayForEach.bind([array1, array2])
  let iv
  let i = 0
  for (; i < array1.length; ++i) {
    fe((a, ia) => {
      if ((iv = indexOf(values, a[i])) === -1) {
        counted[ia][values.push(a[i]) - 1] = 1
      } else if (isUndefined(counted[ia][iv])) {
        counted[ia][iv] = 1
      } else {
        ++counted[ia][iv]
      }
    })
  }
  return isEqualByIndex(...counted)
}

/**
 * Сравнивает кол-во и значения элементов двух массивов. Расположение элементов значения не имеет.
 * 
 * @memberof array
 * @param {array}            array1 Первый массив.
 * @param {array}            array2 Второй массив.
 * @param {boolean} [byIndex=false] Учитывать точное расположение элементов.
 * @returns {boolean} 
 * @example
 * isEqual([NaN,1,5,1], [NaN,1,1,5])
 * // => true
 * isEqual([NaN,1,5,1], [NaN,1,1,5], true)
 * // => false
 */
function isEqual(array1, array2, byIndex = false) {
  return (array1.length !== array2.length)
    ? false
    : (
      (array1 === array2)
        ? true
        : (byIndex ? isEqualByIndex(array1, array2) : isEqualChaotic(array1, array2))
    )
}

export {
  isEqualChaotic,
  isEqual
}
