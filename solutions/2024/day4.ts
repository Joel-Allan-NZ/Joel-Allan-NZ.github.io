export function partOne(input: string[]): number | string {
  return [input, rotateStringArray(input)].reduce((total, current) => {
    const straight = current.reduce(
      (t, c) =>
        t + (c.match(/XMAS/g)?.length ?? 0) + (c.match(/SAMX/g)?.length ?? 0),
      0
    )
    return total + straight + countDiagonal(current)
  }, 0)
}

function rotateStringArray(input: string[]): string[] {
  const rotated: string[] = []
  for (let i = 0; i < input[0].length; i++) {
    rotated.push(
      input
        .map((current) => current[i])
        .reverse()
        .join('')
    )
  }
  return rotated
}

function countDiagonal(input: string[]): number {
  return input.reduce((total, current, y) => {
    return (
      total +
      current
        .split('')
        .reduce(
          (t, c, x) =>
            isMatchStartPoint(input, x, y, [0, 1, 2, 3]) ? t + 1 : t,
          0
        )
    )
  }, 0)
}

function isMatchStartPoint(
  input: string[],
  x: number,
  y: number,
  range: number[]
): boolean {
  return (
    y < input.length - 3 &&
    x < input[y].length - 3 &&
    (range.every((r) => input[y + r][x + r] == 'XMAS'[r]) ||
      range.every((r) => input[y + r][x + r] == 'SAMX'[r]))
  )
}

export function partTwo(input: string[]): number | string {
  return input.reduce((total, current, y) => {
    return (
      total +
      current
        .split('')
        .reduce(
          (t, c, x) =>
            input[y][x] == 'A' && isACross(input, y, x) ? t + 1 : t,
          0
        )
    )
  }, 0)
}

function isACross(input: string[], y: number, x: number): boolean {
  if (x == 0 || y == 0 || y > input.length - 2 || x > input[y].length - 2)
    return false

  const corners = [
    input[y - 1][x - 1],
    input[y + 1][x - 1],
    input[y - 1][x + 1],
    input[y + 1][x + 1],
  ]
  const count = { M: 0, S: 0, X: 0, A: 0 }
  corners.forEach((x) => count[x as keyof typeof count]++)

  return count.M == 2 && count.S == 2 && corners[0] != corners[3]
}
