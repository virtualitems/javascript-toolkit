/**
 * @param {string} str
 * @param {CSSStyleSheetInit} options
 * @returns {CSSStyleSheet}
 */
export function css(str, options) {
    const stylesheet = new CSSStyleSheet(options)
    stylesheet.replace(str)
    return stylesheet
}

/**
 * @param {string} str
 * @returns {DocumentFragment}
 */
export function html(str) {
    const range = document.createRange()
    const fragment = range.createContextualFragment(str)
    return fragment
}
