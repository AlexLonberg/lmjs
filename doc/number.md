
# Number

* [is...(any)](#isany)
* [toFixed(value, digits)](#tofixedvalue-digits)
* [randomInt(min, max)](#randomintmin-max)

```js
import { number } from 'lmjs'
import { isIntPositive, ... } from 'lmjs/number'
import randomInt from 'lmjs/number/randomInt.js'
```

## is...(any)

Все варианты `is[...](any)`.  
См. [_number/index.js_](../number/index.js)

## toFixed(value, digits)

Это отличается от поведения [number.toFixed()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed).

```js
Number.prototype.toFixed.call(3.55, 1)
// => "3.5"
toFixed(3.55, 1)
// => "3.6"
toFixed(3.555)
// => "3.56"
```

См. [_number/toFixed.js_](../number/toFixed.js)

## randomInt(min, max)

Возвращает случайное целое с необязательным аргументом исключений.

```js
randomInt(1, 3)
// => 1
```
См. [_number/randomInt.js_](../number/randomInt.js)
