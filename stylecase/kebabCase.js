/* kebabCase.js [ 28.01.2020 : 09:51:28 ] */

import { splitCase } from '../core/StringStylecase.js'

/**
 * Преобразует строку к стилю kebab-case.
 * 
 * @memberof stylecase
 * @param {string} string
 * @returns {string} 
 * @example
 * kebabCase('UPPER_CASE_SNAKE_CASE')
 * // => "upper-case-snakeCase"
 */
function kebabCase(string) {
  return splitCase(string).join('-').toLowerCase()
}

export default kebabCase
