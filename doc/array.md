
# Array

См. [_array/index.js_](../array/index.js)

Функции обработки массивов используют, либо `sameValueZero = (a, b) => (a === b) || (isNaN(a) && isNaN(b))`,
либо `Array.prototype.includes`, которая поддерживает `NaN`.

Пример:

```js
// Стандартный метод использует ===
[NaN].indexOf(NaN)
// => -1

import indexOf from 'lmjs/array/indexOf'
indexOf([NaN], NaN)
// => 0
```

Доступ:

```js
// array.isEqual(arr1, arr2)
import { array } from 'lmjs'
import { countDuplicates, ... } from 'lmjs/array'
import union from 'lmjs/array/union'
```

При операциях с массивами, инициализация с пустым элементом в конце, может дать неожиданный результат.

```js
const arr1 = new Array(3)
const arr2 = [undefined, undefined, undefined]
const arr3 = [, , undefined]
// последний пустой элемент, после запятой, не войдет в массив
const arr4 = [undefined, , ]

// length: 3, typeof[2]: undefined
// length: 3, typeof[2]: undefined
// length: 3, typeof[2]: undefined
// length: 2, typeof[2]: undefined !!!
```
