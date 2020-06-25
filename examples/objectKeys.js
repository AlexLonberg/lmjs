/* objectKeys.js [ 30.12.2019 : 20:54:20 ] */
// EXAMPLE

import keys from 'lmjs/object/keys'

// Определим простое и символьное свойства
const to = {
  name: 'name',
  [Symbol()]: Symbol('symbol'),
}
// ... и два скрытых
Object.defineProperty(to, 'hidden', {
  enumerable: false,
  value: 'hidden'
})
Object.defineProperty(to, Symbol('hidden'), {
  enumerable: false,
  value: Symbol('hiddenSymbol')
})


// Для наглядности будевые аргументы указаны как имена 'hidden', 'symbol', 'keys'

console.log(keys(to, false, false, false))
// => []

console.log(keys(to)) // default
console.log(keys(to, false, false, 'keys'))
// => ["name"]

// !enumerable свойство Symbol тоже отображается
console.log(keys(to, false, 'symbol', false))
// => [Symbol(), Symbol(hidden)]

console.log(keys(to, false, 'symbol', 'keys'))
// => Array(3) ["name", Symbol(), Symbol(hidden)]

console.log(keys(to, 'hidden', false, false))
// => Array(1) ["hidden"]

console.log(keys(to, 'hidden', false, 'keys'))
console.log(keys(to, 'hidden'))
// => Array(2) ["name", "hidden"]

console.log(keys(to, 'hidden', 'symbol', false))
// => Array(3)["hidden", Symbol(), Symbol(hidden)]

console.log(keys(to, 'hidden', 'symbol', 'keys'))
console.log(keys(to, 'hidden', 'symbol'))
// => Array(4)["name", "hidden", Symbol(), Symbol(hidden)]
