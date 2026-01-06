/* Control characters */
export const NUL = 0x00;  // \0 - null character
export const BEL = 0x07;  // \a - alert bell
export const BSP = 0x08;  // \b - backspace
export const ESC = 0x1B;  // \e - escape
export const FPB = 0x0C;  // \f - formfeed page break
export const LFD = 0x0A;  // \n - line feed
export const CRR = 0x0D;  // \r - carriage return
export const HTB = 0x09;  // \t - horizontal tab
export const VTB = 0x0B;  // \v - vertical tab

/* Punctuation */
export const BSL = 0x5C;  // \\
export const APO = 0x27;  // \'
export const DQT = 0x22;  // \"
export const QMK = 0x3F;  // \?

/* Whitespace */
export const SPC = 0x20;  // space
export const NBS = 0xA0;  // non-breaking space

/* Functions */
export function slstr(...strings) {
  return strings.join(' ');
}

export function mlstr(...strings) {
  return strings.join('\n');
}
