/* onceCall.js [ 08.06.2020 : 02:42:57 ] */

/**
 * Создает одноразовую функцию.
 * 
 * @memberof utils
 * @param {function} origin Функция, которая будет вызвана единожды.
 * @param {*}         [res] Необязательное значение возвращаемое последующими вызовами.
 * @returns {function}      Функция.
 * @example
 * const pow = onceCall((x, y) => Math.pow(x, y))
 * pow(2, 3)
 * // => 8
 * pow(2, 3)
 * // => undefined
 */
function onceCall(origin, res) {
  let _ = (...args) => {
    _ = () => res
    return origin(...args)
  }
  return (...args) => {
    return _(...args)
  }
}

export default onceCall
