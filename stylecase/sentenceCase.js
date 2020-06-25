/* sentenceCase.js [ 28.01.2020 : 22:29:30 ] */

import { StringTrim } from '../core/Prototypes.js'
import { regExpAllSpace } from '../core/Constants.js'
import { firstLocaleUpperCase } from '../core/StringStylecase.js'

/**
 * Преобразует строку к стилю "Sentence Just Like This.".
 * 
 * @memberof stylecase
 * @param {string} string
 * @returns {string} 
 * @example
 * sentenceCase(' Sentence jast \n LIKE  #$ _ . This')
 * // => "Sentence Jast Like #$ _ . This"
 */
function sentenceCase(string) {
  return StringTrim.call(string).split(regExpAllSpace).map((v) => firstLocaleUpperCase(v), '').join(' ')
}

export default sentenceCase
