/* extractLastArgs.js [ 31.01.2020 : 07:10:54 ] */

import { isFunction, isObject } from 'lmjs'
import { extractLastArgs } from 'lmjs/utils'

// Условная функция: foo(...sources:{}, function, options:{}, ...boolean)
//  
// Задача: получить аргументы в порядке
// * sources - ... любое количество обязательных объектов
//             далее идут необязательные параметры
// * filter  - функция или undefined
// * options - объект опций или undefined
// * any     - ... любое количество флагов или undefined

// Поиск границы с последнего элемента(по умолчанию) невозможен
//   ... последовательности эквивалентны
//   options   {object} <- any   {undefined}
//   sources[i]{object} <- filter{undefined}

// В данно случае применяем reverse === true, для поиска с первого элемента

function foo(...args) {
  let rest = [
    // поиск границы между sources и необязательными параметрами
    (v, i, a) => (
      // маркером границы будет `[..., Object, | !Object, ...]`
      (i > 0 && isObject(a[i - 1]) && !isObject(v)) ?
        // если ганица найдена, установим верное значение аргумента
        [true, isFunction(v) ? v : null] :
        // если нет, можно веруть пустой массив не устанавливая [false]
        [] // или [false]
    ),
    // следующим аргументом ожидается объект, если нет вернем пустой
    (v) => (isObject(v) ? [true, v] : [true, {}]),
    // остальные аргументы приведем к boolean
    (v) => ([true, !!v])
  ]
  // объектов sources должно быть минимум один, можно начать поиск с первого элемента
  //  и установим reverse === true
  let restArgs = extractLastArgs(args, rest, 0, false)

  // при успешном извлечении массив args будет изменен
  console.log('args => ', args)
  console.log('restArgs => ', restArgs)
}


foo()
// args =>  []
// restArgs =>  []
foo({})
// args =>  [ {} ]
// restArgs =>  []
foo({}, {})
// args =>  [ {}, {} ]
// restArgs =>  []
foo({}, {}, {}, {}, {}, null, { param: 8 }, 'i true', false, 1)
// args =>  [ {}, {}, {}, {}, {} ]
// restArgs =>  [ null, { param: 8 }, true, false, true ]
foo({}, {}, {}, () => '...', null, 'i true', false, 0)
// args =>  [ {}, {}, {} ]
// restArgs =>  [ [Function], {}, true, false, false ]

// Ошибочный вариант передачи аргументов, без обязательного sources
foo(() => '...', null, 'i true', false, 0)
// args =>  [ [Function], null, 'i true', false, 0 ]
// restArgs =>  []
