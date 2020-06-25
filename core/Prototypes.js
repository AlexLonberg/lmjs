/* Prototypes.js [ 27.05.2020 : 21:35:33 ] */

// Для предотвращения дублей, используем импорт прототипов только их этиого файла.

export const ObjectHasOwnProperty = Object.prototype.hasOwnProperty
export const ObjectToString = Object.prototype.toString

export const NumberToFixed = Number.prototype.toFixed

export const StringTrim = String.prototype.trim
export const StringSlice = String.prototype.slice
export const StringCharAt = String.prototype.charAt
export const StringReplace = String.prototype.replace
export const StringSplit = String.prototype.split
export const StringMatch = String.prototype.match

export const RegExpToString = RegExp.prototype.toString

export const ArraySlice = Array.prototype.slice
export const ArraySplice = Array.prototype.splice
export const ArrayPush = Array.prototype.push
export const ArrayShift = Array.prototype.shift
export const ArrayIncludes = Array.prototype.includes
export const ArrayForEach = Array.prototype.forEach
export const ArrayFilter = Array.prototype.filter
export const ArrayMap = Array.prototype.map
