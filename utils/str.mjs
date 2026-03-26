/* Control characters */
export const NUL = 0x00 // \0 - null character
export const BEL = 0x07 // \a - alert bell
export const BSP = 0x08 // \b - backspace
export const ESC = 0x1b // \e - escape
export const FPB = 0x0c // \f - formfeed page break
export const LFD = 0x0a // \n - line feed
export const CRR = 0x0d // \r - carriage return
export const HTB = 0x09 // \t - horizontal tab
export const VTB = 0x0b // \v - vertical tab

/* Punctuation */
export const BSL = 0x5c // \\
export const APO = 0x27 // \'
export const DQT = 0x22 // \"
export const QMK = 0x3f // \?

/* Whitespace */
export const SPC = 0x20 // space
export const NBS = 0xa0 // non-breaking space

/* Functions */
export function slstr(...strings) {
  return strings.join(' ')
}

export function mlstr(...strings) {
  return strings.join('\n')
}
