/* getDeepProperty.js [ 31.12.2019 : 16:30:47 ] */

import { parseObjectPath } from '../core/ObjectPath.js'

/**
 * Одновремено проверяет и возвращает значение свойства объекта, используя в качесте параметра путь к свойству.   
 *   Эта функция не выбрасывает исключение и использует рекомендуемый параметр `stub` в качестве возврата при отсутствии свойства,
 *   когда `undefined` может быть значением свойства.   
 *   Используйте в качестве stub `Symbol()`, иначе поведение данной функции недетерминированно.
 * 
 * @memberof object
 * @param {{}}                 object Целевой объект.
 * @param {string|array} propertyPath Подробнее см. `hasDeepProperty`.
 * @param {*}        [stub=undefined] Вернется результатом в случае отсутствия свойства.
 * @returns {*|stub}                  Значение найденного свойства.
 */
function getDeepProperty(object, propertyPath, stub = undefined) {
  let [refer, property] = parseObjectPath(object, propertyPath)
  return refer ? refer[property] : stub
}

export default getDeepProperty
