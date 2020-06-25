/* stylecase.js [ 28.01.2020 : 18:56:28 ] */
// EXAMPLE

import * as stylecase from 'lmjs/stylecase'

const exampleString = [
  'lowerstring',
  'UPPERSTRING',
  'camelCase',
  'PascalCase',
  'kebab-case',
  'snake_case',
  'dot.case',
  'UPPER-KEBAB-CASE',
  'UPPER_SNAKE_CASE',
  'UPPER.DOT.CASE',
  '$PascalCase',
  '$pascal$any$Case',
  '',
  '123PascalCase',
  '$Any$CASE89',
  '$UPPER$CASE',
  ' jast @- \n LIKE #$ _ . This ',
  '@jastLIKE-This'
]

void function () {
  let counter = 0
  Object.keys(stylecase).forEach((sc) => {
    console.log(++counter + ': ' + sc + ':')
    for (let str of exampleString) {
      console.log(`before: "${str}"`, '=>', `after: "${stylecase[sc](str)}"`)
    }
  })
}()


// [1] Обычное поведение функций

// camelCase
// Ведущие цифры удаляются
// before: "123PascalCase"    => after: "pascalCase"
// before: "UPPER_SNAKE_CASE" => after: "upperSnakeCase"

// dotCase
// before: "$PascalCase" => after: "$pascal.case"

// kebabCase
// before: "PascalCase" => after: "pascalCase"

// pascalCase
// before: "UPPERSTRING" => after: "Upperstring"
// before: "dot.case"    => after: "DotCase"

// snakeCase
// before: "123PascalCase" => after: "pascal_case"


// [2] Некоторые результаты с $ могут показаться неожиданными

// dotCase
// В этой строке(и подобных) разделителем является верхний регистр
// before: "$Any$CASE89" => after: "$any.$c.a.s.e89"

// pascalCase
// Каждая буква верхнего регистра считается отдельным словом
// before: "$Any$CASE89" => after: "$Any$CASE89"
// Если в строке не содержиться нижнего регистра, она определяется как одно слово
// before: "$UPPER$CASE" => after: "$Upper$case"
// Символ $ считается разделителем, только если за ним верхний регистр
// before: "$pascal$any$Case" => after: "$Pascal$any$Case"

// snakeCase
// before: "$pascal$any$Case" => after: "$pascal$any_$case"

// firstUpperCase, firstLocaleUpperCase и titleCase
// Эти функции не предназначены для идентификаторов переменных,
//   и приводят к верхнему регистру любой первый символ
// before: "$Any$CASE89" => after: "$any$case89"

// sentenceCase
// Очищает строку от пробельных символов 
//   и приводит каждый первый символ слова в верхний регистр
// before: " jast @- \n LIKE #$ _ . This " => after: "Jast @- Like #$ _ . This"
