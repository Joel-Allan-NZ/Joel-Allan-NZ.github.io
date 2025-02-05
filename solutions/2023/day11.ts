export function partOne(input: string[]): number | string {
  let distance = 0
  const galaxies = expandGalaxies(parse(input), input, 1)

  galaxies.forEach((i, index) => {
    distance += galaxies
      .slice(index + 1)
      .reduce(
        (total, current) =>
          total + Math.abs(current[0] - i[0]) + Math.abs(current[1] - i[1]),
        0
      )
  })

  return distance
}

function parse(input: string[]): Map<number, number[]> {
  const galaxies = new Map<number, number[]>()

  input.forEach((line, y) => {
    line.split('').forEach((c, x) => {
      if (c == '#') {
        if (galaxies.has(y)) galaxies.get(y)!.push(x)
        else galaxies.set(y, [x])
      }
    })
  })
  return galaxies
}

function expandGalaxies(
  galaxies: Map<number, number[]>,
  input: string[],
  expandSize: number
): number[][] {
  var missingY: number[] = []
  var missingX: number[] = []

  for (let y = 0; y < input.length; y++) if (!galaxies.has(y)) missingY.push(y)

  for (let x = 0; x < input[0].length; x++)
    if (!galaxies.values().some((z) => z.includes(x))) missingX.push(x)

  missingY.sort((x, y) => x - y)
  missingX.sort((x, y) => x - y)

  const effectiveCoords: number[][] = []

  galaxies.keys().forEach((y) => {
    let yIndex = missingY.findIndex((missing) => missing > y)
    yIndex = yIndex == -1 ? missingY.length : yIndex
    const realY = y + expandSize * yIndex
    galaxies.get(y)!.forEach((x) => {
      let xIndex = missingX.findIndex((missing) => missing > x)
      xIndex = xIndex == -1 ? missingX.length : xIndex
      effectiveCoords.push([realY, x + expandSize * xIndex])
    })
  })
  return effectiveCoords
}

export function partTwo(input: string[]): number | string {
  let distance = 0
  const galaxies = expandGalaxies(parse(input), input, 999999)

  galaxies.forEach((i, index) => {
    distance += galaxies
      .slice(index + 1)
      .reduce(
        (total, current) =>
          total + Math.abs(current[0] - i[0]) + Math.abs(current[1] - i[1]),
        0
      )
  })

  return distance
}
