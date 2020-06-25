/* Array.js [ 31.01.2020 : 11:55:29 ] */

import { isInt, sameValueZero } from './LibIs.js'

/**
 * Расчитать смещение индекса. Для операций с массивами, где передается аргумент индекса.
 *   Например поиск элемента начиная с заданной позиции.
 * 
 * @private
 * @memberof array
 * @param {number} arrayLength Длина массива.
 * @param {number}   fromIndex Отрицательно значение приведет к смещению с конца массива.
 * @param {boolean}    reverse Для циклов от конца массива.
 * @returns {number}           Диапазон от:
 *                               * если !reverse => 0 -> arrayLength
 *                               * если reverse => -1 -> arrayLength-1
 * @description 
 * Значение `>= arrayLength || -1`, должно учитываться во всех методах. 
 *   Отсутствие проверки или цикл за пределами диапазона, может вызвать ошибки при обращении к несуществующему элементу.
 */
function indexOffsetCalculate(arrayLength, fromIndex, reverse) {
  if (fromIndex >= arrayLength) {
    // TODO возвращаем длину массива, для случаев, когда необходимо прекратить поиск
    //   иначе цикл может оказаться бесконечным
    return reverse ? --arrayLength : arrayLength
  } else if (fromIndex < 0) {
    fromIndex += arrayLength
    if (fromIndex < 0) {
      return reverse ? -1 : 0 // ...как и выше
    }
  }
  return fromIndex
}

/**
 * Поиск индекса элемента используя `sameValueZero`.
 * 
 * @memberof array
 * @param {array}          array Массив для поиска элемента.
 * @param {any}               se Любое значение, включая `NaN`.
 * @param {number} [fromIndex=0] По умолчанию `0`. Индекс с которого начинается поиск.
 *                                 Отрицательно значение приведет к смещению с конца массива.
 * @returns {boolean}            Индекс элемента или `-1`.
 * @example
 * indexOf([NaN], NaN)
 * // => 0
 * // смещение -2, приведет к поиску начиная с элемента array[1]
 * indexOf([1,1,2], 1, -2)
 * // => 1
 */
function indexOf(array, se, fromIndex) {
  let al = array.length
  let i = fromIndex ? indexOffsetCalculate(al, fromIndex) : 0
  for (; i < al; ++i) {
    if (sameValueZero(array[i], se)) { return i }
  }
  return -1
}

/**
 * Поиск индекса элемента начиная с конца массива используя `sameValueZero`.
 * 
 * @memberof array
 * @param {array}             array Массив для поиска элемента.
 * @param {any}                  se Любое значение, включая `NaN`.
 * @param {number} [fromIndex=Array.length] По умолчанию `array.length`. Индекс с которого начинается поиск в обратном направлении.
 *                                    Отрицательно значение приведет к смещению с конца массива.
 * @returns {boolean}               Индекс элемента или `-1`.
 * @example
 * lastIndexOf([NaN, 1, NaN], NaN)
 * // => 2
 * // смещение -2, последний элемент будет пропущен
 * lastIndexOf([2, 1, 1, 2], 2, -2)
 * // => 0
 */
function lastIndexOf(array, se, fromIndex) {
  // TODO в отличие от indexOf(где 0 не принципиален), здесь обязательная проверка
  let i = isInt(fromIndex) ? indexOffsetCalculate(array.length, fromIndex, true) : array.length
  for (; i > -1; --i) {
    if (sameValueZero(array[i], se)) { return i }
  }
  return -1
}

export {
  indexOffsetCalculate,
  indexOf,
  lastIndexOf
}
