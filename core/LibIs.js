/* LibIs.js [ 27.12.2019 : 07:01:02 ] */

const NumberIsNaN = Number.isNaN
const NumberIsInteger = Number.isInteger
const NumberIsFinite = Number.isFinite
const ArrayIsArray = Array.isArray

/** 
 * @memberof .
 * @returns {boolean} (typeof any === 'undefined')
 */
export const isUndefined = (any) => (typeof any === 'undefined')

/** 
 * @memberof .
 * @returns {boolean} (any === null)
 */
export const isNull = (any) => (any === null)

/** 
 * @memberof .
 * @returns {boolean} (typeof any === 'boolean')
 */
export const isBoolean = (any) => (typeof any === 'boolean')

/** 
 * @memberof .
 * @returns {boolean} (typeof any === 'symbol') 
 */
export const isSymbol = (any) => (typeof any === 'symbol')

/**
 * Является ли значение примитивным(не объектом или не функцией).
 * @memberof .
 * @param {*} any Тестируемое значение
 * @returns {boolean} 
 * @example
 * isPrimitive(1)
 * // => true
 * isPrimitive(null)
 * // => true
 * isPrimitive(()=>null)
 * // => false
 */
export const isPrimitive = (any) => ((typeof any !== 'object' && typeof any !== 'function') || any === null)

/** 
 * @memberof .|number
 * @returns {boolean} Number.isNaN(any)
 * @example
 * // Вот так бывает
 * let nan = NaN
 * nan !== nan
 * // => true
 */
export const isNaN = NumberIsNaN

/** 
 * Замечание: Тест не исключает NaN и Infinity.
 * @memberof .|number
 * @returns {boolean} (typeof any === 'number')
*/
export const isNumber = (any) => (typeof any === 'number')

/** 
 * Это предпочтительнее чем isNumber(any)
 * @memberof .|number
 * @returns {boolean} Number.isFinite(any)
*/
export const isFinite = NumberIsFinite

/**
 * Является ли значение целым числом.
 * @memberof .|number
 * @param {*}    any  Тестируемое значение
 * @returns {boolean} Number.isInteger(any)
 * @example
 * isInt(-8)
 * // => true
 */
export const isInt = NumberIsInteger

/** 
 * 123n
 * @memberof .|number
 * @returns {boolean} (typeof any === 'bigint')
 */
export const isBigint = (any) => (typeof any === 'bigint')

/**
 * Является ли значение строкой.
 * @memberof .|string
 * @param {*}     any Тестируемое значение.
 * @returns {boolean} (typeof any === 'string')
 * @example
 * isString(new String('str'))
 * // => false
 */
export const isString = (any) => (typeof any === 'string')

/**
 * Является ли значение объектом. Это может быть и массив.
 * @memberof .|object
 * @param {*}    any Проверяемое значение
 * @returns {boolean} ((typeof any === 'object') && (any !== null))
 * @example
 * isObject(["is array"])
 * // => true
 */
export const isObject = (any) => ((typeof any === 'object') && (any !== null))

/**
 * Является ли значение массивом.
 * @memberof .|array
 * @param {*} any
 * @returns {boolean} Array.isArray(any)
 * @example
 * isArray({1:123,2:456})
 * // => false
 */
export const isArray = ArrayIsArray

/** 
 * Является ли аргумент функцией.
 * @memberof .
 * @returns {boolean} (typeof any === 'function')
 */
export const isFunction = (any) => (typeof any === 'function')

/**
 * Является ли значение целым числом меньше нуля.
 * @memberof .|number
 * @param {*} any Тестируемое значение
 * @returns {boolean} 
 * @example
 * isIntNegative(0)
 * // => false
 */
export const isIntNegative = (any) => (NumberIsInteger(any) && (any < 0))

/**
 * Является ли значение целым числом большим или равным нулю.
 * @memberof .|number
 * @param {*} any Тестируемое значение
 * @returns {boolean} 
 * @example
 * isIntNonnegative(0)
 * // => true
 */
export const isIntNonnegative = (any) => (NumberIsInteger(any) && (any >= 0))

/**
 * Является ли значение целым числом больше нуля.
 * @memberof .|number
 * @param {*} any Тестируемое значение
 * @returns {boolean} 
 * @example
 * isIntPositive("str")
 * // => false
 * isIntPositive(0)
 * // => false
 * isIntPositive(5)
 * // => true
 */
export const isIntPositive = (any) => (NumberIsInteger(any) && (any > 0))

/** 
 * Алгоритм сравнения sameValueZero
 * @memberof .
 * @param {*} a
 * @param {*} b
 * @returns {boolean} (a === b || (Number.isNaN(a) && Number.isNaN(b)))
 */
export const sameValueZero = (a, b) => ((a === b) || (NumberIsNaN(a) && NumberIsNaN(b)))
