/* upperKebabCase.js [ 29.01.2020 : 00:00:13 ] */

import { splitCase } from '../core/StringStylecase.js'

/**
 * Преобразует строку к стилю UPPER-KEBAB-CASE.
 * 
 * @memberof stylecase
 * @param {string} string
 * @returns {string} 
 * @example
 * upperKebabCase('UPPER_CASE_SNAKE_CASE')
 * // => "UPPER-CASE-SNAKE-CASE"
 */
function upperKebabCase(string) {
  return splitCase(string).join('-').toUpperCase()
}

export default upperKebabCase
