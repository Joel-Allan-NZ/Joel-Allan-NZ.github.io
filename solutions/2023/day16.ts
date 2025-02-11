export function partOne(input: string[]): number | string {
  return countEnergizedTiles(0, 0, 1, input)
}

function countEnergizedTiles(
  x: number,
  y: number,
  direction: number,
  input: string[]
): number {
  const energizedTiles = new Set<number>()
  const beamed = new Set<number>()
  const beams: number[][] = []

  energizedTiles.add(x * input.length + 1 + y)
  beamed.add(x * input.length * 10 + y * 10 + direction)
  beams.push([x, y, direction])

  while (beams.length > 0) {
    let beam = beams.pop()!
    for (let next of nextBeamState(beam, input)) {
      if (
        next[1] > -1 &&
        next[1] < input.length &&
        next[0] > -1 &&
        next[0] < input[next[1]].length
      ) {
        const beamedNumber =
          next[0] * input.length * 10 + next[1] * 10 + next[2]
        if (!beamed.has(beamedNumber)) {
          energizedTiles.add(next[0] * input.length + 1 + next[1])
          beams.push(next)
          beamed.add(beamedNumber)
        }
      }
    }
  }
  return energizedTiles.size
}

function nextBeamPosition(beam: number[], direction: number) {
  return [
    beam[0] + (direction == 1 ? 1 : direction == 3 ? -1 : 0),
    beam[1] + (direction == 0 ? -1 : direction == 2 ? 1 : 0),
    direction,
  ]
}

function nextBeamState(beam: number[], input: string[]): number[][] {
  const currentTile = input[beam[1]][beam[0]]
  let direction = beam[2]

  if (currentTile == '|' && (direction == 1 || direction == 3)) {
    return [nextBeamPosition(beam, 2), nextBeamPosition(beam, 0)]
  } else if (currentTile == '-' && (direction == 0 || direction == 2)) {
    return [nextBeamPosition(beam, 1), nextBeamPosition(beam, 3)]
  } else if (currentTile == '/') {
    direction = direction % 2 == 0 ? (direction + 5) % 4 : (direction + 3) % 4
  } else if (currentTile == '\\') {
    direction = direction % 2 == 0 ? (direction + 3) % 4 : (direction + 5) % 4
  }
  return [nextBeamPosition(beam, direction)]
}

export function partTwo(input: string[]): number | string {
  let max = 0

  for (let y = 0; y < input.length; y++) {
    let result = countEnergizedTiles(0, y, 1, input)
    if (result > max) max = result
    result = countEnergizedTiles(input[0].length - 1, y, 3, input)
    if (result > max) max = result
  }
  for (let x = 0; x < input.length; x++) {
    let result = countEnergizedTiles(x, 0, 2, input)
    if (result > max) max = result
    result = countEnergizedTiles(x, input.length - 1, 0, input)
    if (result > max) max = result
  }

  return max
}
