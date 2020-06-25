/* ArrayFillWith.js [ 02.05.2020 : 04:28:47 ] */

import { isArray, isFunction, isFinite, isIntNonnegative, isObject } from "./LibIs.js"

function makeFiller(options, length) {
  let { start, end, filler, value, step } = options
  if (!isIntNonnegative(start)) {
    start = 0
  }
  if (!isIntNonnegative(end)) {
    end = length - 1
  }
  let indexFiller = isFunction(filler)
    ? filler
    : (
      (isFinite(step) && isFinite(value))
        ? ((value -= step), () => (value += step))
        : () => value
    )
  return [start, end, indexFiller]
}

/**
 * Заполняет массив значениями.
 * 
 * @memberof array
 * @param {number|array}  [array=[]] Неотрицательное число или массив.
 *                                    * number - будет создан новый массив с указанным length
 *                                    * array  - если это массив, он будет заполнен
 * @param {any|function|{}} [filler] Заполнитель, может быть одним из вариантов:
 *                                    * function - принимает аргументом текущий индекс, в который установится результат функции
 *                                    * object - может принимать необязательные свойства:
 *                                      + filler:function - опции value и step будут проигнорированны
 *                                      + start - начальный индекс
 *                                      + end   - конечный индекс
 *                                      + value:any - фиксированное значение(если нет step) или начальное
 *                                      + step - шаг приращения, только если есть isFinite(value)
 *                                    * any - игнорируется, при любом другом значении массив будет заполнен undefined
 * @returns {array} Новый массив или первый аргумент. 
 * @example
 * fillWith([], (i) => i) 
 * // => []
 * fillWith([null, null]) 
 * // => [ undefined, undefined ]
 * fillWith(2, (i) => ++i)
 * // => [ 1, 2 ]
 * fillWith(['a', 'b', 'c', 'd'], { start: 2, end: 1 }) 
 * // end < start => [ 'a', 'b', 'c', 'd' ]
 * fillWith(null, { start: 1, end: 3, value: 0.5, step: 0.5 }) 
 * // => [ <1 empty item>, 0.5, 1, 1.5 ]
 * 
 * const array = [1, 'a']
 * const start = 2
 * fillWith(array, { filler: (i) => (array[i - start] + 2), start, end: 3 })
 * // => [ 1, 'a', 3, 'a2' ]
 */
function fillWith(array, filler) {
  let length
  if (isArray(array)) {
    length = array.length
  } else {
    length = isIntNonnegative(array) ? array : 0
    array = []
  }

  let [start, end, indexFiller] = isFunction(filler)
    ? [0, length - 1, filler]
    : (
      isObject(filler)
        ? makeFiller(filler, length)
        : [0, length - 1, () => undefined]
    )

  while (start <= end) {
    array[start] = indexFiller(start++)
  }
  return array
}

export {
  fillWith
}
