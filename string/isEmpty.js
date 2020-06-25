/* isEmpty.js [ 27.12.2019 : 21:35:38 ] */

import { regExpExcludeAllSpace } from '../core/Constants.js'

/**
 * Является ли строка пустой. Тип аргумента не проверяется.
 * 
 * @memberof string
 * @param {string} string
 * @returns {boolean} Если аргумент содержит непробельные символы вернет `false`.
 * @example
 * isEmpty("")
 * // => true
 * isEmpty(" \n ")
 * // => true
 * isEmpty("s")
 * // => false
 */
function isEmpty(string) {
  return !regExpExcludeAllSpace.test(string)
}

export default isEmpty
