
# Utils

- [extractLastArgs(args, filters, fromIndex, reverse)](#extractlastargsargs-filters-fromindex-reverse)
- [rangeCalculator(begin, end, beginRange, endRange)](#rangecalculatorbegin-end-beginrange-endrange)
- [onceCall(...any)](#oncecallany)
- [asyncPause(time)](#asyncpausetime)

## extractLastArgs(args, filters, fromIndex, reverse)

См. [_utils/extractLastArgs.js_](../utils/extractLastArgs.js)

Извлекает последние аргументы в функциях, использующих [rest параметры](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters).  
В случае успешного извлечения аргументов, изменяется args.length - именно так и надо.  
Возвращается массив последних аргументов, с извлечением этих элементов из `args`. При неудаче вернется пустой массив.

См. пример [_examples/extractLastArgs.js_](./../examples/extractLastArgs.js)

## rangeCalculator(begin, end, beginRange, endRange)

См. [_utils/rangeCalculator.js_](../utils/rangeCalculator.js)

## onceCall(...any)

См. [_utils/onceCall.js_](../utils/onceCall.js)

## asyncPause(time)

См. [_utils/asyncPause.js_](../utils/asyncPause.js)
