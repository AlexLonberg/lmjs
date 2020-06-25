/* String.js [ 28.01.2020 : 09:58:21 ] */

import { StringTrim } from './Prototypes.js'

/**
 * Удаление начальных и конечных пробельных символов, с заменой остальных пробельных символов(и переноса строки) на один пробел.
 * 
 * @memberof string
 * @param {string} string
 * @returns {string} 
 * @example
 * cleanSpace(' asd \n  so ')
 * // => "asd so"
 */
function cleanSpace(string) {
  return StringTrim.call(string).replace(/[\s\uFEFF\xA0]+/g, ' ')
}

export {
  cleanSpace
}
