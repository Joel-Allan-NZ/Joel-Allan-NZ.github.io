export function partOne(input: string[]): number | string {
  const trails = parse(input)
  const trailHeads = trails.flatMap((row) =>
    row.filter((col) => col.value == 0)
  )

  return trailHeads.reduce(
    (total, head) =>
      total + findNines(trails, head, new Map<number, Set<number>>()),
    0
  )
}

function findNines(
  trails: Node[][],
  current: Node,
  nines: Map<number, Set<number>>
) {
  current.edges.forEach((edge) => {
    const node = trails[edge[0]][edge[1]]
    if (node.value == 9) {
      if (!nines.has(node.y)) nines.set(node.y, new Set<number>([node.x]))
      else nines.get(node.y)?.add(node.x)
    } else findNines(trails, node, nines)
  })

  return nines.keys().reduce((t, y) => nines.get(y)!.size + t, 0)
}

interface Node {
  value: number
  edges: number[][]
  x: number
  y: number
}

function parse(input: string[]): Node[][] {
  const trailMap: Node[][] = []
  input.forEach((line, y) => {
    trailMap.push([])
    line.split('').forEach((val, x) => {
      trailMap[y].push({ value: parseInt(val), edges: [], x, y })

      if (y != 0) {
        if (trailMap[y - 1][x].value == trailMap[y][x].value + 1)
          trailMap[y][x].edges.push([y - 1, x])
        else if (trailMap[y - 1][x].value == trailMap[y][x].value - 1)
          trailMap[y - 1][x].edges.push([y, x])
      }

      if (x != 0) {
        if (trailMap[y][x - 1].value == trailMap[y][x].value + 1)
          trailMap[y][x].edges.push([y, x - 1])
        else if (trailMap[y][x - 1].value == trailMap[y][x].value - 1)
          trailMap[y][x - 1].edges.push([y, x])
      }
    })
  })
  return trailMap
}

export function partTwo(input: string[]): number | string {
  const trails = parse(input)
  const trailHeads = trails.flatMap((row) =>
    row.filter((col) => col.value == 0)
  )

  return trailHeads.reduce((total, head) => {
    let score = 0
    const toVisit: Node[] = [head]

    while (toVisit.length > 0) {
      const current = toVisit.shift()

      current!.edges.forEach((edge) => {
        const node = trails[edge[0]][edge[1]]
        if (node.value == 9) score++
        else toVisit.push(node)
      })
    }

    return score + total
  }, 0)
}
