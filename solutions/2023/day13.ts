export function partOne(input: string[]): number | string {
  const maps = parse(input)
  return maps.reduce(
    (total, map) =>
      total +
      (findVerticalReflection(map) ?? findHorizontalReflection(map)! * 100),
    0
  )
}

function parse(input: string[]): string[][] {
  const read: string[][] = [[]]
  input.forEach((line) => {
    if (line != '') {
      read[read.length - 1].push(line)
    } else read.push([])
  })
  return read
}

function findVerticalReflection(
  map: string[],
  flawTarget: number = 0
): number | undefined {
  for (let x = 1; x < map[0].length; x++) {
    const distance = Math.min(map[0].length - x, x)
    let mirrorPosition: number | undefined = x
    let flaws = 0

    for (let j = 0; j < distance; j++) {
      for (let line of map) {
        if (line[x - j - 1] != line[x + j]) {
          if (++flaws > flawTarget) break
        }
      }
      if (flaws > flawTarget) break
    }
    if (flaws == flawTarget) return mirrorPosition
  }
}

function findHorizontalReflection(
  map: string[],
  flawTarget: number = 0
): number | undefined {
  for (let y = 1; y < map.length; y++) {
    let flaws = 0
    const distance = Math.min(map.length - y, y)
    let mirrorPosition: number | undefined = y

    for (let j = 0; j < distance; j++) {
      for (let x = 0; x < map[0].length; x++) {
        if (map[y + j][x] != map[y - j - 1][x]) {
          if (++flaws > flawTarget) break
        }
      }
      if (flaws > flawTarget) break
    }
    if (flaws == flawTarget) return mirrorPosition
  }
}

export function partTwo(input: string[]): number | string {
  const maps = parse(input)
  return maps.reduce(
    (total, map) =>
      total +
      (findVerticalReflection(map, 1) ??
        findHorizontalReflection(map, 1)! * 100),
    0
  )
}
