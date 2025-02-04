export function partOne(input: string[]): number | string {
  const { start, connections, coords } = parse(input)
  const loop = exploreLoop(connections, start)

  return loop
    .values()
    .reduce((max, current) => (current > max ? current : max), 0)
}

interface Coord {
  x: number
  y: number
}

function parse(input: string[]): {
  start: Coord
  connections: Map<number, number[]>
  coords: Map<number, Coord>
} {
  const start: Coord = { x: 0, y: 0 }
  const possibleConnections = new Map<number, number[]>()
  const coords = new Map<number, Coord>()

  input.forEach((line, y) => {
    line.split('').forEach((c, x) => {
      possibleConnections.set(
        coordToNumber({ x, y }),
        neighbours(x, y, c).map((coord) => coordToNumber(coord))
      )

      if (c == 'S') {
        start.x = x
        start.y = y
      }
    })
  })

  const connections = new Map<number, number[]>()

  possibleConnections.keys().forEach((key) => {
    connections.set(
      key,
      possibleConnections
        .get(key)!
        .filter(
          (n) =>
            possibleConnections.has(n) &&
            possibleConnections.get(n)!.includes(key)
        )
    )
  })
  return { start, connections, coords }
}

function coordToNumber(coord: Coord): number {
  return coord.x * 100000 + coord.y
}

function numberToCoord(number: number): Coord {
  return {
    x: Math.floor(number / 100000),
    y: number % 100000,
  }
}

function neighbours(x: number, y: number, c: string): Coord[] {
  switch (c) {
    case '|':
      return [
        { x, y: y - 1 },
        { x, y: y + 1 },
      ]
    case '-':
      return [
        { x: x - 1, y },
        { x: x + 1, y },
      ]
    case 'L':
      return [
        { x, y: y - 1 },
        { x: x + 1, y },
      ]
    case 'J':
      return [
        { x, y: y - 1 },
        { x: x - 1, y },
      ]
    case '7':
      return [
        { x, y: y + 1 },
        { x: x - 1, y },
      ]
    case 'F':
      return [
        { x, y: y + 1 },
        { x: x + 1, y },
      ]
    case 'S':
      return [
        { x, y: y + 1 },
        { x: x + 1, y },
        { x: x - 1, y },
        { x, y: y - 1 },
      ]
    default:
      return []
  }
}

function exploreLoop(
  graph: Map<number, number[]>,
  start: Coord
): Map<number, number> {
  const toVisit = [coordToNumber(start)]
  const distances = new Map<number, number>()
  distances.set(toVisit[0], 0)

  while (toVisit.length > 0) {
    var current = toVisit.shift()!
    graph.get(current)?.forEach((neighbour) => {
      if (!distances.has(neighbour)) {
        distances.set(neighbour, distances.get(current)! + 1)
        toVisit.push(neighbour)
      }
    })
  }
  return distances
}

export function partTwo(input: string[]): number | string {
  const { start, connections, coords } = parse(input)
  const loop = exploreLoop(connections, start)
  const loopKeys = new Set<number>([...loop.keys()])

  const locationStatus = new Map<number, boolean>()

  connections.keys().forEach((key) => {
    if (!loop.has(key) && !locationStatus.has(key)) {
      const { positions, enclosed } = findGroundStatus(
        connections,
        loopKeys,
        key,
        input
      )

      positions.forEach((position) => {
        if (connections.has(position) && !loopKeys.has(position))
          locationStatus.set(position, enclosed)
        else locationStatus.set(position, false)
      })
    }
  })
  return locationStatus
    .values()
    .reduce((total, current) => (current ? total + 1 : total), 0)
}

function findGroundStatus(
  connections: Map<number, number[]>,
  loop: Set<number>,
  position: number,
  input: string[]
): { positions: Set<number>; enclosed: boolean } {
  const positions = new Set<number>([position])
  const toExplore = [numberToCoord(position)]
  let enclosed = true
  let haveSeenLoop = false

  while (toExplore.length > 0) {
    const currentCoord = toExplore.shift()!
    const current = coordToNumber(currentCoord)

    if (connections.has(current)) {
      if (loop.has(current)) haveSeenLoop = true
      if (
        currentCoord.x == input[0].length - 1 ||
        currentCoord.y == input.length - 1
      )
        enclosed = false

      findNextAccessibleTiles(connections, current).forEach((next) => {
        const nextNumber = coordToNumber(next)
        if (!positions.has(nextNumber)) {
          toExplore.push(next)
          positions.add(nextNumber)
        }
      })
    } else enclosed = false
  }

  return { positions, enclosed: haveSeenLoop && enclosed }
}

function findNextAccessibleTiles(
  connections: Map<number, number[]>,
  position: number
): Coord[] {
  const { x, y } = numberToCoord(position)
  const next: Coord[] = []
  let current = connections.get(position)

  if (current) {
    if (!current.includes(coordToNumber({ x: x + 1, y })))
      next.push({ x, y: y - 1 })
    if (!current.includes(coordToNumber({ x, y: y + 1 })))
      next.push({ x: x - 1, y })
  }

  current = connections.get(coordToNumber({ x, y: y + 1 }))
  if (current && !current.includes(coordToNumber({ x: x + 1, y: y + 1 })))
    next.push({ x, y: y + 1 })

  current = connections.get(coordToNumber({ x: x + 1, y }))
  if (current && !current.includes(coordToNumber({ x: x + 1, y: y + 1 })))
    next.push({ x: x + 1, y })

  return next
}
