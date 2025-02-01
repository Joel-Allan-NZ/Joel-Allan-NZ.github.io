export function partOne(input: string[]): number | string {
  const { graph, start, end } = parse(input)
  findShortestPaths(graph, start)
  return end.shortestPaths.reduce(
    (min, current) => (min < current ? min : current),
    2 ** 31
  )
}

interface FacingNode {
  c: string
  edges: (FacingNode | null)[]
  x: number
  y: number
  shortestPaths: number[]
}

function parse(input: string[]): {
  graph: Map<number, Map<number, FacingNode>>
  start: FacingNode
  end: FacingNode
} {
  const graph = new Map<number, Map<number, FacingNode>>()
  let pathMax = 2 ** 31
  let end: FacingNode = {
    c: 'a',
    edges: [],
    x: 1,
    y: 1,
    shortestPaths: [pathMax, pathMax, pathMax, pathMax],
  }
  let start: FacingNode = {
    c: 'a',
    edges: [],
    x: 1,
    y: 1,
    shortestPaths: [1000, 0, 1000, 2000],
  }

  input.forEach((line, y) => {
    line.split('').forEach((c, x) => {
      if (c != '#') {
        let node: FacingNode = {
          c,
          edges: [null, null, null, null],
          x,
          y,
          shortestPaths: [pathMax, pathMax, pathMax, pathMax],
        }
        if (c == 'E') end = node
        else if (c == 'S') {
          node = start
          start.x = x
          start.y = y
        }
        if (!graph.has(y)) graph.set(y, new Map<number, FacingNode>())
        graph.get(y)?.set(x, node)
        let left = graph.get(y)?.get(x - 1)
        if (left) {
          left.edges[1] = node
          node.edges[3] = left
        }
        let top = graph.get(y - 1)?.get(x)
        if (top) {
          node.edges[0] = top
          top.edges[2] = node
        }
      }
    })
  })
  return { graph, start, end }
}

function findShortestPaths(
  graph: Map<number, Map<number, FacingNode>>,
  start: FacingNode
): void {
  const positions: FacingNode[] = [start]
  while (positions.length > 0) {
    let current = positions.shift()!
    for (let i = 0; i < 4; i++) {
      let neighbour = current.edges[i]
      if (!neighbour) continue
      let smaller = false
      const minimums = getSmallestNextValues(
        current?.shortestPaths,
        neighbour.shortestPaths,
        i
      )
      for (let j = 0; j < 4; j++) {
        if (neighbour.shortestPaths[j] > minimums[j]) {
          neighbour.shortestPaths[j] = minimums[j]
          smaller = true
        }
      }
      if (smaller) positions.push(neighbour)
    }
  }
}

function getSmallestNextValues(
  costs: number[],
  nextCosts: number[],
  direction: number
) {
  const minimums = [2 ** 31, 2 ** 31, 2 ** 31, 2 ** 31]
  const directionalCosts: number[][] = [
    [direction, 0],
    [(direction + 5) % 4, 1000],
    [(direction + 6) % 4, 2000],
    [(direction + 7) % 4, 1000],
  ]

  let minCost = directionalCosts.reduce((min, current) => {
    let currentValue = costs[current[0]] + 1 + current[1]
    return min < currentValue ? min : currentValue
  }, 2 ** 31)

  if (minCost < nextCosts[direction]) {
    minimums[direction] = minCost
    directionalCosts.forEach((facing, cost) =>
      minimums[facing[0]] > minimums[direction] + facing[1]
        ? (minimums[facing[0]] = minimums[direction] + facing[1])
        : null
    )
    return minimums
  }
  return nextCosts
}

export function partTwo(input: string[]): number | string {
  const { graph, start, end } = parse(input)
  findShortestPaths(graph, start)
  const allPaths = findAllPaths(end)
  return allPaths.size
}

function findAllPaths(end: FacingNode): Set<FacingNode> {
  let min = end.shortestPaths.reduce(
    (min, current) => (min < current ? min : current),
    2 ** 31
  )
  let minIndex = 0
  while (end.shortestPaths[minIndex] != min) minIndex++
  const paths = new Set<FacingNode>()
  paths.add(end)
  const process: { node: FacingNode; facing: number }[] = [
    { node: end, facing: minIndex },
  ]
  while (process.length > 0) {
    let current = process.shift()!
    const prior = findPriorNeighbours(current.node, current?.facing)
    prior.forEach((p) => {
      if (!paths.has(p.node)) process.push(p)
      paths.add(p.node)
    })
  }
  return paths
}

function findPriorNeighbours(node: FacingNode, direction: number) {
  const directionalCosts: number[][] = [
    [direction, 1],
    [(direction + 5) % 4, 1001],
    [(direction + 6) % 4, 2001],
    [(direction + 7) % 4, 1001],
  ]
  const res: { node: FacingNode; facing: number }[] = []

  for (let i = 0; i < 4; i++) {
    const edge = node.edges[directionalCosts[i][0]]
    const opposite = directionalCosts[(i + 6) % 4]

    if (
      edge &&
      edge.shortestPaths[opposite[0]] ==
        node.shortestPaths[direction] - opposite[1]
    )
      res.push({ node: edge, facing: opposite[0] })
  }
  return res
}
