/* ObjectEasyCopy.js [ 03.05.2020 : 02:13:45 ] */

import { ObjectEntries } from './StaticMethods.js'
import { isArray, isObject } from './LibIs.js'
import { copyRegExp } from './LibObject.js'

/**
 * Простое рекурсивное(глубокое) копирование собственных перечислимых enumerable-свойств(Object.keys) JSON-подобных объектов или примитивов.   
 *   Скрытые и символьные свойства не копируются. Дескрипторы свойств не копируются.   
 *   Для экзкмпляров RegExp создаются новые копии. Функция возвратит ссылку на себя. Копирование типов не поддерживается.  
 *   
 *   Если аргумент source это массив, возвратит массив.  
 *   Если в цепочке копирования значением свойства окажется родительский объект,
 *   свойство получит ссылку на собственную копию.
 * 
 * @memberof object
 * @param {any} source Любой объект или примитив.
 * @returns {any}      Копия.
 * @example
 * const obj = { prop: 1, [Symbol()]: 2 }
 * const arr = [/abc/i, obj]
 * arr[2] = arr
 * const copy = easyCopy(arr)
 * 
 * copy, copy[2], ... copy[2][2][2]...
 * // => [ /abc/i, { prop: 1 }, [Circular] ], ...
 * 
 * copy === copy[2][2], arr === arr[2][2]
 * // => true, true
 * arr === copy[2][2]
 * // => false
 */
function objectEasyCopy(source) {
  let sParents = []
  let tParents = []
  let i
  const copyRecursive = (s) => {
    if (!isObject(s)) {
      return s
    }
    if ((s instanceof RegExp)) {
      return copyRegExp(s)
    }
    let target = isArray(s) ? [] : {}
    let pv = ObjectEntries(s)
    sParents.push(s)
    tParents.push(target)
    for (let [p, v] of pv) {
      i = sParents.indexOf(v)
      target[p] = (i === -1) ? copyRecursive(v) : tParents[i]
    }
    sParents.pop()
    tParents.pop()
    return target
  }
  return copyRecursive(source)
}

export {
  objectEasyCopy
}
