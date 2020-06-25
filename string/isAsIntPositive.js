/* isAsIntPositive.js [ 03.02.2020 : 02:43:36 ] */

import { StringTrim } from '../core/Prototypes.js'
import { regExpOnlyIntPositive, regExpOnlyIntNonnegativeZero } from '../core/Constants.js'

/**
 * Соответствие строки значению integer >= 0.
 * 
 * @memberof string
 * @param {string}              string Строка.
 * @param {boolean}  [ignoreZero=true] Игнорировать ведущие нули.
 * @param {boolean} [ignoreSpace=true] Игнорировать крайние пробельные символы.
 * @returns {boolean} Истину, если строка соответствует значению integer >= 0.
 * @example
 * const any = { '1': 5.8, '002': 'str', '2': 7.9, 'foo': [] }
 * const id = Object.keys(any)
 *   .filter((i) => isAsIntPositive(i, false))
 *   .reduce((a, v) => (a[v] = any[v], a), {})
 * // => Object { 1: 5.8, 2: 7.9 }
 */
function isAsIntPositive(string, ignoreZero = true, ignoreSpace = true) {
  ignoreSpace && (string = StringTrim.call(string))
  return ignoreZero
    ? regExpOnlyIntNonnegativeZero.test(string)
    : regExpOnlyIntPositive.test(string)
}

export default isAsIntPositive
