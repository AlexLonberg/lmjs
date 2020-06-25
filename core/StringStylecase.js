/* StringStylecase.js [ 01.05.2020 : 22:44:28 ] */

import { StringReplace, StringSplit, StringSlice, StringCharAt, StringMatch } from './Prototypes.js'
import {
  regExpSplitForCaseNotLetter,
  regExpTestForCaseAllUpper,
  regExpForCaseFirstBreak
} from './Constants.js'

/**
 * Разбивает строку для методов camelCase, pascalCase и т.п.   
 * Функция не проверяет валидность стиля и разбивает только по одному типу разделителей в порядке:
 *   * regExpSplitForCaseNotLetter - если есть "_- ." и т.п.
 *   * regExpSplitForCasePascal    - верхний регистр
 * 
 * @private
 * @memberof core
 * @param {string} string Входная строка, при этом стиль не определен.
 * @returns {array}       Массив отдельных имен
 * @example
 * splitCase('PascalCase$SS')
 * // => ["Pascal", "Case", "$S", "S"]
 */
function splitCase(string) {
  if (/^[^$a-z]+|[^$a-z0-9]+$/i.test(string)) {
    string = StringReplace.call(string, /^[^$a-z]+|[^$a-z0-9]+$/ig, '')
  }
  return regExpSplitForCaseNotLetter.test(string)
    ? StringSplit.call(string, regExpSplitForCaseNotLetter)
    // может оказаться, что нет символов в нижнем регистре, тогда не разбиваем
    : (regExpTestForCaseAllUpper.test(string)
      ? [string]
      // Перед верхним регистром может быть $
      // Для поддерживаемых сред можно использовать /(?<=[^$]).{0}(?=\$?[A-Z])/
      : (StringMatch.call(string, /[$A-Z]*[^$A-Z]+/g) || [])
    )
}

/**
 * Альлтернатива firstUpperCase, для использования в преобразовании строки вида: `$string` => `$String`
 * 
 * @private
 * @memberof core
 * @param {string} string
 * @returns {string} 
 */
function firstBreakUpperCase(string) {
  return regExpForCaseFirstBreak.test(string) ?
    string.toLowerCase().replace(regExpForCaseFirstBreak, (s) => s.toUpperCase()) :
    firstUpperCase(string)
}

/**
 * Преобразует строку к нижнему регистру и первый символ к верхнему, с использованием to[Lower|Upper]Case.   
 *   Если строка пуста возвратиться пустая строка.  
 *   Альлтернатива firstLocaleUpperCase.
 * 
 * @memberof stylecase
 * @param {string} string
 * @returns {string} 
 * @example
 * firstUpperCase('string')
 * // => "String"
 */
function firstUpperCase(string) {
  return (
    // charAt и slice не выбрасывают ошибок
    StringCharAt.call(string, 0).toUpperCase() +
    StringSlice.call(string, 1).toLowerCase()
  )
}

/**
 * Преобразует строку к нижнему регистру и первый символ к верхнему, с использованием toLocale[Lower|Upper]Case.  
 *   Альлтернатива firstUpperCase.
 * 
 * @memberof stylecase
 * @param {string} string
 * @returns {string} 
 * @example
 * firstLocaleUpperCase('string')
 * // => "String"
 */
function firstLocaleUpperCase(string) {
  return (
    StringCharAt.call(string, 0).toLocaleUpperCase() +
    StringSlice.call(string, 1).toLocaleLowerCase()
  )
}

export {
  splitCase,
  firstBreakUpperCase,
  firstUpperCase,
  firstLocaleUpperCase
}
