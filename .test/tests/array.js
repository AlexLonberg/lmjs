/* array.js [ 02.05.2020 : 01:46:57 ] */

import { deepStrictEqual } from 'assert'
import {
  // isArray,
  isEqual,
  countDuplicates,
  diff,
  diffSelf,
  fillWith,
  filter,
  filterSelf,
  indexOf,
  intersection,
  intersectionSelf,
  lastIndexOf,
  startsWith,
  union,
  unionSelf,
  uniq,
  uniqSelf,
  xor
} from 'lmjs/array'

describe(`test array`, () => {

  it(`isEqual(...)`, () => {
    let arr = [1, 2, 3]
    if (!isEqual([1, 1, 5, NaN], [5, 1, NaN, 1]) || !isEqual(arr, arr)) {
      throw new Error(`Ошибка теста isEqual(...)`)
    }
    if (isEqual([1, NaN], [NaN, 1], true) || isEqual([1, NaN], [1])) {
      throw new Error(`Ошибка теста isEqual(...)`)
    }
  })

  it(`countDuplicates(...)`, () => {
    const sl = [
      { value: NaN, count: 2, indexes: [0, 3] },
      { value: 1, count: 2, indexes: [1, 4] },
      { value: 'str', count: 1, indexes: [2] }
    ]
    const res = countDuplicates([NaN, 1, 'str', NaN, 1])
    deepStrictEqual(sl, res, `Ошибка теста countDuplicates(...)`)
  })

  it(`diff(...) diffSelf(...)`, () => {
    let res = diff([1, 1, 2, 3, 4, 50, NaN], [2, NaN], [50])
    deepStrictEqual(res, [1, 1, 3, 4], `Ошибка теста diff(...)`)
    res = diffSelf([1, 1, 2, 3, 4, 50, NaN], [2, NaN], [50])
    deepStrictEqual(res, [1, 1, 3, 4], `Ошибка теста diffSelf(...)`)
    res = diffSelf([], [2, NaN], [50])
    deepStrictEqual(res, [], `Ошибка теста diffSelf(...)`)
    res = diffSelf([1, 2])
    deepStrictEqual(res, [1, 2], `Ошибка теста diffSelf(...)`)
    res = diffSelf([1, 2], [1, 2, 3])
    deepStrictEqual(res, [], `Ошибка теста diffSelf(...)`)
  })

  it(`fillWith(...)`, () => {
    let mess = `Ошибка теста fillWith(...)`
    deepStrictEqual([],
      fillWith(),
      mess)
    deepStrictEqual([0, 1],
      fillWith(2, (i) => i),
      mess)
    deepStrictEqual([0, 1],
      fillWith([null, null], (i) => i),
      mess)

    deepStrictEqual(['a', undefined, undefined, 'd'],
      fillWith(['a', 'b', 'c', 'd'], { start: 1, end: 2 }),
      mess)
    deepStrictEqual(['a', 'b', 'c', 'd'],
      fillWith(['a', 'b', 'c', 'd'], { start: 2, end: /*end < start*/ 1 }),
      mess)
    // TODO если не установить первым элементом undefined,
    //   в проверочном массиве тоже его не должно быть,
    //   [,any] === [,any], но лучше явно установим
    deepStrictEqual([undefined, undefined, undefined],
      fillWith([undefined], { start: 1, end: 2 }),
      mess)
    deepStrictEqual([],
      fillWith(null, { start: 1, end: -1 }),
      mess)
    deepStrictEqual([undefined, 0.5, 1, 1.5],
      fillWith([undefined], { start: 1, end: 3, value: 0.5, step: 0.5 }),
      mess)
    deepStrictEqual([1, 2],
      fillWith(2, { filler: (i) => ++i }),
      mess)
  })

  it(`filter(...) filterSelf(...)`, () => {
    let res = filter([8, NaN, NaN, 5, undefined, 1, 3], (v) => (v === v) && (v !== undefined))
    deepStrictEqual(res, [8, 5, 1, 3], `Ошибка теста filter(...)`)
    res = filterSelf([8, NaN, NaN, 5, undefined, 1, 3], (v) => (v === v) && (v !== undefined))
    deepStrictEqual(res, [8, 5, 1, 3], `Ошибка теста filterSelf(...)`)
  })

  it(`indexOf(...) lastIndexOf(...)`, () => {
    if (
      indexOf([NaN, NaN, 2], NaN, -2) !== 1 ||
      indexOf([NaN, NaN, 2], NaN, -5) !== 0
    ) {
      throw new Error(`Ошибка теста indexOf(...)`)
    }
    if (
      lastIndexOf([2, 1, 1, 2], 2, -2) !== 0 ||
      lastIndexOf([0], 1, 2) !== -1 ||
      lastIndexOf([0], 1) !== -1 ||
      lastIndexOf([0], 1, -2) !== -1
    ) {
      throw new Error(`Ошибка теста lastIndexOf(...)`)
    }
  })

  it(`intersection(...) intersectionSelf(...)`, () => {
    let res = intersection([1, 5, 2, 2, 3], [1, 4, 5, 2], [1, 3, 4, 2])
    deepStrictEqual(res, [1, 2], `Ошибка теста intersection(...)`)
    res = intersectionSelf([1, 5, 2, 2, 3], [1, 4, 5, 2], [1, 3, 4, 2])
    deepStrictEqual(res, [1, 2], `Ошибка теста intersectionSelf(...)`)
  })

  it(`startsWith(...)`, () => {
    const obj = {}
    const arrBase = /*   */[1, 'str', NaN, true, obj]
    const srchArray1 = /**/[1, 'str', NaN]
    const srchArray2 = /*          */[NaN, true, obj]
    const srchArray3 = /*   */['str', NaN, true]
    const srchArrayError = [1, 2]
    if (
      !startsWith(arrBase, srchArray1) ||
      startsWith(arrBase, srchArray1, 3) ||
      startsWith(arrBase, srchArray1, -4, true) ||
      !startsWith(arrBase, srchArray2, undefined, true) ||
      !startsWith(arrBase, srchArray3, 1) ||
      !startsWith(arrBase, srchArray3, -4) ||
      !startsWith(arrBase, srchArray3, -2, true) ||
      startsWith(arrBase, srchArray3, -1, true) ||
      startsWith(arrBase, srchArrayError) ||
      startsWith(arrBase, srchArrayError, 3)
    ) {
      throw new Error(`Ошибка теста startsWith(...)`)
    }
  })

  it(`union(...) unionSelf(...)`, () => {
    let res = union([1, 1, 2, 3], [1, 2, 5, 5, 8])
    deepStrictEqual(res, [1, 2, 3, 5, 8], `Ошибка теста union(...)`)
    res = unionSelf([1, 1, 2, 3], [1, 2, 5, 5, 8])
    deepStrictEqual(res, [1, 2, 3, 5, 8], `Ошибка теста unionSelf(...)`)
  })

  it(`uniq(...) uniqSelf(...)`, () => {
    let res = uniq([NaN, 2, NaN])
    deepStrictEqual(res, [NaN, 2], `Ошибка теста uniq(...)`)
    res = uniqSelf([NaN, 2, NaN], true)
    deepStrictEqual(res, [2, NaN], `Ошибка теста uniqSelf(...)`)
    res = uniq([NaN, 2, NaN], true)
    deepStrictEqual(res, [2, NaN], `Ошибка теста uniq(...)`)
    res = uniqSelf([NaN, 2, NaN])
    deepStrictEqual(res, [NaN, 2], `Ошибка теста uniqSelf(...)`)
  })

  it(`xor(...)`, () => {
    const res = xor([1, 2, 2], [4, 5], [1, 3, 4])
    deepStrictEqual(res, [2, 5, 3], `Ошибка теста xor(...)`)
  })

})
