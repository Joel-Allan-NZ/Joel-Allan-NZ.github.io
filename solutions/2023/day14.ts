export function partOne(input: string[]): number | string {
  let total = 0
  for (let x = 0; x < input[0].length; x++) {
    let end = 0
    for (let y = 0; y < input.length; y++) {
      if (input[y][x] == 'O') {
        total += input.length - end
        end++
      } else if (input[y][x] == '#') end = y + 1
    }
  }
  return total
}

export function partTwo(input: string[]): number | string {
  const seen = new Map<string, number>()
  let stones: string[][] = []
  let cycles = 0
  input.forEach((y) => stones.push(y.split('')))
  const targetCycles = 1000000000
  while (cycles < targetCycles) {
    const stoneString = stones
      .reduce((a, b) => a + ';' + b.join(''), '')
      .slice(1)
    const last = seen.get(stoneString)
    seen.set(stoneString, cycles)

    if (last) {
      const index = ((targetCycles - last) % (cycles - last)) + last
      stones = seen
        .entries()
        .find((x) => x[1] == index)![0]!
        .split(';')
        .map((x) => x.split(''))

      break
    }
    vertical(stones, 1)
    horizontal(stones, 1)
    vertical(stones, -1)
    horizontal(stones, -1)
    cycles++
  }

  let total = 0
  for (let x = 0; x < stones[0].length; x++)
    for (let y = 0; y < stones.length; y++)
      if (stones[y][x] == 'O') total += stones.length - y

  return total
}

function vertical(stones: string[][], direction: number): void {
  for (let x = 0; x < stones[0].length; x++) {
    let end = direction == -1 ? stones.length - 1 : 0
    let rowEnd = direction == -1 ? -1 : stones.length

    for (let y = end; y != rowEnd; y += direction) {
      if (stones[y][x] == 'O') {
        if (end != y) {
          stones[end][x] = 'O'
          stones[y][x] = '.'
        }
        end += direction
      } else if (stones[y][x] == '#') end = y + direction
    }
  }
}

function horizontal(stones: string[][], direction: number): void {
  for (let y = 0; y < stones.length; y++) {
    let end = direction == -1 ? stones.length - 1 : 0
    let rowEnd = direction == -1 ? -1 : stones.length

    for (let x = end; x != rowEnd; x += direction) {
      if (stones[y][x] == 'O') {
        if (end != x) {
          stones[y][end] = 'O'
          stones[y][x] = '.'
        }
        end += direction
      } else if (stones[y][x] == '#') end = x + direction
    }
  }
}
