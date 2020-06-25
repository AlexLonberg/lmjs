/* camelCase.js [ 28.01.2020 : 09:57:22 ] */

import { splitCase, firstBreakUpperCase } from '../core/StringStylecase.js'

/**
 * Преобразует строку к стилю camelCase.
 * 
 * @memberof stylecase
 * @param {string} string
 * @returns {string} 
 * @example
 * camelCase('kebab-case')
 * // => "kebabCase"
 */
function camelCase(string) {
  let arr = splitCase(string)
  string = arr.shift().toLowerCase()
  return arr.reduce((a, v) => a += firstBreakUpperCase(v), string)
}

export default camelCase
