/* ObjectPath.js [ 31.12.2019 : 16:58:25 ] */

import { ArraySlice, StringSplit } from './Prototypes.js'
import { isString, isObject, isArray, } from './LibIs.js'
import { hasProperty, hasPropertyType } from './ObjectHasProperty.js'

// Разбирает путь на сегменты
const splitPropertyToPath = (prop) => {
  return isString(prop)
    ? StringSplit.call(prop, '.')
    : (isArray(prop) ? ArraySlice.call(prop) : [prop])
}

/**
 * Проверяет существование пути к свойству объекта и возвращает последний объект и имя искомого свойства.   
 *   Под путем понимается вложенность объектов/массивов к целевому свойству.
 *   Это позволяет задать параметр `prop` вида `assets.path.name` или `['assets', Symbol]`.  
 * 
 * @private
 * @memberof core
 * @param {{}}                            object Целевой объект.
 * @param {string|Symbol|(string|Symbol)[]} prop Имя свойства. Строка без точки(".") или символ ведут себя аналогично hasProperty.
 *                                               Строка всегда разбивается символом ".". Массив следует использовать,
 *                                               если в пути к свойству используется Symbol.
 * @returns {[{},(string|Symbol)]} Если искомого пути или свойства не существует,
 *                                 возвратит массив `[false, false]`,
 *                                 иначе возвратит `[последний_объект_в_пути, последнее_свойство]`
 */
function parseObjectPath(object, prop) {
  let path = splitPropertyToPath(prop)
  let last = path.pop()
  let refer = object
  let next
  for (next of path) {
    if (hasPropertyType(refer, next, isObject)) {
      refer = refer[next]
    } else {
      return [false, false]
    }
  }

  return hasProperty(refer, last)
    ? [refer, last]
    : [false, false]
}

export {
  splitPropertyToPath,
  parseObjectPath
}
