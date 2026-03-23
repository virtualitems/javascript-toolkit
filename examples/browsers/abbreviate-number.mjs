export function abbreviateNumber(number, precision = 2) {
    return number.toLocaleString('en-US', { notation: 'compact', maximumFractionDigits: precision });
}
