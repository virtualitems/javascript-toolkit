const str1 = '\u00F1';  // "ñ" (precomposed)
const str2 = 'n\u0303'; // "n" + "~" (decomposed)

console.log('===', str1 === str2); // false
console.log('normalize', str1.normalize() === str2.normalize()); // true
