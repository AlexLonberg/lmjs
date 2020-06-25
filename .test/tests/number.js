/* number.js [ 01.05.2020 : 22:13:56 ] */

// Варианты is[...] проверены в test/is
import { randomInt, toFixed, isFinite } from 'lmjs/number'

describe(`test number`, () => {

  it(`randomInt(1, 3)`, () => {
    let v = randomInt(1, 3)
    if (v < 1 || v > 3 || !isFinite(randomInt())) {
      throw new Error(`Ошибка теста randomInt(1, 3)`)
    }
  })

  it(`toFixed(3.55, 1) || toFixed(3.555)`, () => {
    if (toFixed(3.55, 1) !== '3.6' || toFixed(3.555) !== '3.56') {
      throw new Error(`Ошибка теста toFixed(3.55, 1) || toFixed(3.555)`)
    }
  })

})
