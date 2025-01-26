export function partOne(input: string[]): number | string {
  const { graph, start } = parse(input)
  findMinimumDistances(graph, start)
  const distance = 2,
    target = 100
  let count = 0

  for (let y = 0; y < graph.length; y++) {
    for (let x = 0; x < graph[y].length; x++) {
      if (graph[y][x].value != '#')
        count += neighboursWithinManhattanDistance(
          graph,
          graph[y][x],
          distance,
          target
        )
    }
  }
  return count
}

interface DistanceAwareNode {
  value: string
  distance: number
  x: number
  y: number
}

function parse(input: string[]): {
  graph: DistanceAwareNode[][]
  start: DistanceAwareNode
} {
  const graph: DistanceAwareNode[][] = []
  let start: DistanceAwareNode | undefined = undefined

  for (let y = 0; y < input.length; y++) {
    graph.push([])
    for (let x = 0; x < input[y].length; x++) {
      const node = {
        value: input[y][x],
        distance: input[y][x] == '#' ? 0 : 2 ** 31,
        x,
        y,
      }
      graph[y].push(node)
      if (input[y][x] == 'S') start = node
    }
  }
  return { graph, start: start! }
}

function findMinimumDistances(
  graph: DistanceAwareNode[][],
  start: DistanceAwareNode
): void {
  const toExplore: DistanceAwareNode[] = [start]
  start.distance = 0

  while (toExplore.length > 0) {
    const current = toExplore.shift()!
    const neighbours = getNeighbours(graph, current)
    neighbours.forEach((neighbour) => {
      if (neighbour.value != '#' && neighbour.distance > current.distance + 1) {
        toExplore.push(neighbour)
        neighbour.distance = current.distance + 1
      }
    })
  }
}

function getNeighbours(graph: DistanceAwareNode[][], node: DistanceAwareNode) {
  const res: DistanceAwareNode[] = []

  if (node.x < graph[0].length - 1) res.push(graph[node.y][node.x + 1])
  if (node.x > 0) res.push(graph[node.y][node.x - 1])
  if (node.y < graph.length - 1) res.push(graph[node.y + 1][node.x])
  if (node.y > 0) res.push(graph[node.y - 1][node.x])

  return res
}

function neighboursWithinManhattanDistance(
  graph: DistanceAwareNode[][],
  node: DistanceAwareNode,
  cheatDistance: number,
  cheatTimeGain: number
): number {
  let count = 0
  const yMin = Math.max(0, node.y - cheatDistance)
  const yMax = Math.min(graph.length - 1, node.y + cheatDistance)

  for (let y = yMin; y <= yMax; y++) {
    const remainingManhattanDistance = cheatDistance - Math.abs(node.y - y)
    const xMin = Math.max(0, node.x - remainingManhattanDistance)
    const xMax = Math.min(
      graph[y].length - 1,
      node.x + remainingManhattanDistance
    )

    for (let x = xMin; x <= xMax; x++) {
      const neighbour = graph[y][x]
      const manhattanDistance = Math.abs(node.x - x) + Math.abs(node.y - y)

      if (
        neighbour.distance - manhattanDistance - cheatTimeGain >=
        node.distance
      )
        count++
    }
  }
  return count
}

export function partTwo(input: string[]): number | string {
  const { graph, start } = parse(input)
  findMinimumDistances(graph, start)
  const distance = 20,
    target = 100
  let count = 0

  for (let y = 0; y < graph.length; y++) {
    for (let x = 0; x < graph[y].length; x++) {
      if (graph[y][x].value != '#')
        count += neighboursWithinManhattanDistance(
          graph,
          graph[y][x],
          distance,
          target
        )
    }
  }
  return count
}
