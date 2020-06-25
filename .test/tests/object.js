/* object.js [ 02.05.2020 : 21:13:05 ] */

import { strictEqual, deepStrictEqual } from 'assert'
import { isInt, isString, isDeepEqualAsJson } from 'lmjs/is'
import {
  // isObject,
  easyCopy,
  getDeepProperty,
  hasDeepProperty,
  hasProperty,
  keyPicker,
  keys
} from 'lmjs/object'

const testSymbol = Symbol()

const testObjectEnum = {
  a: null,
  b: undefined,
  c: NaN,
  d: [1, {}, []],
  x: {},
  r: /abx/i
}
testObjectEnum.d.push(testObjectEnum)

const testObject = Object.assign({}, testObjectEnum)
testObject[testSymbol] = 'stringSymbol'
testObject.x = { [testSymbol]: 5 }
Object.defineProperty(testObject, 'hidden', {
  enumerable: false,
  value: 'hidden'
})

describe(`test object`, () => {

  it(`hasProperty(...)`, () => {
    let mess = `Ошибка теста hasProperty(...)`
    strictEqual(hasProperty(testObject, 'errorProps'), false, mess)
    strictEqual(hasProperty(testObject, testSymbol, (v) => v === testObject[testSymbol]), true, mess)
  })

  it(`hasDeepProperty(...) getDeepProperty(...)`, () => {
    let messh = `Ошибка теста hasDeepProperty(...)`
    let messg = `Ошибка теста getDeepProperty(...)`
    const path = 'd.0'
    const pathArr = ['x', testSymbol]
    strictEqual(hasDeepProperty(testObject, path), true)
    strictEqual(hasDeepProperty(testObject, 'errorPath'), false, messh)
    strictEqual(hasDeepProperty(testObject, pathArr, isString), false, messh)
    strictEqual(hasDeepProperty(testObject, pathArr, isInt), true, messh)
    //
    strictEqual(getDeepProperty(testObject, path), 1, messg)
    strictEqual(getDeepProperty(testObject, pathArr), 5, messg)
    strictEqual(getDeepProperty(testObject, 'errorPath'), undefined, messg)
    strictEqual(getDeepProperty(testObject, Symbol()), undefined, messg)
    const stub = Symbol()
    strictEqual(getDeepProperty(testObject, 'error.Path', stub), stub, messg)
  })

  it(`keyPicker(...) keys(...)`, () => {
    const mess = `Ошибка теста keys(...)`
    const okeys = ['a', 'b', 'c', 'd', 'x', 'r']
    let ks = keys(testObject, false, false, false)
    deepStrictEqual(ks, [], mess)
    ks = keys(testObject, true, false, false)
    deepStrictEqual(ks, ['hidden'], mess)
    ks = keys(testObject, true, true, false)
    deepStrictEqual(ks, ['hidden', testSymbol], mess)
    ks = keys(testObject, true, true, true)
    deepStrictEqual(ks, [...okeys, 'hidden', testSymbol], mess)
    ks = keys(testObject, false, true, false)
    deepStrictEqual(ks, [testSymbol], mess)
    ks = keys(testObject, false, true, true)
    deepStrictEqual(ks, [...okeys, testSymbol], mess)
    ks = keys(testObject/*, false, false, true*/) // default
    deepStrictEqual(ks, [...okeys], mess)
    ks = keys(testObject, true, false, true)
    deepStrictEqual(ks, [...okeys, 'hidden'], mess)
    // Для покрытия
    keyPicker()
  })

  it(`easyCopy(...)`, () => {
    let mess = `Ошибка теста easyCopy(...)`
    let on = Object.create(null)
    on.nd = 1
    deepStrictEqual(easyCopy(on), { nd: 1 }, mess)
    // Скрытые свойства и символы не копируются
    // d: [ 1, {}, [], [Circular] ]
    const copy = easyCopy(testObjectEnum)
    deepStrictEqual(copy, testObjectEnum, mess)
    // Проверка своим isDeepEqualAsJson
    if (!isDeepEqualAsJson(copy, testObjectEnum)) {
      throw new Error(mess + ` + isDeepEqualAsJson`)
    }
  })

})
