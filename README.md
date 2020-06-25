
# lib JS

    npm i lmjs

* [Варианты](is/index.js) `isInt, isObject, ...` 
* [Number](./doc/number.md)
* [String](./doc/string.md)
* [Object](./doc/object.md)
* [Array](./doc/array.md)
* [Utils](./doc/utils.md)
* [Stylecase](./doc/stylecase.md)

## Доступ

```js
// Все варианты is[...], включая sameValueZero
import * as lmjs from 'lmjs'

// В том числе в 'lmjs' находятся общие ссылки
//   number.isInt(), array.diff() и т.д.
import { isInt, ..., number, string, object, array, classes, utils, stylecase } from 'lmjs'

// Получить несколько однотипных функций
import { isInt, ..., isEqualEntries } from 'lmjs/is'
import { union, uniq, ... } from 'lmjs/array'
```
