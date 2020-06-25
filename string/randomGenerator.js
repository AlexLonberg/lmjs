/* randomGenerator.js [ 07.02.2020 : 19:12:03 ] */

import { StringMatch } from '../core/Prototypes.js'

import {
  regExpDashCharacterIn,
  regExpDashCharacter
} from '../core/Constants.js'

/**
 * Возвращает функцию генерации случайной строки.
 * 
 * @memberof string
 * @param {string} [pattern='A-Za-z0-9'] Шаблон.
 * @param {number}           [length=32] Кол-во генерируемых символов.
 * @returns {function}                   Функция.
 * @example
 * // Сразу вызовем - ()
 * randomGenerator('A-Cx-z', 6)()
 * // =>"xzAByx"
 * 
 * // Дефис можно использовать только в конце
 * randomGenerator('0-9-', 24)()
 * // =>"883075-456-063423-380-57"
 */
function randomGenerator(pattern = 'A-Za-z0-9', length = 32) {
  // Разбивает паттерн вида 'A-Za-z0-9' на 'A-Z'|'a-z'|'0-9'
  // Для поддерживаемых сред можно использовать /(?<=[^-])(?=([^-]|-$))/
  let code = (StringMatch.call(pattern, /([^-]-[^-])|./g) || [])
    .map((v, x) => (v.length
      ? (regExpDashCharacterIn.test(v)
        ? (
          [v, x] = v.split(regExpDashCharacter).map((p) => p.codePointAt(0)),
          [...new Array(x - v + 1)].map(() => v++)
        )
        : v.codePointAt(0)
      )
      : []
    )).flat(Infinity)

  return code.length
    ? (() => [...new Array(length)].map(
      () => String.fromCodePoint(code[Math.floor(Math.random() * code.length)])
    ).join(''))
    : (() => '')
}

export default randomGenerator
