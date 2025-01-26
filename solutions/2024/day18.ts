export function partOne(input: string[]): number | string {
  const graph = parse(input)
  const start = graph.get(0)?.get(0)!
  const end = graph.get(70)?.get(70)!
  return findShortestExitDistance(graph, start, end)
}

interface CoordAwareNode {
  X: number
  Y: number
  Value: string
  Edges: CoordAwareNode[]
}

function parse(input: string[]): Map<number, Map<number, CoordAwareNode>> {
  const graph = new Map<number, Map<number, CoordAwareNode>>()

  for (let y = 0; y < 71; y++) {
    for (let x = 0; x < 71; x++) {
      const node: CoordAwareNode = { X: x, Y: y, Value: '.', Edges: [] }
      if (!graph.has(y)) graph.set(y, new Map<number, CoordAwareNode>())
      graph.get(y)?.set(x, node)
      const neighbours = [graph.get(y - 1)?.get(x), graph.get(y)?.get(x - 1)]
      neighbours.forEach((neighbour) => {
        if (neighbour) {
          neighbour.Edges.push(node)
          node.Edges.push(neighbour)
        }
      })
    }
  }
  for (let i = 0; i < 1024; i++) {
    let coords = input[i].split(/,/).map((x) => parseInt(x))
    graph.get(coords[1])!.get(coords[0])!.Value = '#'
  }
  return graph
}

function findShortestExitDistance(
  graph: Map<number, Map<number, CoordAwareNode>>,
  start: CoordAwareNode,
  end: CoordAwareNode
): number {
  const minimumDistances = new Map<CoordAwareNode, number>([
    [end, 2 ** 31],
    [start, 0],
  ])
  const toExplore = [start]

  while (toExplore.length > 0) {
    const node = toExplore.shift()!
    const distance = minimumDistances.get(node)!

    if (node == end) return distance

    const possibleMin = minimumDistances.get(node)
    if (possibleMin && possibleMin < distance) continue

    node.Edges.forEach((node) => {
      if (node.Value != '#') {
        const nodeDistance = minimumDistances.get(node)
        if (!nodeDistance || nodeDistance > distance + 1) {
          minimumDistances.set(node, distance + 1)
          toExplore.push(node)
        }
      }
    })
  }
  return minimumDistances.get(end)!
}

export function partTwo(input: string[]): number | string {
  const graph = parse(input)
  const start = graph.get(0)?.get(0)!
  const end = graph.get(70)?.get(70)!
  const visitedNodes = new Set<CoordAwareNode>()

  for (let i = 1024; i < input.length; i++) {
    let coords = input[i].split(/,/).map((x) => parseInt(x))
    graph.get(coords[1])!.get(coords[0])!.Value! = '#'

    if (
      visitedNodes.size == 0 ||
      visitedNodes.has(graph.get(coords[1])!.get(coords[0])!)
    ) {
      if (!hasPossiblePath(graph, start, end, visitedNodes))
        return `${coords[0]},${coords[1]}`
    }
  }
  return 'Can still find a path.'
}

function hasPossiblePath(
  graph: Map<number, Map<number, CoordAwareNode>>,
  start: CoordAwareNode,
  end: CoordAwareNode,
  visited: Set<CoordAwareNode>
): boolean {
  const priority = new Map<number, CoordAwareNode[]>()
  visited.clear()
  visited.add(start)
  addPriorityNode(priority, start)
  while (priority.size > 0) {
    let current = getPriorityNode(priority)
    if (current == end) return true

    current.Edges.forEach((neighbour) => {
      if (neighbour.Value != '#' && !visited.has(neighbour)) {
        visited.add(neighbour)
        addPriorityNode(priority, neighbour)
      }
    })
  }
  return false
}

function addPriorityNode(
  priority: Map<number, CoordAwareNode[]>,
  node: CoordAwareNode
) {
  const distance = 140 - node.X - node.Y

  if (!priority.has(distance)) priority.set(distance, [node])
  else priority.get(distance)?.push(node)
}

function getPriorityNode(
  priority: Map<number, CoordAwareNode[]>
): CoordAwareNode {
  const smallest = priority
    .keys()
    .reduce((min, current) => (min > current ? current : min), 2 ** 31)
  const toReturn = priority.get(smallest)!.shift()!
  if (priority.get(smallest)?.length == 0) {
    priority.delete(smallest)
  }
  return toReturn
}
