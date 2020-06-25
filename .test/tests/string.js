/* string.js [ 01.05.2020 : 19:18:33 ] */

import { deepStrictEqual } from 'assert'

import {
  // isString,
  isEmpty,
  isAsInt,
  isAsIntNonnegative,
  isAsIntPositive,
  cleanSpace,
  phMatch,
  randomGenerator
} from 'lmjs/string'

describe(`test string`, () => {

  it(`isEmpty(' \\n ')`, () => {
    if (!isEmpty(' \n ')) {
      throw new Error(`Ошибка теста isEmpty(' \\n ')`)
    }
  })

  it(`isAsInt('-0123')`, () => {
    if (!isAsInt('-0123') || isAsInt('-0123', false)) {
      throw new Error(`Ошибка теста isAsInt('-0123')`)
    }
  })
  it(`isAsIntNonnegative(...)`, () => {
    if (!isAsIntNonnegative('0') || isAsIntNonnegative('-1str', false)) {
      throw new Error(`Ошибка теста isAsIntNonnegative(...)`)
    }
  })
  it(`isAsIntPositive(...)`, () => {
    const any = { '1': 5.8, '002': 'str', '2': 7.9, 'foo': [] }
    const ids = Object.keys(any)
      .filter((i) => isAsIntPositive(i, false))
      .reduce((a, v) => (a[v] = any[v], a), {})
    deepStrictEqual(ids, { 1: 5.8, 2: 7.9 }, `Ошибка теста isAsIntPositive(...)`)
    // Только для покрытия
    isAsIntPositive('1')
  })

  it(`cleanSpace(' asd \\n  so ')`, () => {
    if (cleanSpace(' asd \n  so ') !== 'asd so') {
      throw new Error(`Ошибка теста cleanSpace(' asd \\n  so ')`)
    }
  })

  it(`randomGenerator(...)`, () => {
    let str0 = randomGenerator('')()
    let str32 = randomGenerator('0-9-')()
    let str12 = randomGenerator('abcXYZ', 12)()
    // 11-69-0063461-1-1-00209357953-56
    // ZbZaZaaXcZXZ
    if (str0.length || !/^[0-9\-]{32}$/.test(str32) || !/^[abcXYZ]{12}$/i.test(str12)) {
      throw new Error(`Ошибка теста randomGenerator(...)`)
    }
  })

  it(`phMatch(...)`, () => {
    const string = 'site.com/${{ user }}/${{ post }}/?123'
    const match = phMatch('${{', '}}', true)
    const replacer = match(string)
    // Вызвать замену, можно несколько раз
    let v0 = replacer.join()
    let v1 = { user: 'Tom', post: 'how+to' }
    replacer.matches.forEach(({ ph, set }) => (v1[ph] && set(v1[ph])))
    v1 = replacer.join()
    let v2 = { user: 'Cat' }
    replacer.matches.forEach(({ ph, set }) => (v2[ph] && set(v2[ph])))
    v2 = replacer.join()
    // Очистка всех подстановок
    replacer.clear()
    let clean = replacer.join()
    if (
      v0 !== 'site.com///?123' ||
      v1 !== 'site.com/Tom/how+to/?123' ||
      v2 !== 'site.com/Cat/how+to/?123' ||
      clean !== 'site.com///?123'
    ) {
      throw new Error(`Ошибка теста phMatch(...)`)
    }
    // Только для покрытия
    const matchCover = phMatch('${{', '}}')
    matchCover(string)
  })

})
