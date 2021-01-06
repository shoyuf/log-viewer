import ansi from 'ansicolor'
ansi.rgb = {
  black: [0, 0, 0],
  darkGray: [129, 131, 131],
  lightGray: [242, 242, 242],
  white: [203, 204, 205],

  red: [194, 54, 33],
  lightRed: [252, 57, 31],

  green: [37, 188, 36],
  lightGreen: [49, 231, 34],

  yellow: [173, 173, 39],
  lightYellow: [234, 236, 35],

  blue: [73, 46, 225],
  lightBlue: [88, 51, 255],

  magenta: [211, 56, 211],
  lightMagenta: [180, 0, 158],

  cyan: [51, 187, 200],
  lightCyan: [97, 214, 214]
}

const ENCODED_NEWLINE = /\r\n|\r|\n(?!\u0008)/

// RegExp reference:
// http://jafrog.com/2013/11/23/colors-in-terminal.html
// https://en.wikipedia.org/wiki/ANSI_escape_code

const split2Lines = str => str.split(ENCODED_NEWLINE)

export {ansi, split2Lines}

/**
 * @typedef {Object} ParsedSpan
 * @property {string} text
 * @property {string} css
 * @property {boolean} [italic]
 * @property {boolean} [bold]
 * @property {string} [color]
 * @property {string} [bgColor]
 */

/**
 * @param {string} log
 * @returns {ParsedSpan[]}
 */
export default log => {
  if (!log) return []
  const stringLines = split2Lines(log).filter(e => e)
  return stringLines.map(line => ansi.parse(line).spans)
}
