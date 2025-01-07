export function partOne(input: string[]): number | string {
  return input.reduce((sum, current) => {
    const parsedLine = current.split(/\s+/).map((y) => parseInt(y))
    return areLevelsSafe(parsedLine) ? sum + 1 : sum
  }, 0)
}

function areLevelsSafe(levels: number[]): boolean {
  let increasing: boolean | null = null

  return levels.slice(0, -1).every((current, index) => {
    increasing ??= levels[index + 1] > current

    return (
      increasing == levels[index + 1] > current &&
      levels[index + 1] != current &&
      Math.abs(levels[index + 1] - current) < 4
    )
  })
}

export function partTwo(input: string[]): number | string {
  return input.reduce((sum, current) => {
    const parsedLine = current.split(/\s+/).map((y) => parseInt(y))
    return areLevelsSafeWithDampener(parsedLine) ? sum + 1 : sum
  }, 0)
}

function areLevelsSafeWithDampener(levels: number[]): boolean {
  if (areLevelsSafe(levels)) return true

  return (
    levels.find((level, index) => {
      return areLevelsSafe([
        ...levels.slice(0, index),
        ...levels.slice(index + 1),
      ])
    }) !== undefined
  )
}
