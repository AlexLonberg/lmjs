/* pascalCase.js [ 28.01.2020 : 09:55:22 ] */

import { splitCase, firstBreakUpperCase } from '../core/StringStylecase.js'

/**
 * Преобразует строку к стилю PascalCase.
 *
 * @memberof stylecase
 * @param {string} string
 * @returns {string}
 * @example
 * pascalCase('snake_case')
 * // => "SnakeCase"
 */
function pascalCase(string) {
  let arr = splitCase(string)
  // Перед верхним регистром может быть $
  return arr.reduce((a, v) => (a += firstBreakUpperCase(v)), '')
}

export default pascalCase
