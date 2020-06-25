/* toFixed.js [ 27.12.2019 : 19:15:48 ] */

import { NumberToFixed } from '../core/Prototypes.js'
import isIntNonnegative from './isIntNonnegative.js'


/**
 * Преобразует число в строку с фиксированным кол-вом цифр после запятой.   
 * Это отличается от поведения [number.toFixed()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed)
 * 
 * @memberof number
 * @param {number}      value Целевое значение.
 * @param {number} [digits=2] Количество цифр после десятичной точки. По умолчанию 2.
 * @returns {string}          
 * @example
 * toFixed(3.555)
 * // => "3.56"
 * toFixed(3.55, 1) | Number.prototype.toFixed.call(3.55, 1)
 * // => "3.6"      | "3.5"
 */
function toFixed(value, digits) {
  if (!isIntNonnegative(digits)) {
    digits = 2
  }
  let fix = Math.pow(10, digits)
  return NumberToFixed.call(Math.round(value * fix) / fix, digits)
}

export default toFixed
