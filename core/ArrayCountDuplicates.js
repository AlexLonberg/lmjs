/* ArrayCountDuplicates.js [ 06.01.2020 : 13:43:31 ] */

import { sameValueZero } from './LibIs.js'

/**
 * Подсчитывает кол-во дубликатов элементов массива.
 * 
 * @memberof array
 * @param {array} array Исходный массив
 * @returns {{value,count:number,indexes:[]}[]} Возвращает массив объектов, где свойства:  
 *                        * `value`     - элемент исходного массива   
 *                        * `count`     - кол-во повторений   
 *                        * `indexes[]` - массив индексов исходного массива, в которых содержиться элемент   
 * @example
 * countDuplicates([NaN, 1, 'str', NaN, 1])
 * // => 
 * [
 *   { value: NaN, count: 2, indexes: [ 0, 3 ] },
 *   { value: 1, count: 2, indexes: [ 1, 4 ] },
 *   { value: 'str', count: 1, indexes: [ 2 ] }
 * ]
 */
function countDuplicates(array) {
  let arrUniq = [/* {value, count, indexes[]} */]
  let fi = (v) => arrUniq.findIndex((i) => sameValueZero(i.value, v))
  let value
  let ind
  let i = 0
  for (; i < array.length; ++i) {
    value = array[i]
    ind = fi(value)
    if (ind === -1) {
      arrUniq.push({ value, count: 1, indexes: [i] })
    } else {
      ++arrUniq[ind].count
      arrUniq[ind].indexes.push(i)
    }
  }

  return arrUniq
}

export {
  countDuplicates
} 
