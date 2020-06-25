/* asyncPause.js [ 25.05.2020 : 18:57:03 ] */

/**
 * Асинхронная пауза.
 * 
 * @memberof utils
 * @param {number} [time=0] Минимальное время задержки.
 *                          По дефолту см. [developer.mozilla setTimeout](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout#Timeouts_throttled_to_%E2%89%A5_4ms)
 * @example
 * while (...) {
 *   await asyncPause(5000)
 *   // пауза 5сек
 * }
 */
function asyncPause(time = 0) {
  return new Promise((s) => {
    setTimeout(s, time)
  })
}

export default asyncPause
