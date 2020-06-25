/* is.js [ 01.05.2020 : 21:30:59 ] */

import *
  // { 
  //   isUndefined, 
  //   isNull, 
  //   isBoolean,
  //   isSymbol,
  //   isPrimitive,
  //   isNaN,
  //   isNumber,
  //   isFinite,
  //   isBigint,
  //   isString,
  //   isObject,
  //   isArray,
  //   isFunction,
  //   isIntNegative,
  //   isIntNonnegative,
  //   isIntPositive,
  //   //
  //   sameValueZero,
  //   isEqualEntriesWith,
  //   isEqualEntries,
  //   isDeepEqualAsJson
  //  } 
  as lib from 'lmjs/is'

const tests = [
  // function | true | false
  ['isUndefined', undefined, null],
  ['isNull', null, 0],
  ['isBoolean', true, null],
  ['isSymbol', Symbol(), {}],
  ['isPrimitive', 1, () => null],
  ['isPrimitive', 'str', new String()],
  ['isPrimitive', null, {}],
  ['isPrimitive', Symbol(), Object.create(null)],
  ['isNaN', NaN, undefined],
  ['isNumber', Infinity, new Number(5)],
  ['isFinite', 999.999, Infinity],
  // Закоментить при проверке в IE11
  // ['isBigint', 8n, 8],
  ['isString', 'str', new String('str')],
  ['isObject', [], null],
  ['isArray', [], {}],
  ['isFunction', () => null,],
  ['isIntNegative', -1, 0],
  ['isIntNonnegative', 0, -1],
  ['isIntPositive', 1, '1']
]

describe(`test is[...]`, () => {

  for (let [name, s, e] of tests) {
    it(name, () => {
      if (!lib[name](s)) {
        throw new Error(`Ошибка теста ${name}(${s})`)
      }
      if (lib[name](e)) {
        throw new Error(`Ошибка теста !${name}(${s})`)
      }
    })
  }

  it(`sameValueZero(NaN, NaN)`, () => {
    if (!lib.sameValueZero(NaN, NaN)) {
      throw new Error(`Ошибка теста sameValueZero(NaN, NaN)`)
    }
    if (lib.sameValueZero(NaN, undefined)) {
      throw new Error(`Ошибка теста sameValueZero(NaN, undefined)`)
    }
  })

  it(`isEqualEntriesWith and isEqualEntries`, () => {
    const mess = `Ошибка теста isEqualEntries(pv1, pv2, depth)`
    const id = Symbol('id')
    const obj = { a: null }
    let entries1 = [[id, 1], [obj, 2]]
    let entries2 = [[obj, 2], [id, 1]]
    // Не умеет сравнивать неупорядоченные массивы
    if (!lib.isEqualEntries(entries1, entries2)) {
      throw new Error(mess)
    }
    entries1.forEach((a) => (a.push(NaN)))
    if (lib.isEqualEntries(entries1, entries2, 2)) {
      throw new Error(mess)
    }
    entries2.forEach((a) => (a.splice(1, 0, NaN)))
    if (!lib.isEqualEntries(entries1, entries2, 2)) {
      throw new Error(mess)
    }
    entries1.push([1, 2, 3])
    if (lib.isEqualEntries(entries1, entries2, 2)) {
      throw new Error(mess)
    }
    // Нет смысла, потому как перекидывает isEqualEntriesWithComparator
    if (lib.isEqualEntriesWith(entries1, entries2, (v1, v2) => sameValueZero(v1[1], v2[1]))) {
      throw new Error(mess)
    }
  })

  it(`isDeepEqualAsJson`, () => {
    const mess = `Ошибка теста isDeepEqualAsJson(obj1, obj2)`
    const foo = Symbol()
    const bar = () => null
    const obj1 = {
      a: new RegExp('abc'), b: { arr: [1, 'str', foo] }, c: bar
    }
    const obj2 = {
      a: new RegExp('abc'), b: { arr: [1, 'str', foo] }, c: bar
    }
    if (!lib.isDeepEqualAsJson(obj1, obj2)) {
      throw new Error(mess)
    }
    obj1.b.arr.push(obj1)
    if (lib.isDeepEqualAsJson(obj1, obj2)) {
      throw new Error(mess)
    }
    obj2.b.arr.push(obj2)
    if (!lib.isDeepEqualAsJson(obj1, obj2)) {
      throw new Error(mess)
    }
    // для покрытия 
    obj1.b.arr.pop()
    obj1.b.arr.push([])
    if (lib.isDeepEqualAsJson(obj1, obj2)) {
      throw new Error(mess)
    }
  })

})
