/* ObjectKeys.js [ 04.02.2020 : 01:33:12 ] */

import { ObjectKeys, ObjectGetOwnPropertyNames, ObjectGetOwnPropertySymbols } from './StaticMethods.js'

const h = (refs) => {
  let v = ObjectKeys(refs)
  return ObjectGetOwnPropertyNames(refs).filter((k) => !v.includes(k))
}

/**
 * Возвращает функцию быстрого получения списка ключей объекта.
 * 
 * @memberof object
 * @param {boolean} [hidden=false] Возвращать скрытые (`!enumerable`) свойства. Не возвращает !enumerable символьные свойства.
 * @param {boolean} [symbol=false] Возвращать все символьные свойства, в том числе и !enumerable.
 * @param {boolean}     [own=true] Возвратить `enumerable` свойства - по умолчанию (Object.keys).
 * @returns {function}             Функция принимающая один параметр ссылки на объект и возвращающая массив ключей.
 * @example
 * keyPicker(false, true, false)({name:1, [Symbol()]:2})
 * // =>  [Symbol()]
 * @description
 * При использовании symbol:true, функция сохраняет поведение `Object.getOwnPropertySymbols()`,
 *   которая возвращает скрытые (`!enumerable`) символьные свойства.
 */
function keyPicker(hidden = false, symbol = false, own = true) {

  switch ((0 | (own ? 1 : 0)) | (symbol ? 2 : 0) | (hidden ? 4 : 0)) {
    case 1: return ObjectKeys
    case 2: return ObjectGetOwnPropertySymbols
    case 3: return (refs) => ObjectKeys(refs).concat(ObjectGetOwnPropertySymbols(refs))
    case 4: return h
    case 5: return ObjectGetOwnPropertyNames
    case 6: return (refs) => h(refs).concat(ObjectGetOwnPropertySymbols(refs))
    case 7: return (refs) => ObjectGetOwnPropertyNames(refs).concat(ObjectGetOwnPropertySymbols(refs))
  }
  // keyPicker(false,false,false) всегда возвратит пустой массив
  return () => []
}

/**
 * Возвращает список ключей объекта.
 * 
 * @memberof object
 * @param {object}          object Целевой объект.
 * @param {boolean} [hidden=false] Возвращать скрытые (`!enumerable`) свойства. Не возвращает !enumerable символьные свойства.
 * @param {boolean} [symbol=false] Возвращать все символьные свойства, в том числе и !enumerable.
 * @param {boolean}     [own=true] Возвратить `enumerable` свойства - по умолчанию (Object.keys).
 * @returns {function}             Массив ключей объекта.
 * @example
 * keys({name:1, [Symbol()]:2}, false, true, false)
 * // =>  [Symbol()]
 * @description
 * При использовании symbol:true, функция сохраняет поведение `Object.getOwnPropertySymbols()`,
 *   которая возвращает скрытые (`!enumerable`) символьные свойства.
 */
function keys(object, hidden = false, symbol = false, own = true) {
  return keyPicker(hidden, symbol, own)(object)
}

export {
  keyPicker,
  keys
}
