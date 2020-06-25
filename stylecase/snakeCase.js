/* snakeCase.js [ 28.01.2020 : 09:51:28 ] */

import { splitCase } from '../core/StringStylecase.js'

/**
 * Преобразует строку к стилю snake_case.
 * 
 * @memberof stylecase
 * @param {string} string
 * @returns {string} 
 * @example
 * snakeCase('PascalCase')
 * // => "pascal_case"
 */
function snakeCase(string) {
  return splitCase(string).join('_').toLowerCase()
}

export default snakeCase
