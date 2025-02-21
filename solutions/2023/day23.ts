export function partOne(input: string[]): number | string {
  const start = [input[0].indexOf('.'), 0]
  const end = [input[input.length - 1].indexOf('.'), input.length - 1]
  const queue: number[][] = [start]
  const distances = new Map<string, number>()
  distances.set(start.join(','), 0)

  while (queue.length > 0) {
    const current = queue.shift()!
    const neighbours = findOrthogonalNeighbours(current, input)
    const oldDistance = distances.get(current.join(','))!

    neighbours.forEach((neighbour) => {
      const distance = distances.get(neighbour.join(','))
      if (!distance || distance < oldDistance - 1) {
        distances.set(neighbour.join(','), oldDistance + 1)
        const next = handleSlopes(input, neighbour)
        if (next[0] != current[0] || next[1] != current[1]) {
          if (next[0] != neighbour[0] || next[1] != neighbour[1]) {
            distances.set(next.join(','), oldDistance + 2)
          }
          queue.push(next)
        }
      }
    })
  }

  return distances.get(end.join(','))!
}

function handleSlopes(input: string[], coords: number[]): number[] {
  switch (input[coords[1]][coords[0]]) {
    case '>':
      return [coords[0] + 1, coords[1]]
    case '<':
      return [coords[0] - 1, coords[1]]
    case '^':
      return [coords[0], coords[1] - 1]
    case 'v':
      return [coords[0], coords[1] + 1]
    default:
      return coords
  }
}

function findOrthogonalNeighbours(
  coords: number[],
  input: string[]
): number[][] {
  return [
    [coords[0] + 1, coords[1]],
    [coords[0] - 1, coords[1]],
    [coords[0], coords[1] - 1],
    [coords[0], coords[1] + 1],
  ].filter((step) => inBounds(step, input) && input[step[1]][step[0]] != '#')
}

function inBounds(coords: number[], input: string[]) {
  return (
    coords[0] > -1 &&
    coords[1] > -1 &&
    coords[0] < input[0].length &&
    coords[1] < input.length
  )
}

export function partTwo(input: string[]): number | string {
  const start = [input[0].indexOf('.'), 0]
  const end = [input.length - 1, input[input.length - 1].indexOf('.')]
  const adjancencies = findAdjacencies(input, start, end)

  return findLongest(adjancencies, 0, 0n, 0)
}

function findLongest(
  nodes: Map<number, number>[],
  current: number,
  bitmask: bigint,
  distance: number
): number {
  let max = distance
  nodes[current].entries().forEach((child) => {
    const big = 1n << BigInt(child[0])
    if ((bitmask & big) == 0n) {
      max = Math.max(
        max,
        findLongest(nodes, child[0], bitmask | big, distance + child[1])
      )
    }
  })
  return max
}

function findAdjacencies(
  input: string[],
  start: number[],
  end: number[]
): Map<number, number>[] {
  const adjacencies: number[][] = [start, end]

  input.forEach((line, y) => {
    line.split('').forEach((c, x) => {
      if (c == '.') {
        const neighbours = findOrthogonalNeighbours([x, y], input).filter(
          (x) => input[x[1]][x[0]] != '.'
        )
        if (neighbours.length > 2) adjacencies.push([x, y])
      }
    })
  })

  return connectNodes(adjacencies, input)
}

function connectNodes(
  nodes: number[][],
  input: string[]
): Map<number, number>[] {
  const queue: number[][] = []
  const visited = new Set<string>()
  const dicts: Map<number, number>[] = []
  nodes.forEach((x) => dicts.push(new Map<number, number>()))

  nodes.forEach((node) => {
    visited.clear()
    queue.push([...node, 0])

    while (queue.length > 0) {
      const current = queue.shift()!
      const neighbours = findOrthogonalNeighbours(current, input)

      for (let n of neighbours) {
        if (n[0] == node[0] && n[1] == node[1]) continue
        const index = nodes.findIndex((x) => x[0] == n[0] && x[1] == n[1])
        if (index != -1) {
          const existingIndex = nodes.indexOf(node)
          let existing = dicts[existingIndex].get(index)
          existing = Math.max(current[2] + 1, existing ?? 0)
          dicts[existingIndex].set(index, existing)
          dicts[index].set(existingIndex, existing)
        } else if (!visited.has(n.join(','))) {
          visited.add(n.join(','))
          queue.push([...n, current[2] + 1])
        }
      }
    }
  })

  communityOptimization(dicts, nodes)
  return dicts
}

function communityOptimization(
  dicts: Map<number, number>[],
  nodes: number[][]
): void {
  const originalOrder = [...nodes]

  const top = nodes
    .sort((x, y) => x[1] - y[1])
    .slice(0, 6)
    .sort((x, y) => y[0] - x[0])
    .map((t) => originalOrder.indexOf(t))

  const bottom = nodes
    .sort((x, y) => y[1] - x[1])
    .slice(0, 6)
    .sort((x, y) => y[0] - x[0])
    .map((t) => originalOrder.indexOf(t))

  const left = nodes
    .sort((x, y) => x[0] - y[0])
    .slice(0, 6)
    .sort((x, y) => y[1] - x[1])
    .map((t) => originalOrder.indexOf(t))
  const right = nodes
    .sort((x, y) => y[0] - x[0])
    .slice(0, 6)
    .sort((x, y) => y[1] - x[1])
    .map((t) => originalOrder.indexOf(t))

  for (let i = 0; i < 5; i++) {
    top.slice(i + 1).forEach((node) => dicts[top[i]].delete(node))
    bottom.slice(i + 1).forEach((node) => dicts[bottom[i]].delete(node))
    left.slice(i + 1).forEach((node) => dicts[left[i]].delete(node))
    right.slice(i + 1).forEach((node) => dicts[right[i]].delete(node))
  }
}
