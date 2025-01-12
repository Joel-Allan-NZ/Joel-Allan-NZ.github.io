interface Position {
  x: number
  y: number
  facing: string
}

export function partOne(input: string[]): number | string {
  const { graph, reverse, guard } = parseInput(input)
  const positions = simulateGuard(
    graph,
    reverse,
    guard,
    input[0].length,
    input.length
  )
  return positions.values().reduce((total, current) => total + current.size, 0)
}

function simulateGuard(
  graph: Map<number, Set<number>>,
  reverse: Map<number, Set<number>>,
  position: Position,
  xMax: number,
  yMax: number
): Map<number, Set<number>> {
  const visited = new Map<number, Set<number>>()
  let next = nextObstacle(graph, reverse, position)
  while (next) {
    addVisitedRange(visited, position, next)
    position = next
    next = nextObstacle(graph, reverse, position)
  }
  addVisitedRange(visited, position, nextEdge(position, xMax, yMax)!)
  return visited
}

function nextEdge(pos: Position, x: number, y: number): Position | undefined {
  switch (pos.facing) {
    case 'UP':
      return { x: pos.x, y: 0, facing: 'UP' }
    case 'RIGHT':
      return { x: x - 1, y: pos.y, facing: 'UP' }
    case 'DOWN':
      return { x: pos.x, y: y - 1, facing: 'UP' }
    case 'LEFT':
      return { x: 0, y: pos.y, facing: 'UP' }
  }
}

function addVisitedRange(
  visited: Map<number, Set<number>>,
  start: Position,
  next: Position
) {
  if (start.facing == 'UP') {
    const range = new Set<number>(rangeSet(next.y, start.y))
    const current = visited.get(start.x)
    visited.set(start.x, current ? current.union(range) : range)
  } else if (start.facing == 'RIGHT') {
    rangeSet(start.x, next.x).forEach((x) => {
      if (!visited.has(x)) visited.set(x, new Set<number>([start.y]))
      else visited.get(x)!.add(start.y)
    })
  } else if (start.facing == 'DOWN') {
    const range = new Set<number>(rangeSet(start.y, next.y))
    const current = visited.get(start.x)
    visited.set(start.x, current ? current.union(range) : range)
  } else {
    rangeSet(next.x, start.x).forEach((x) => {
      if (!visited.has(x)) visited.set(x, new Set<number>([start.y]))
      else visited.get(x)!.add(start.y)
    })
  }
}

function rangeSet(lower: number, higher: number) {
  return Array(higher - lower + 1)
    .keys()
    .map((x) => x + lower)
}

function nextObstacle(
  graph: Map<number, Set<number>>,
  reverse: Map<number, Set<number>>,
  position: Position
): Position | undefined {
  let nextCoord = nextObstacleCoord(graph, reverse, position)!
  if ([2 ** 31, -1].includes(nextCoord)) return undefined

  switch (position.facing) {
    case 'UP':
      return { x: position.x, y: nextCoord + 1, facing: 'RIGHT' }
    case 'RIGHT':
      return { x: nextCoord - 1, y: position.y, facing: 'DOWN' }
    case 'DOWN':
      return { x: position.x, y: nextCoord - 1, facing: 'LEFT' }
    case 'LEFT':
      return { x: nextCoord + 1, y: position.y, facing: 'UP' }
  }
}

function nextObstacleCoord(
  graph: Map<number, Set<number>>,
  reverse: Map<number, Set<number>>,
  position: Position
): number | undefined {
  switch (position.facing) {
    case 'UP':
      return maxLessThan(reverse.get(position.x)!, position.y)
    case 'RIGHT':
      return minGreaterThan(graph.get(position.y)!, position.x)
    case 'DOWN':
      return minGreaterThan(reverse.get(position.x)!, position.y)
    case 'LEFT':
      return maxLessThan(graph.get(position.y)!, position.x)
  }
}

function minGreaterThan(vals: Set<number>, greaterThan: number): number {
  let min = 2 ** 31
  vals.forEach((value) => {
    if (value > greaterThan) min = min > value ? value : min
  })
  return min
}

function maxLessThan(vals: Set<number>, lesserThan: number): number {
  let max = -1
  vals.forEach((value) => {
    if (value < lesserThan) max = max < value ? value : max
  })
  return max
}

function parseInput(input: string[]): {
  graph: Map<number, Set<number>>
  reverse: Map<number, Set<number>>
  guard: Position
} {
  const graph = new Map<number, Set<number>>()
  const reverse = new Map<number, Set<number>>()
  const guard = { x: 0, y: 0, facing: 'UP' }

  input.forEach((line, y) => {
    const row = new Set<number>()
    graph.set(y, row)

    line.split('').forEach((c, x) => {
      if (!reverse.has(x)) {
        reverse.set(x, new Set<number>())
      }
      if (c == '#') {
        row.add(x)
        reverse.get(x)!.add(y)
      } else if (c == '^') {
        guard.x = x
        guard.y = y
      }
    })
  })
  return { graph, reverse, guard }
}

export function partTwo(input: string[]): number | string {
  const { graph, reverse, guard } = parseInput(input)
  const positions = simulateGuard(
    graph,
    reverse,
    guard,
    input[0].length,
    input.length
  )
  positions.get(guard.x)!.delete(guard.y)

  return positions.keys().reduce((total, current) => {
    return (
      total +
      positions
        .get(current)!
        .values()
        .reduce((subtotal, c) => {
          graph.get(c)?.add(current)
          reverse.get(current)?.add(c)
          let result = isLoop(graph, reverse, guard)
          reverse.get(current)?.delete(c)
          graph.get(c)?.delete(current)

          return result ? subtotal + 1 : subtotal
        }, 0)
    )
  }, 0)
}

function isLoop(
  graph: Map<number, Set<number>>,
  reverse: Map<number, Set<number>>,
  position: Position
): boolean {
  const visited = new Map<number, Map<number, string[]>>()

  let next = nextObstacle(graph, reverse, position)
  while (next) {
    if (visited.get(position.x)?.get(position.y)?.includes(position.facing)) {
      return true
    }
    if (!visited.has(position.x))
      visited.set(position.x, new Map<number, string[]>())
    else if (!visited.get(position.x)?.has(position.y))
      visited.get(position.x)!.set(position.y, [])

    visited.get(position.x)?.get(position.y)?.push(position.facing)
    position = next
    next = nextObstacle(graph, reverse, position)
  }
  return false
}
