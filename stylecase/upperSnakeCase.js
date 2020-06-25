/* upperSnakeCase.js [ 29.01.2020 : 00:01:35 ] */

import { splitCase } from '../core/StringStylecase.js'

/**
 * Преобразует строку к стилю UPPER_SNAKE_CASE.
 * 
 * @memberof stylecase
 * @param {string} string
 * @returns {string} 
 * @example
 * upperSnakeCase('PascalCase')
 * // => "PASCAL_CASE"
 */
function upperSnakeCase(string) {
  return splitCase(string).join('_').toUpperCase()
}

export default upperSnakeCase
