/* hasDeepProperty.js [ 29.12.2019 : 09:03:57 ] */

import { parseObjectPath } from '../core/ObjectPath.js'

/**
 * Проверка вложенного свойства объекта.   
 * Это позволяет задать параметр `propertyPath` вида `assets.path.name` или `['assets', Symbol]`.
 * 
 * @param {{}}                                    object Целевой объект.
 * @param {string|Symbol|(string|Symbol)[]} propertyPath Имя свойства. Строка без точки(".") или символ ведут себя аналогично hasProperty.
 *                                                         Строка всегда разбивается символом ".".
 *                                                         Массив следует использовать, если в пути к свойству используется Symbol.
 * @param {function}                            [tester] Опционально. Может быть только функцией. При нахождении свойства в функцию будут переданы tester(value, prop, obj):  
 *                                                         * value     - значение свойства
 *                                                         * prop      - имя или символ
 *                                                         * object:{} - последний объект из propertyPath
 * @returns {boolean} 
 * 
 * @example
 * let ot = {a: {b: [1,2] }}
 * hasDeepProperty(ot, 'a.b')
 * // => true
 * // !!! Это найдет и свойства массива
 * hasDeepProperty(ot, 'a.b.0')
 * // true
 * hasDeepProperty(ot, 'a.b.3')
 * // false
 */
function hasDeepProperty(object, propertyPath, tester) {
  let [refer, property] = parseObjectPath(object, propertyPath)
  return refer
    ? (!tester || tester(refer[property], property, refer))
    : false
}

export default hasDeepProperty
