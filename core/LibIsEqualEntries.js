/* LibIsEqualEntries.js [ 27.05.2020 : 20:32:45 ] */

import { ArraySlice } from './Prototypes.js'
import { sameValueZero, isInt } from './LibIs.js'
import { isEqualChaotic } from './ArrayIsEqual.js'

const comparePair = (v1, v2) => sameValueZero(v1[1], v2[1])

// Возвращает функцию сравнения
function makeComparator(depth) {
  return (v1, v2) => isEqualChaotic(
    ArraySlice.call(v1, 1, 1 + depth),
    ArraySlice.call(v2, 1, 1 + depth)
  )
}

/**
 * Сравнение !!! Прямой вызов, только для внутреннего использования, с настоящими массивами и копией unchecked
 * 
 * @memberof core
 * @private
 * @param {array} entries [[ключ => значение],...] Обязательно должен быть итерируемым массивом.
 * @param {array} unchecked !!! Обязательно должна быть копия, массив обрезается.
 * @param {function} [comparator=comparePair] По дефолту сравнивает только один элемент
 * @returns {boolean}
 */
function isEqualEntriesWithComparator(entries, unchecked, comparator = comparePair) {
  if (entries.length !== unchecked.length) {
    return false
  }
  let i
  for (let pv of entries) {
    // Для Map, ключем может быть любой примитив, в том числе и NaN
    i = unchecked.findIndex(([p]) => sameValueZero(pv[0], p))
    if (i === -1 || !comparator(pv, unchecked[i])) {
      return false
    }
    unchecked.splice(i, 1)
  }
  return true
}

/**
 * Сравнивает пары [[ключ => значение, ...], ...] двух массивов подобных Object.entries(...). Порядок значения не имеет.  
 *   Каждый элемент массива должен содержать:  
 *   * item[0]   - первый элемент считается ключем, это может быть и объект
 *   * item[>=1] - второй и последующие элементы - значение ключа   
 *   Ключи сравниваются с помощью sameValueZero.   
 *   Дополнительно см. `isEqualEntries(...)`
 *
 * @param {array} pv1 Массив вида [ [prop, value, ...], ... ]
 * @param {array} pv2 Массив вида [ [prop, value, ...], ... ]
 * @param {function} comparator Функция comparator(pv1:[], pv1:[]), где:  
 *                              * pv1:['prop', ...] - ссылка на элемент массива pv1  
 *                              * pv2:['prop', ...] - ссылка на элемент массива pv2   
 *                              comparator(...) должен вернуть boolean-значение.  
 *                              Обратите внимание: первые элементы 'prop'(ключи) будут всегда равны. 
 * @returns {boolean} Возвращает истину, если у обоих массивов равное кол-во одинаковых ключей
 *                    и comparator(...) вернул истину для всех значений.
 * @example См. isEqualEntries(...)
 */
function isEqualEntriesWith(pv1, pv2, comparator) {
  return isEqualEntriesWithComparator(ArraySlice.call(pv1), ArraySlice.call(pv2), comparator)
}

/**
 * Сравнивает пары [[ключ => значение, ...], ...] двух массивов подобных Object.entries(...). Порядок значения не имеет.  
 *   Каждый элемент массива должен содержать:  
 *   * item[0]   - первый элемент считается ключем, это может быть и объект 
 *   * item[>=1] - второй и последующие элементы - значение ключа, порядок значение не имеет  
 *   Ключи и их значения сравниваются с помощью sameValueZero.   
 *   Дополнительно см. `isEqualEntriesWith(...)`
 * 
 * @memberof object
 * @param {array} pv1 Массив вида [ [prop, value, ...], ... ]
 * @param {array} pv2 Массив вида [ [prop, value, ...], ... ]
 * @param {number} [depth=1] По умолчанию значением считается один второй элемент.
 *                           При установке depth > 1, значений может быть несколько [prop, value1, value2, ...],
 *                           при этом они могут располагаться в любом порядке([p, 1, 2] === [p, 2, 1]).
 * @returns {boolean} Возвращает истину, если у обоих массивов равное кол-во одинаковых ключей
 *                    и равные значения для каждого ключа.
 * @example
 * const id = Symbol('id')
 * const obj = { a: null }
 * let entries1 = [[id, 1], [obj, 2]]
 * let entries2 = [[obj, 2], [id, 1]]
 * isEqualEntries(entries1, entries2)
 * // => true
 * 
 * entries1.forEach((a) => (a.push(NaN))) 
 * // [ [ Symbol(id), 1, NaN ], [ { a: null }, 2, NaN ] ]
 * isEqualEntries(entries1, entries2, 2)
 * // => false
 * 
 * entries2.forEach((a) => (a.splice(1, 0, NaN))) 
 * // [ [ { a: null }, NaN, 2 ], [ Symbol(id), NaN, 1 ] ]
 * isEqualEntries(entries1, entries2, 2)
 * // => true
 * 
 * entries1.push([1, 2, 3])
 * isEqualEntries(entries1, entries2, 2)
 * // => false
 */
function isEqualEntries(pv1, pv2, depth = 1) {
  return isEqualEntriesWithComparator(
    ArraySlice.call(pv1),
    ArraySlice.call(pv2),
    (
      (!isInt(depth) || depth < 2)
        ? comparePair
        : makeComparator(depth)
    ))
}

export {
  isEqualEntriesWithComparator,
  isEqualEntriesWith,
  isEqualEntries
}
