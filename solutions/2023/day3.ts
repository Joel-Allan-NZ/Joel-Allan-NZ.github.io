export function partOne(input: string[]): number | string {
  let sum = 0
  input.forEach((line, y) => {
    for (let x = 0; x < line.length; x++) {
      let partialResult = isPartialNumber(input, x, y)
      if (partialResult) {
        sum += partialResult.value
        x += partialResult.length
      }
    }
  })
  return sum
}

interface PartialNumber {
  length: number
  value: number
  adjacentSymbols: { coords: number[]; value: string }[]
}

function isPartialNumber(
  input: string[],
  x: number,
  y: number
): PartialNumber | undefined {
  let partialString = ''

  while (x < input[y].length && !isNaN(parseInt(input[y][x]))) {
    partialString += input[y][x]
    x++
  }

  if (partialString.length > 0) {
    const adjacentSymbols = findAdjacentSymbols(
      input,
      x - partialString.length,
      x - 1,
      y
    )
    if (adjacentSymbols.length > 0)
      return {
        length: partialString.length - 1,
        value: parseInt(partialString),
        adjacentSymbols,
      }
  }
  return undefined
}

function findAdjacentSymbols(
  input: string[],
  xStart: number,
  xEnd: number,
  y: number
): { coords: number[]; value: string }[] {
  const symbols: { coords: number[]; value: string }[] = []

  for (let v = y - 1; v < y + 2; v++) {
    for (let x = xStart - 1; x < xEnd + 2; x++) {
      if (v < 0 || x < 0 || v >= input.length || x >= input[v].length) continue
      if (input[v][x] != '.' && isNaN(parseInt(input[v][x])))
        symbols.push({ coords: [x, v], value: input[v][x] })
    }
  }
  return symbols
}

export function partTwo(input: string[]): number | string {
  const partialsByGear = new Map<number, number[]>()

  input.forEach((line, y) => {
    for (let x = 0; x < line.length; x++) {
      const partial = isPartialNumber(input, x, y)
      if (partial) {
        partial.adjacentSymbols.forEach((adjacent) => {
          if (adjacent.value == '*') {
            let coord = adjacent.coords[0] * 100000 + adjacent.coords[1]
            if (!partialsByGear.has(coord))
              partialsByGear.set(coord, [partial.value])
            else partialsByGear.get(coord)?.push(partial.value)
          }
        })
        x += partial.length
      }
    }
  })

  return partialsByGear
    .values()
    .reduce(
      (total, current) =>
        current.length == 2 ? total + current[0] * current[1] : total,
      0
    )
}
