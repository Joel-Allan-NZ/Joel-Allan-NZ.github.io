export function partOne(input: string[]): number | string {
  const times = input[0].matchAll(/\d+/g).map((x) => parseInt(x[0]))
  const distances = input[1]
    .matchAll(/\d+/g)
    .map((x) => parseInt(x[0]))
    .toArray()

  return times.reduce(
    (total, time, index) => findQuadraticRange(time, distances[index]) * total,
    1
  )
}

function findQuadraticRange(time: number, distance: number) {
  const lowerBound = Math.floor(
    0.5 * (time - Math.sqrt(time ** 2 - 4 * distance)) + 1
  )
  return time - lowerBound * 2 + 1
}

export function partTwo(input: string[]): number | string {
  const time = parseInt(
    input[0]
      .matchAll(/\d+/g)
      .map((x) => x[0])
      .toArray()
      .join('')
  )
  const distance = parseInt(
    input[1]
      .matchAll(/\d+/g)
      .map((x) => x[0])
      .toArray()
      .join('')
  )

  return findQuadraticRange(time, distance)
}
