/* isAsInt.js [ 03.02.2020 : 02:43:36 ] */

import { StringTrim } from '../core/Prototypes.js'
import { regExpOnlyInt, regExpOnlyIntZero } from '../core/Constants.js'

/**
 * Соответствие строки значению integer.
 * 
 * @memberof string
 * @param {string}              string Строка.
 * @param {boolean}  [ignoreZero=true] Игнорировать ведущие нули.
 * @param {boolean} [ignoreSpace=true] Игнорировать крайние пробельные символы.
 * @returns {boolean} Истину, если строка соответствует значению integer.
 * @example
 * isAsInt('') // => false
 * isAsInt('0') // => true
 * isAsInt(' -14 ') // => true
 * isAsInt('1.85') // => false 
 * isAsInt(' 0456', false) // => false
 * isAsInt('\n 456', false) // => true
 * isAsInt('\n 456', true, false) // => false
 */
function isAsInt(string, ignoreZero = true, ignoreSpace = true) {
  ignoreSpace && (string = StringTrim.call(string))
  return ignoreZero ?
    regExpOnlyIntZero.test(string) :
    regExpOnlyInt.test(string)
}

export default isAsInt
