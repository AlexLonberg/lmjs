/* phMatch.js [ 01.02.2020 : 03:53:55 ] */

import { StringReplace, StringSlice } from '../core/Prototypes.js'

/**
 * Поиск вхождений заполнителей в строке вида `"example ${{ placeholder }} string"`.
 * 
 * Возвращает функцию поиска `match(string)`.
 *   Вызов `match(string)` вернет объект с интерфейсом замены переменных. 
 * 
 * @memberof string
 * @param {string}         first Строка вида `"${{"`.
 * @param {string}        second Строка вида `"}}"`.
 * @param {boolean} [trim=false] Установка в `true` применит очистку `str.trim()` к каждой переменной placeholder.
 * @param {string}   [flags='g'] Флаги регулярного выражения. По умолчанию `"g"`. Менять это не стоит.
 * @returns {function}           Функция поиска вхождений ограничителей `first` и `second`.
 * @example
 * const variables = { user: 'Tom', post: 'how+to' }
 * const match = phMatch('${{', '}}', true)
 * const replacer = match('site.com/${{ user }}/${{ post }}/?123')
 * replacer.matches.forEach(({ ph, set }) => (set(variables[ph])))
 * console.log(replacer.join())
 * // => site.com/Tom/how+to/?123
 * 
 * @description
 * Полученная функция `match(string)` принимает аргументом строку, выполняет поиск и возвращает объект:
 *   * `_`       - массив строк подготовленных для замены, где placeholder инициализированны пустой строкой
 *   * `string`  - исходная строка
 *   * `total`   - кол-во найденных вхождений(в примере выше это 2)
 *   * `matches` - массив объектов вхождений с методом замены
 *   * `join()`  - `Array.prototype.join()` без аргументов, вызываем после установки всех переменных
 *   * `clear()` - функция очистки подстановок, после обхода matches
 * 
 * Свойство `matches` содержит объекты с методом установки переменной:
 *   * `match`    - "${{ user }}" вхождение
 *   * `ph`       - "user" placeholder(имя переменной)
 *   * `position` - только для справки, позиция в массиве `_`
 *   * `set`      - функция принимающая аргументом строку для замены всего вхождения
 */
function phMatch(first, second, trim = false, flags = 'g') {
  first = StringReplace.call(first, /[^a-z0-9]/ig, '\\$&')
  second = StringReplace.call(second, /[^a-z0-9]/ig, '\\$&')
  let reg = new RegExp(`(${first})(.*?)(${second})`, flags)

  return (string) => {
    reg.lastIndex = 0
    let _ = []
    let lastOffset = 0
    let matches = []
    // псевдо замена - используем просто метод replace
    StringReplace.call(string, reg,
      (match, position/*p1*/, ph/*p2*/, p3, offset) => (
        (position = _.push(StringSlice.call(string, lastOffset, offset), '') - 1),
        (lastOffset = offset + match.length),
        matches.push({
          match,
          ph: trim ? ph.trim() : ph,
          position,
          set: (v) => (_[position] = v)
        }))
    )
    _.push(StringSlice.call(string, lastOffset))
    return {
      _,
      string,
      total: matches.length,
      matches,
      join: () => _.join(''),
      clear: () => matches.forEach(({ position }) => (_[position] = ''))
    }
  }
}

export default phMatch
