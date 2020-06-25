/* isAsIntNonnegative.js [ 03.02.2020 : 02:43:36 ] */

import { StringTrim } from '../core/Prototypes.js'
import { regExpOnlyIntNonnegative, regExpOnlyIntNonnegativeZero } from '../core/Constants.js'

/**
 * Соответствие строки значению integer >= 0.
 * 
 * @memberof string
 * @param {string}              string Строка.
 * @param {boolean}  [ignoreZero=true] Игнорировать ведущие нули.
 * @param {boolean} [ignoreSpace=true] Игнорировать крайние пробельные символы.
 * @returns {boolean} Истину, если строка соответствует значению integer >= 0.
 * @example
 * isAsIntNonnegative(Object.keys({ '0': 'any' })[0])
 * // => true
 * isAsIntNonnegative(Object.keys({ '00': 'any' })[0], false)
 * // => false
 */
function isAsIntNonnegative(string, ignoreZero = true, ignoreSpace = true) {
  ignoreSpace && (string = StringTrim.call(string))
  return ignoreZero ?
    regExpOnlyIntNonnegativeZero.test(string) :
    regExpOnlyIntNonnegative.test(string)
}

export default isAsIntNonnegative
