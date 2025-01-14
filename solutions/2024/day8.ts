export function partOne(input: string[]): number | string {
  const parsed = parse(input)
  const antinodes = new Map<number, Set<number>>()

  parsed.forEach((antennaeType) => {
    antennaeType.forEach((antenna, index) => {
      antennaeType.slice(index + 1).forEach((ant, i) => {
        findAntinodes(antinodes, antenna, ant, input[0].length, input.length)
      })
    })
  })
  return antinodes
    .keys()
    .reduce((total, key) => total + antinodes.get(key)!.size, 0)
}

function parse(input: string[]): Map<string, number[][]> {
  const result = new Map<string, number[][]>()
  input.forEach((line, y) => {
    line.split('').forEach((c, x) => {
      if (c != '.') {
        if (!result.has(c)) result.set(c, [[x, y]])
        else result.get(c)?.push([x, y])
      }
    })
  })
  return result
}

function findAntinodes(
  antinodes: Map<number, Set<number>>,
  a: number[],
  b: number[],
  maxX: number,
  maxY: number
) {
  let xDiff = a[0] - b[0]
  let yDiff = a[1] - b[1]
  // let c = [a[0] + xDiff, a[1] + yDiff]
  // let d = [b[0] - xDiff, b[1] - yDiff]

  // if (d[0] > -1 && d[0] < maxX && d[1] > -1 && d[1] < maxY) {
  //   if (!antinodes.has(d[0])) antinodes.set(d[0], new Set<number>([d[1]]))
  //   else antinodes.get(d[0])?.add(d[1])
  // }
  // if (c[0] > -1 && c[0] < maxX && c[1] > -1 && c[1] < maxY) {
  //   if (!antinodes.has(c[0])) antinodes.set(c[0], new Set<number>([c[1]]))
  //   else antinodes.get(c[0])?.add(c[1])
  // }

  ;[
    [a[0] + xDiff, a[1] + yDiff],
    [b[0] - xDiff, b[1] - yDiff],
  ].forEach((x) => {
    if (x[0] > -1 && x[0] < maxX && x[1] > -1 && x[1] < maxY) {
      console.log(x)
      if (!antinodes.has(x[0])) antinodes.set(x[0], new Set<number>([x[1]]))
      else antinodes.get(x[0])?.add(x[1])
    }
  })
}

export function partTwo(input: string[]): number | string {
  const parsed = parse(input)
  const antinodes = new Map<number, Set<number>>()

  parsed.forEach((antennaeType) => {
    antennaeType.forEach((antenna, index) => {
      antennaeType.slice(index + 1).forEach((ant, i) => {
        findHarmonicAntinodes(
          antinodes,
          antenna,
          ant,
          input[0].length,
          input.length
        )
      })
    })
  })
  return antinodes
    .keys()
    .reduce((total, key) => total + antinodes.get(key)!.size, 0)
}

function findHarmonicAntinodes(
  antinodes: Map<number, Set<number>>,
  a: number[],
  b: number[],
  maxX: number,
  maxY: number
) {
  let xDiff = a[0] - b[0]
  let yDiff = a[1] - b[1]

  let x = a[0]
  let y = a[1]

  while (x > -1 && x < maxX && y > -1 && y < maxY) {
    if (!antinodes.has(x)) antinodes.set(x, new Set<number>([y]))
    else antinodes.get(x)?.add(y)
    x = x + xDiff
    y = y + yDiff
  }

  x = a[0]
  y = a[1]

  while (x > -1 && x < maxX && y > -1 && y < maxY) {
    if (!antinodes.has(x)) antinodes.set(x, new Set<number>([y]))
    else antinodes.get(x)?.add(y)
    x = x - xDiff
    y = y - yDiff
  }
}
