/* utils.js [ 02.05.2020 : 08:20:56 ] */

import { strictEqual, deepStrictEqual } from 'assert'
import { isFunction, isNaN } from 'lmjs/is'
import {
  extractLastArgs,
  rangeCalculator,
  asyncPause,
  onceCall
} from 'lmjs/utils'


describe(`test utils`, () => {

  it(`rangeCalculator(...)`, () => {
    const calculate = rangeCalculator(0, 12)
    strictEqual(calculate(3), 25, `Ошибка теста rangeCalculator(...)`)
  })

  it(`extractLastArgs(...)`, () => {
    const mess = 'Ошибка теста extractLastArgs(...)'
    const args = [1, 2, 3]
    const h = [() => null, true, true]
    let exampleArgs = [...args, ...h]
    const filters = [
      (v) => isFunction(v) ? [true, v] : [],
      (v) => [true, !!v],
      (v) => [true, !!v] // Для cover
    ]
    let exampleResult = extractLastArgs(exampleArgs, filters)
    deepStrictEqual(exampleArgs, args, ``)
    deepStrictEqual(exampleResult, h, mess)
    exampleArgs = [...args, ...h]
    exampleResult = extractLastArgs(exampleArgs, filters, -3, true)
    deepStrictEqual(exampleArgs, args, mess)
    deepStrictEqual(exampleResult, h, mess)
    // !Array
    exampleArgs = [...args, ...h]
    exampleResult = extractLastArgs(exampleArgs, filters[0])
    deepStrictEqual(exampleArgs, args, mess)
    strictEqual(exampleResult[0], h[0], mess)
  })

  it(`onceCall(...)`, () => {
    const mess = `Ошибка теста onceCall(...)`
    const pow = onceCall((x, y) => Math.pow(x, y), NaN)
    strictEqual(pow(2, 3), 8, mess)
    if (!isNaN(pow(2, 3))) {
      throw new Error(mess)
    }
  })

  it(`async onceCall(...)`, async () => {
    const mess = `Ошибка теста async onceCall(...)`
    const pow = onceCall(async (x, y) => Math.pow(x, y), NaN)
    let res1 = await pow(2, 3)
    strictEqual(res1, 8, mess)
    let res2 = await pow(2, 3)
    if (!isNaN(res2)) {
      throw new Error(mess)
    }
  })

  it(`async asyncPause(...)`, async () => {
    const mess = `Ошибка теста async asyncPause(...)`
    const start = Date.now()
    const time = 500
    const count = 2
    let i = count
    while (i--) {
      await asyncPause(time)
    }
    if (Date.now() < (start + time * count)) {
      throw new Error(mess)
    }
  })

})
