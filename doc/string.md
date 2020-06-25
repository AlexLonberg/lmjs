
# String

* [is...(any)](#isany)
* [cleanSpace(string)](#cleanspacestring)
* [randomGenerator(pattern, length)](#randomgeneratorpattern-length)
* [phMatch(first, second, trim, flags)](#phmatchfirst-second-trim-flags)

## is...(any)

Все варианты `is[...](any)`.  
См. [_string/index.js_](../string/index.js)

## cleanSpace(string)

См. [_string/cleanSpace.js_](../string/cleanSpace.js)

## randomGenerator(pattern, length)

См. [_string/randomGenerator.js_](../string/randomGenerator.js)

## phMatch(first, second, trim, flags)

Поиск вхождений заполнителей в строке вида `"example ${{ placeholder }} string"`.

* **first** {string} - Строка вида `"${{"`.
* **second** {string} - Строка вида `"}}"`.
* **trim=false** {boolean} - Установка в `true` применит очистку `str.trim()` к каждой переменной `placeholder`.
* **flags="g"** {string} - Флаги регулярного выражения.

Возвращает функцию `match(string)`, единственным параметром которой является строка с заполнителями.

Вызов `match(string)`, возвратит объект, где:

* **_** {array} - Подготовленный массив, где элементы `placeholder` будут инициализированны пустой строкой `""`.
* **string** {string} - Оригинальная строка.
* **total** {string}  - Общее кол-во совпадений.
* **matches** {array} - Массив объектов: 
  + **match**       - копия подстроки вида `"${{ user }}"`
  + **ph**          - имя заполнителя, если был установлен флаг `trim=true`, крайние пробельные символы будут обрезаны -> `"user"`
  + **position**    - указывает на индекс массива `_`
  + **set(string)** - метод установки значений
* **join** {function} - Аналог метода `Array.join()`, не принимающий аргументов.
* **clear** {function} - Функция очистки подстановок, после обхода `matches`.

Для получения результирующей строки, достаточно обойти `matches`, после чего вызвать `join()`.

```js
import phMatch from 'lmjs/string/phMatch'

const string = 'site.com/${{ user }}/${{ post }}/?123'
const match = phMatch('${{', '}}', true)
const replacer = match(string)
// => { 
//  _,         ['site.com/', '', '/', '', '/?123']
//  string,    Оригинальная строка
//  total,     2
//  matches,   [ { match:"${{ user }}", ph:"user", position:1, set:(v)=>{} }, ... ]
//  join       function Array.join()
//  clear      function
//}

console.log(replacer.join())
// => "site.com///?123"

variables = [
  { user: 'Tom', post: 'how+to' },
  { user: 'Yan' }
]
// Объект `matches` можно использовать многократно
for (let i = 0; i < variables.length; ++i) {
  for (let { ph, set } of replacer.matches) {
    if(variables[i][ph]){
      set(variables[i][ph])
    }
  }
  console.log(replacer.join())
}
// => "site.com/Tom/how+to/?123"
// => "site.com/Yan/how+to/?123"

// Очистка всех подстановок
replacer.clear()
console.log(replacer.join())
// => "site.com///?123"
```
