/* titleCase.js [ 28.01.2020 : 22:29:08 ] */

import { cleanSpace } from '../core/String.js'
import { firstLocaleUpperCase } from '../core/StringStylecase.js'

/**
 * Преобразует строку к стилю "Title just like this.".
 * 
 * @memberof stylecase
 * @param {string} string
 * @returns {string} 
 * @example
 * titleCase(' Title jast \n LIKE #$ _ . This')
 * // => "Title jast like #$ _ . this"
 */
function titleCase(string) {
  return firstLocaleUpperCase(cleanSpace(string))
}

export default titleCase
