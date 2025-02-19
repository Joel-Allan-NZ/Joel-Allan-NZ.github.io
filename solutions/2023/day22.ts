export function partOne(input: string[]): number | string {
  const bricks = parse(input)
  bricksWithGravity(bricks)
  const removable = new Set<number>(bricks.map((brick) => brick.id))

  bricks.forEach((brick) => {
    if (brick.supportedBy.size == 1)
      removable.delete(brick.supportedBy.values().toArray()[0])
  })

  return removable.size
}

interface Brick {
  cubes: number[][]
  supportedBy: Set<number>
  supporting: Set<number>
  id: number
}

function parse(input: string[]): Brick[] {
  const bricks: Brick[] = []

  input.forEach((line, index) => {
    const brickEnds = line
      .split('~')
      .map((c) => c.split(',').map((c) => parseInt(c)))

    const cubes: number[][] = []
    for (let x = brickEnds[0][0]; x <= brickEnds[1][0]; x++) {
      for (let y = brickEnds[0][1]; y <= brickEnds[1][1]; y++) {
        for (let z = brickEnds[0][2]; z <= brickEnds[1][2]; z++) {
          cubes.push([x, y, z])
        }
      }
    }

    bricks.push({
      cubes,
      supportedBy: new Set<number>(),
      supporting: new Set<number>(),
      id: index,
    })
  })

  return bricks
}

function bricksWithGravity(bricks: Brick[]): void {
  const cubesOwnership = new Map<string, Brick>()
  const bricksByZ = new Map<number, Brick[]>()

  bricks.forEach((brick) => {
    const lowestCubeZ = brick.cubes.reduce(
      (min, cube) => (min < cube[2] ? min : cube[2]),
      Infinity
    )
    if (bricksByZ.has(lowestCubeZ)) bricksByZ.get(lowestCubeZ)?.push(brick)
    else bricksByZ.set(lowestCubeZ, [brick])
  })

  bricksByZ
    .keys()
    .toArray()
    .sort((x, y) => x - y)
    .forEach((key) => {
      bricksByZ
        .get(key)!
        .values()
        .forEach((brick) => dropBrick(brick, cubesOwnership))
    })
}

function dropBrick(brick: Brick, cubesOwnership: Map<string, Brick>): void {
  const dropDistance = findBottomDistance(brick.cubes, cubesOwnership)

  brick.cubes.forEach((cube) => {
    cube[2] -= dropDistance
    cubesOwnership.set(cube.join(','), brick)
    const below = cubesOwnership.get(
      cube[0] + ',' + cube[1] + ',' + (cube[2] - 1)
    )

    if (below && below.id != brick.id) {
      below.supporting.add(brick.id)
      brick.supportedBy.add(below.id)
    }
  })
}

function findBottomDistance(
  cubes: number[][],
  cubesOwnership: Map<string, Brick>
): number {
  return cubes.reduce((min, cube) => {
    for (let z = cube[2]; z > 0; z--) {
      if (cubesOwnership.has(cube[0] + ',' + cube[1] + ',' + (z - 1))) {
        return min < cube[2] - z ? min : cube[2] - z
      }
    }
    return min < cube[2] ? min : cube[2]
  }, Infinity)
}

export function partTwo(input: string[]): number | string {
  const bricks = parse(input)
  bricksWithGravity(bricks)
  const results = new Map<number, number>()

  bricks.forEach((brick) =>
    results.set(
      brick.id,
      countSupported(bricks, brick.id, new Set<number>([brick.id]))
    )
  )

  return results.values().reduce((total, value) => total + value, 0)
}

function countSupported(
  bricks: Brick[],
  brickID: number,
  fallen: Set<number>
): number {
  const brick = bricks[brickID]
  if (
    fallen.has(brickID) ||
    brick.supportedBy.values().every((value) => fallen.has(value))
  ) {
    fallen.add(brickID)
    brick.supporting.values().forEach((supported) => {
      if (!fallen.has(supported)) countSupported(bricks, supported, fallen)
    })
  }

  return fallen.size - 1
}
