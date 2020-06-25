/* hasProperty.js [ 26.12.2019 : 22:01:29 ] */

import { hasProperty as defaultHasProperty } from '../core/ObjectHasProperty.js'

/**
 * Проверка наличия собственного перечеслимого(enumerable) свойства объекта.
 * 
 * @memberof object
 * @param {{}}              object Целевой объект.
 * @param {string|Symbol} property Имя свойства или символ.
 * @param {function}      [tester] Опционально. Может быть только функцией.   
 *                                   tester(value, prop, obj), принимает параметры:    
 *                                   * value - значение свойства
 *                                   * prop  - имя свойста
 *                                   * obj   - целевой объект
 * @returns {boolean} 
 * @example
 * hasProperty({a:1}, 'a', isString)
 * // => false
 * hasProperty({a:1}, 'a', isInt)
 * // => true
 */
function hasProperty(object, property, tester) {
  return defaultHasProperty(object, property)
    ? (!tester || tester(object[property], property, object))
    : false
}

export default hasProperty
