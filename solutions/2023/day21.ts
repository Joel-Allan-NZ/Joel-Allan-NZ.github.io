export function partOne(input: string[]): number | string {
  const distances = findAccessiblePlots(
    Math.floor(input[0].length / 2),
    Math.floor(input.length / 2),
    input,
    64
  )
  return distances
    .values()
    .filter((x) => x % 2 == 0)
    .toArray().length
}

function findAccessiblePlots(
  startX: number,
  startY: number,
  input: string[],
  stepTarget: number
): Map<string, number> {
  const distances = new Map<string, number>()
  distances.set(startX + ',' + startY, 0)
  const positions = [[startX, startY]]
  const steps = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ]

  let pos = 0
  while (positions.length > 0) {
    let current = positions.shift()!
    pos++
    console.log(pos)
    const currentDistance = distances.get(current.join(','))!
    if (currentDistance >= stepTarget) continue

    for (let step of steps) {
      const next = [current[0] + step[0], current[1] + step[1]]
      if (next.some((x) => x < 0 || x >= input.length)) continue

      if (input[next[1]][next[0]] != '#') {
        const nextString = next.join(',')
        const existing = distances.get(nextString)
        if (!existing || existing > currentDistance + 1) {
          distances.set(nextString, currentDistance + 1)
          positions.push(next)
        }
      }
    }
  }

  return distances
}

export function partTwo(input: string[]): number | string {
  const distances = findAccessiblePlots(
    Math.floor(input[0].length / 2),
    Math.floor(input.length / 2),
    input,
    input.length
  )
  return calculateAccessible(input, distances, 26501365)
}

function calculateAccessible(
  input: string[],
  distances: Map<string, number>,
  steps: number
): number {
  const oddCorners = distances
    .values()
    .reduce(
      (total, current) =>
        current % 2 == 1 && current > 65 ? total + 1 : total,
      0
    )
  const evenCorners = distances
    .values()
    .reduce(
      (total, current) =>
        current % 2 == 0 && current > 65 ? total + 1 : total,
      0
    )

  const even = distances
    .values()
    .reduce((total, current) => (current % 2 == 0 ? total + 1 : total), 0)
  const odd = distances
    .values()
    .reduce((total, current) => (current % 2 == 1 ? total + 1 : total), 0)

  const tesselations = (steps - Math.floor(input.length / 2)) / input.length

  const totalTiles =
    (tesselations + 1) ** 2 * odd +
    tesselations ** 2 * even -
    (tesselations + 1) * oddCorners +
    tesselations * evenCorners

  return totalTiles
}
