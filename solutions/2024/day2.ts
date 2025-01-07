export function partOne(input: string[]): number | string {
  const left: number[] = []
  const right: number[] = []

  input.forEach((x) => {
    const s = x.split(/\s+/).map((y) => parseInt(y))
    left.push(s[0])
    right.push(s[1])
  })
  right.sort()

  return left
    .sort()
    .reduce((sum, current, index) => sum + Math.abs(right[index] - current), 0)
}

export function partTwo(input: string[]): number | string {
  const left: number[] = []
  const right: Map<number, number> = new Map()

  input.forEach((x) => {
    const s = x.split(/\s+/).map((y) => parseInt(y))
    left.push(s[0])
    right.set(s[1], (right.get(s[1]) ?? 0) + 1)
  })

  return left.reduce(
    (sum, current) => sum + current * (right.get(current) ?? 0),
    0
  )
}
