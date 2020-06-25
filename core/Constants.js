/* Constants.js [ 27.12.2019 : 19:02:26 ] */

// Константные значение

export const minMaxInteger = { min: Number.MIN_SAFE_INTEGER, max: Number.MAX_SAFE_INTEGER }

// ВАЖНО: RegExp испольующие флаги "g"||"y" изменяют lastIndex
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/lastIndex
// Все подобные конструкции определяются как новые выражения в соответствующих методах
// Ниже перечислены используемые выражения
// * /[\s\uFEFF\xA0]+/g         - поиск пробельных символов
// * /^[^$a-z]+|[^$a-z0-9]+$/ig - невалидные символы начала и конца для StringStylecase
// Просмотр вперед не поддерживается некоторыми средами - не используем

export const regExpAllSpace = /[\s\uFEFF\xA0]+/
export const regExpExcludeAllSpace = /[^\s\uFEFF\xA0]+/

export const regExpOnlyInt = /^-?(0|([1-9][0-9]*))$/
export const regExpOnlyIntZero = /^-?[0-9]+$/
export const regExpOnlyIntNonnegative = /^(0|([1-9][0-9]*))$/
export const regExpOnlyIntNonnegativeZero = /^[0-9]+$/
export const regExpOnlyIntPositive = /^[1-9][0-9]*$/
export const regExpDashCharacterIn = /.-./
export const regExpDashCharacter = /-/

// Для Stylecase
export const regExpForCaseFirstBreak = /^\$+./
export const regExpSplitForCaseNotLetter = /[^$a-z0-9]+/i
export const regExpTestForCaseAllUpper = /^[^a-z]+$/
