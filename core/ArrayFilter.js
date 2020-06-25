/* ArrayFilter.js [ 04.02.2020 : 02:11:45 ] */

import { ArrayFilter, ArraySplice } from './Prototypes.js'

/**
 * Фильтрует массив используя тестовую функцию.  
 *   Альтернатива стандартному методу `Array.prototype.filter`, за исключением того, что изменяется исходный массив.
 * 
 * @memberof array
 * @param {array}          array Целевой массив.
 * @param {function}    [tester] Тестовая функция принимающая те же значения, что и `callback` в `Array.prototype.filter(callback)`.
 *                                 Индексы могут не соответствовать прошлым индексам исходного массива, если элементы были удалены.
 * @returns {array}              Целевой массив.
 * @example
 * filterSelf([8, NaN, NaN, 5, undefined, 1, 3], (v) => (v === v) && (v !== undefined))
 * // => [8, 5, 1, 3]
 */
function filterSelf(array, tester) {
  let splice = ArraySplice.bind(array)
  let i = 0
  for (; i < array.length; ++i) {
    if (!tester(array[i], i, array)) {
      splice(i--, 1)
    }
  }

  return array
}

/**
 * Фильтрует массив используя тестовую функцию.  
 *   Альтернатива стандартному методу `Array.prototype.filter`, за исключением того,
 *   что может быть вызвана на массивоподобных объектах, не имеющих метода `filter`.
 * 
 *   Для изменения исходного массива, используйте `filterSelf(...)`.
 * 
 * @memberof array
 * @param {array}          array Целевой массив.
 * @param {function}      tester Тестовая функция принимающая те же значения, что и `callback` в `Array.prototype.filter(callback)`.
 * @returns {array}              Возвращает новый массив.
 * @example
 * filter([8, NaN, NaN, 5, undefined, 1, 3], (v) => (v === v) && (v !== undefined))
 * // => [8, 5, 1, 3]
 */
function filter(array, tester) {
  return ArrayFilter.call(array, tester)
}

export {
  filterSelf,
  filter
} 
