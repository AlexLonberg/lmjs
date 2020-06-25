/* startsWith.js [ 07.04.2020 : 00:06:58 ] */

import { isInt, sameValueZero } from '../core/LibIs.js'
import { indexOffsetCalculate } from '../core/Array.js'

function startsWithDefault(array, searchArray, i) {
  if (array.length === i || ((array.length - i) < searchArray.length)) {
    return false
  }
  let ias = 0
  for (; ias < searchArray.length; ++i, ++ias) {
    if (!sameValueZero(array[i], searchArray[ias])) {
      return false
    }
  }
  return true
}

function startsWithRevers(array, searchArray, i) {
  let ias = searchArray.length - 1
  if (i === -1 || i < ias) {
    return false
  }
  for (; ias >= 0; --i, --ias) {
    if (!sameValueZero(array[i], searchArray[ias])) {
      return false
    }
  }
  return true
}

/**
 * Аналог `String.prototype.startsWith()` для массивов.
 * 
 * @memberof array
 * @param {*[]}                array Базовый массив.
 * @param {*[]}          searchArray Массив для сравнения.
 * @param {number}       [fromIndex] Опционально. Индекс `array` с которого начинается проверка.
 * @param {boolean}  [reverse=false] Опционально. По умолчанию обход элементов начинается с начала массива.
 *                                     При `true` поиск вхождения будет с конца.
 * @returns {boolean} Истина если начальные элементы массива `searchArray`, равны начальным элементм `array`.
 * @example
 * const obj = {}
 * const arrBase =    [1, 'str', NaN, true, obj]
 * const srchArray1 = [1, 'str', NaN]
 * const srchArray2 =           [NaN, true, obj]
 * const srchArray3 =    ['str', NaN, true]
 * 
 * startsWith(arrBase, srchArray1)                  // true
 * startsWith(arrBase, srchArray2, undefined, true) // true
 * startsWith(arrBase, srchArray3,  1)              // true
 * startsWith(arrBase, srchArray3, -4)              // true
 * startsWith(arrBase, srchArray3, -2,        true) // true
 */
function startsWith(array, searchArray, fromIndex, reverse = false) {
  fromIndex = isInt(fromIndex)
    ? indexOffsetCalculate(array.length, fromIndex, reverse)
    : (reverse ? array.length - 1 : 0)
  return reverse
    ? startsWithRevers(array, searchArray, fromIndex)
    : startsWithDefault(array, searchArray, fromIndex)
}

export default startsWith
