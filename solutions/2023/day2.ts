export function partOne(input: string[]): number | string {
  const targets = [
    { count: 14, colour: 'blue' },
    { count: 12, colour: 'red' },
    { count: 13, colour: 'green' },
  ]
  const counts = parse(input)

  return counts.reduce((total, count, index) => {
    if (targets.every((target) => count.get(target.colour)! <= target.count))
      return total + index + 1
    return total
  }, 0)
}

function parse(input: string[]): Map<string, number>[] {
  const gameCounts: Map<string, number>[] = []
  input.forEach((line) => {
    const gameCount = new Map<string, number>()
    const games = line.split(/[:;,]/).slice(1)
    games.forEach((game) => {
      const pair = game.trim().split(' ')
      const existing = gameCount.get(pair[1]) ?? 0
      gameCount.set(pair[1], Math.max(parseInt(pair[0]), existing))
    })
    gameCounts.push(gameCount)
  })
  return gameCounts
}

export function partTwo(input: string[]): number | string {
  const counts = parse(input)
  return counts.reduce(
    (total, count) => total + count.values().reduce((t, value) => t * value, 1),
    0
  )
}
