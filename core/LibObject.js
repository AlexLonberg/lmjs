/* LibObject.js [ 28.05.2020 : 16:56:10 ] */

/**
 * Копия регулярного выражения.
 * 
 * @private
 * @memberof core
 * @param {RegExp} re
 * @returns {RegExp} копия RegExp
 */
function copyRegExp(re) {
  let { source, flags } = re
  return new RegExp(source, flags)
}

export {
  copyRegExp
}
