/* Args.js [ 29.12.2019 : 15:48:12 ] */
// Всевозможные извлечения и преобразования аргументов

import { ArraySlice, ArraySplice, ArrayShift } from './Prototypes.js'
import { isInt, isArray } from './LibIs.js'
import { indexOffsetCalculate } from './Array.js'

/**
 * Извлекает последние аргументы.  
 * В случае успешного извлечения аргументов, изменяется args.length - именно так и надо.
 * 
 * @memberof utils
 * @param {arguments}              args Массив аргументов.
 * @param {function|function[]} filters Функция(или массив функций) filters(args[i], i, args), тестирования/модификации аргументов.
 * @param {number}        [fromIndex=0] Опционально. Индекс с которого начинается поиск в args.  
 *                                        Отрицательно значение приведет к смещению с конца массива.  
 *                                        fromIndex:-3 приведет к обходу, только последних трех аргументов или всех если args.length <= 3.
 * @param {boolean}     [reverse=false] Опционально. По умолчанию поиск первого аргумента начинается с последнего элемента(т.е. в обратную сторону),
 *                                        при `true` с первого. Это не влияет на индекс `options.fromIndex`.  
 *                                        Когда искомый аргумент найден, следующие аргументы извлекаются из массива args и обход начинается
 *                                        с нулевого элемента. При этом последние аргументы можно отфильтровать и модифицировать.
 * @returns {lastArgs[]} Массив последних аргументов. При неудаче(отсутствии аргументов) вернется пустой массив.
 */
function extractLastArgs(args, filters, fromIndex, reverse = false) {
  fromIndex = isInt(fromIndex) ? indexOffsetCalculate(args.length, fromIndex) : 0
  let [test, tests] = isArray(filters)
    ? ((filters = ArraySlice.call(filters)),
      [
        ArrayShift.call(filters),
        filters
      ])
    : [filters, []]

  let i = fromIndex - 1
  let indexer = reverse ?
    (() => (++i) < args.length) :
    ((i = args.length), (() => (--i) >= fromIndex))

  let argsRest = []

  while (indexer()) {
    let [add, current] = test(args[i], i, args)
    if (add) {
      ArraySplice.call(args, i, 1)
      argsRest.push(current, ...ArraySplice.call(args, i))
      if (tests.length) {
        test = tests.shift()
      }
      break
    }
  }

  for (i = 1; i < argsRest.length; ++i) {
    let [add, current] = test(argsRest[i], i, argsRest)
    if (add) { argsRest[i] = current }
    else { argsRest.splice(i--, 1) }
    if (tests.length) {
      test = tests.shift()
    }
  }

  return argsRest
}

export {
  extractLastArgs
}
