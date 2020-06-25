/* stylecase.js [ 02.05.2020 : 00:59:09 ] */

// Только покрытие, есть пример examples/stylecase.js

import * as stylecase from 'lmjs/stylecase'

const testString = ' pascal$any$Case \n'
const testStringUpper = '$ALLUPPER'
const testStringLower = 'dot_lower'

describe(`stylecase coverage`, () => {
  for (let [name, sc] of Object.entries(stylecase)) {
    it(name, () => {
      sc(testString)
      sc(testStringUpper)
      sc(testStringLower)
    })
  }
})
