/* LibIsDeepEqualAsJson.js [ 31.05.2020 : 19:06:25 ] */

import { ObjectEntries } from './StaticMethods.js'
import { RegExpToString } from './Prototypes.js'
import { isObject, isArray, sameValueZero } from './LibIs.js'
import { isEqualEntriesWithComparator } from './LibIsEqualEntries.js'

/**
 * Простой тест глубокого равенства между JSON-подобными any1 и any2 параметрами.   
 *   Типы не проверяются, см. description.
 * 
 * @memberof object
 * @param {*} any1 Любое значение.
 * @param {*} any2 Значение для сравнения с any1.
 * @returns {boolean} Истина при равных объектах.
 * @example
 * const foo = Symbol()
 * const bar = () => null
 * const obj1 = {
 *   a: new RegExp('abc'), b: { arr: [1, 'str', foo] }, c: bar
 * }
 * const obj2 = {
 *   a: new RegExp('abc'), b: { arr: [1, 'str', foo] }, c: bar
 * }
 * 
 * isDeepEqualAsJson(obj1, obj2)
 * // => true
 * 
 * obj1.b.arr.push(obj1)
 * isDeepEqualAsJson(obj1, obj2)
 * // => false
 * 
 * obj2.b.arr.push(obj2)
 * isDeepEqualAsJson(obj1, obj2)
 * // => true
 * @description
 * Порядок сравнения:
 *   * аргументы any1 и any2 сравниваются как и любые значения свойств объектов
 *   * сравниваются только собственные enumerable свойства объекта(Object.keys)
 *   * если значения свойств равны sameValueZero(val1, val2), рекурсивный обход свойства прекращается
 *   * свойства сравниваются неупорядоченными
 *   * примитивы и функции сравниваются с помощью sameValueZero
 *   * RegExp сравниваются по RegExp.prototype.toString(), при этом исключается сравнение всех свойств
 *   * массивы(isArray) не считаются равными объектам
 *   * кол-во и имена ключей сравниваются по строгому равенству
 *   * если одно из значений является круговой ссылкой(рекурсия), равными считаются равные пути(any1["a.b"] === any2["a.b"])
 *   * все объекты, не указанные выше, сравниваются как обычные объекты
 */
function isDeepEqualAsJson(any1, any2) {
  const parents1 = []
  const parents2 = []
  let svz
  let i1
  let i2
  const recursive = (a, b) => {
    svz = sameValueZero(a, b)
    // это может быть и isFunction(...)
    if (svz || !isObject(a) || !isObject(b)) {
      return svz
    }
    // RegExp только source
    if ((a instanceof RegExp) && (b instanceof RegExp)) {
      return RegExpToString.call(a) === RegExpToString.call(b)
    }
    // массив/НЕмассив
    if ((isArray(a) ? !isArray(b) : isArray(b))) {
      return false
    }
    // Если рекурсия, проверяем только глубину, значения проверены выше
    //   Объекты parents не могут быть NaN - ищем обычным indexOf
    i1 = parents1.indexOf(a)
    i2 = parents2.indexOf(b)
    if (i1 !== -1 || i2 !== -1) {
      return i1 === i2
    }
    parents1.push(a)
    parents2.push(b)
    if (!isEqualEntriesWithComparator(
      ObjectEntries(a),
      ObjectEntries(b),
      (v1, v2) => recursive(v1[1], v2[1])
    )) {
      return false
    }
    parents1.pop(a)
    parents2.pop(b)
    return true
  }
  return recursive(any1, any2)
}

export {
  isDeepEqualAsJson
}
