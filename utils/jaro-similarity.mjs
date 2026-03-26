export function calculateJaroSimilarity(firstText, secondText) {
  if (firstText === secondText) {
    return 1.0
  }

  const firstLength = firstText.length
  const secondLength = secondText.length
  const matchWindow = Math.floor(Math.max(firstLength, secondLength) / 2) - 1

  const firstMatchedChars = []
  const secondMatchedChars = []

  let totalMatches = 0
  let totalTranspositions = 0
  let secondMatchIndex = 0

  for (let firstIndex = 0; firstIndex < firstLength; firstIndex++) {
    const searchStart = Math.max(0, firstIndex - matchWindow)
    const searchEnd = Math.min(secondLength, firstIndex + matchWindow + 1)

    for (let secondIndex = searchStart; secondIndex < searchEnd; secondIndex++) {
      const sameCharacter =
        firstText.charAt(firstIndex) === secondText.charAt(secondIndex)
      const alreadyMatched = secondMatchedChars[secondIndex]

      if (!sameCharacter || alreadyMatched) {
        continue
      }

      firstMatchedChars[firstIndex] = true
      secondMatchedChars[secondIndex] = true
      totalMatches++
      break
    }
  }

  if (totalMatches === 0) {
    return 0.0
  }

  for (let firstIndex = 0; firstIndex < firstLength; firstIndex++) {
    if (!firstMatchedChars[firstIndex]) {
      continue
    }

    while (!secondMatchedChars[secondMatchIndex]) {
      secondMatchIndex++
    }

    const hasTransposition =
      firstText.charAt(firstIndex) !== secondText.charAt(secondMatchIndex)

    if (hasTransposition) {
      totalTranspositions++
    }

    secondMatchIndex++
  }

  totalTranspositions = Math.floor(totalTranspositions / 2)

  const firstRatio = totalMatches / firstLength
  const secondRatio = totalMatches / secondLength
  const transpositionRatio = (totalMatches - totalTranspositions) / totalMatches

  return (firstRatio + secondRatio + transpositionRatio) / 3.0
}
