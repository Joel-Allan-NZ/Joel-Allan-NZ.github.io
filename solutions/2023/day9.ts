export function partOne(input: string[]): number | string {
  return input.reduce((total, line) => {
    const split = line.split(' ').map((x) => parseInt(x))
    const differences = zeroOutHistory(split)
    return (
      total +
      differences.reduce((last, current) => last + current.slice(-1)[0], 0)
    )
  }, 0)
}

function zeroOutHistory(history: number[]): number[][] {
  const differences: number[][] = [history]

  while (differences.slice(-1)[0].some((x) => x != 0)) {
    const last = differences.slice(-1)[0]
    const next: number[] = []
    last.slice(1).forEach((item, index) => next.push(item - last[index]))
    differences.push(next)
  }
  console.log(differences)
  return differences.reverse()
}

export function partTwo(input: string[]): number | string {
  return input.reduce((total, line) => {
    const split = line.split(' ').map((x) => parseInt(x))
    const differences = zeroOutHistory(split)
    return total + differences.reduce((last, current) => current[0] - last, 0)
  }, 0)
}
