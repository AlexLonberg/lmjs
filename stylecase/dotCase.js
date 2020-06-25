/* dotCase.js [ 28.01.2020 : 21:42:33 ] */

import { splitCase } from '../core/StringStylecase.js'

/**
 * Преобразует строку к стилю dot.case.
 * 
 * @memberof stylecase
 * @param {string} string
 * @returns {string} 
 * @example
 * kebabCase('UPPER_CASE_SNAKE_CASE')
 * // => "upper.case.snake.case"
 */
function dotCase(string) {
  return splitCase(string).join('.').toLowerCase()
}

export default dotCase
