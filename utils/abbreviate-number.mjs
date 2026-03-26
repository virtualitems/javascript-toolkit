export function abbreviateNumber(number) {
  const lang = 'en-US'
  const notation = 'compact'
  return number.toLocaleString(lang, { notation })
}
