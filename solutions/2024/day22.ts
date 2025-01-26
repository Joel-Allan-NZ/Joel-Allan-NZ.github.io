export function partOne(input: string[]): number | string {
  const towels = input[0].split(/, /)
  const patterns = input.slice(2)

  return patterns.reduce(
    (total, pattern) => (canMakePattern(pattern, towels) ? total + 1 : total),
    0
  )
}

function canMakePattern(pattern: string, towels: string[]): boolean {
  const patterns = []
  patterns.push(pattern)
  while (patterns.length > 0) {
    let currentPattern = patterns.pop()

    for (let towel of towels) {
      if (currentPattern?.startsWith(towel)) {
        if (currentPattern.length == towel.length) return true

        patterns.push(currentPattern.slice(towel.length))
      }
    }
  }
  return false
}

export function partTwo(input: string[]): number | string {
  const towels = input[0].split(/, /)
  const patterns = input.slice(2)
  const cache = new Map<string, number>()

  return patterns.reduce(
    (total, pattern) => total + countValidPatterns(cache, pattern, towels),
    0
  )
}

function countValidPatterns(
  cache: Map<string, number>,
  pattern: string,
  towels: string[]
): number {
  if (!pattern || pattern.length == 0) return 1
  if (cache.has(pattern)) return cache.get(pattern)!

  const prefixMatches = towels.filter((towel) => pattern.startsWith(towel))
  const matchCount = prefixMatches.reduce(
    (total, towel) =>
      total + countValidPatterns(cache, pattern.slice(towel.length), towels),
    0
  )
  cache.set(pattern, matchCount)
  return matchCount
}
