/* ObjectHasProperty.js [ 31.12.2019 : 17:09:37 ] */

import { ObjectHasOwnProperty } from './Prototypes.js'

/**
 * Проверка присутствия свойства в объекте.  
 *   Передача невалидного типа в параметре `object`, может вызвать исключение по дефолту.
 * 
 * @private
 * @memberof core
 * @param {{}}              object Целевой объект.
 * @param {string|Symbol} property Имя свойства или символ.
 * @returns {boolean} 
 */
function hasProperty(object, property) {
  // TODO При object === undefined hasOwnProperty выбрасывает ошибки
  return ObjectHasOwnProperty.call(object, property)
}

/**
 * Проверка присутствия свойства с одновременным тестирование.
 * 
 * @private
 * @memberof core
 * @param {{}}              object Целевой объект.
 * @param {string|Symbol} property Имя свойства или символ.
 * @param {function}        tester Это обязательный параметр.
 * @returns {boolean} 
 */
function hasPropertyType(object, property, tester) {
  return hasProperty(object, property) && tester(object[property], property, object)
}

export {
  hasProperty,
  hasPropertyType
}
