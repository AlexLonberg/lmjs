/* upperDotCase.js [ 28.01.2020 : 23:56:42 ] */

import { splitCase } from '../core/StringStylecase.js'

/**
 * Преобразует строку к стилю UPPER.DOT.CASE.  
 * 
 * @memberof stylecase
 * @param {string} string
 * @returns {string} 
 * @example
 * upperDotCase('snake_case')
 * // => "SNAKE.CASE"
 */
function upperDotCase(string) {
  return splitCase(string).join('.').toUpperCase()
}

export default upperDotCase
