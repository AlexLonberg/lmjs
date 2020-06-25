/* rangeCalculator.js [ 05.02.2020 : 22:49:34 ] */

/**
 * Возвращает функцию расчета текущего значения выходного диапазона.
 * 
 * @memberof utils
 * @param {number}          begin Начальная граница входного диапазона.
 * @param {number}            end Конечная граница входного диапазона.
 * @param {number} [beginRange=0] Начальная граница выходного диапазона.
 * @param {number} [endRange=100] Конечная граница выходного диапазона.
 * @returns {number} Функция принимающая аргументом текущее значение входного диапазона `begin <= value <= end`.
 * @example
 * const calculate = rangeCalculator(0, 12)
 * calculate(3)
 * // => 25
 * rangeCalculator(0, 12, 50)(6)
 * // => 75
 */
function rangeCalculator(begin, end, beginRange = 0, endRange = 100) {
  const inputRange = end - begin
  const outRange = endRange - beginRange
  return /*calculate*/(current) => (
    beginRange + (outRange / (inputRange / (current - begin)))
  )
}

export default rangeCalculator
