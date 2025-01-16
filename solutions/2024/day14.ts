export function partOne(input: string[]): number | string {
  const xSize = 101,
    ySize = 103
  const xMid = Math.floor(xSize / 2),
    yMid = Math.floor(ySize / 2)
  const robots = parse(input)
  const quadrants = [0, 0, 0, 0]

  robots.forEach((robot) => {
    updateRobotPosition(robot, 100, xSize, ySize)
    if (robot.x != xMid && robot.y != yMid) {
      let quad = robot.x > xMid ? 1 : 0
      if (robot.y > yMid) quad += 2
      quadrants[quad]++
    }
  })

  return quadrants.reduce((total, current) => total * current, 1)
}

interface BathroomRobot {
  x: number
  y: number
  vx: number
  vy: number
}

function parse(input: string[]): BathroomRobot[] {
  return input.map((line) => {
    const values = [...line.matchAll(/[-\d]+/g)].map((x) => parseInt(x[0]))

    return { x: values[0], y: values[1], vx: values[2], vy: values[3] }
  })
}

function updateRobotPosition(
  robot: BathroomRobot,
  steps: number,
  xSize: number,
  ySize: number
) {
  const finalX = robot.x + steps * robot.vx
  const finalY = robot.y + steps * robot.vy

  robot.x = finalX % xSize
  robot.y = finalY % ySize

  if (robot.x < 0) robot.x += xSize
  if (robot.y < 0) robot.y += ySize
}

export function partTwo(input: string[]): number | string {
  const xSize = 101,
    ySize = 103
  const robots = parse(input)
  let steps = 0
  while (true) {
    steps++
    robots.forEach((robot) => updateRobotPosition(robot, 1, xSize, ySize))
    if (hasContiguousRowOfSize(robots, 18)) return steps
  }
}

function hasContiguousRowOfSize(
  robots: BathroomRobot[],
  targetSize: number
): boolean {
  const positions = new Map<number, Set<number>>()

  robots.forEach((robot) => {
    if (!positions.has(robot.y))
      positions.set(robot.y, new Set<number>([robot.x]))
    else positions.get(robot.y)?.add(robot.x)
  })

  return positions.values().some((row) => {
    let contiguous = 0
    if (row.size >= targetSize) {
      row.values().forEach((x) => {
        if (row.has(x + 1)) {
          contiguous++
        }
      })
    }
    return contiguous >= targetSize
  })
}
