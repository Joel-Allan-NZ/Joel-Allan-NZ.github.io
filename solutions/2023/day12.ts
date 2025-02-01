export function partOne(input: string[]): number | string {
  var regions = parse(input)
  return regions
    .values()
    .reduce(
      (total, current) =>
        total +
        current.length * current.reduce((t, c) => t + 4 - c.Edges.length, 0),
      0
    )
}

interface Node {
  X: number
  Y: number
  C: string
  Region: number
  Edges: Node[]
}

function parse(input: string[]): Map<number, Node[]> {
  const nodes: Node[] = []
  let lastRow: Node[] = []
  input.forEach((line, y) => {
    const currentRow: Node[] = []
    line.split('').forEach((c, x) => {
      currentRow.push({ X: x, Y: y, C: c, Region: 0, Edges: [] })
      nodes.push(currentRow[x])
      if (x > 0 && currentRow[x - 1].C == c) {
        currentRow[x - 1].Edges.push(currentRow[x])
        currentRow[x].Edges.push(currentRow[x - 1])
      }
      if (y > 0 && lastRow[x].C == c) {
        currentRow[x].Edges.push(lastRow[x])
        lastRow[x].Edges.push(currentRow[x])
      }
    })
    lastRow = currentRow
  })

  let region = 1
  nodes.forEach((node) => {
    if (node.Region == 0) {
      node.Region = region
      region++
      findRegion(node)
    }
  })
  return Map.groupBy(nodes, (node) => node.Region)
}

function findRegion(node: Node) {
  node.Edges.forEach((neighbour) => {
    if (neighbour.Region == 0) {
      neighbour.Region = node.Region
      findRegion(neighbour)
    }
  })
}

export function partTwo(input: string[]): number | string {
  var regions = parse(input)

  return regions.values().reduce((total, region) => {
    return (
      total +
      region.reduce((t, node) => t + region.length * countNodeVertices(node), 0)
    )
  }, 0)
}

function countNodeVertices(node: Node): number {
  if (node.Edges.length == 0) return 4
  if (node.Edges.length == 1) return 2

  const edgeCombinations = node.Edges.slice(0, -1).flatMap((edge, index) => {
    return node.Edges.slice(index + 1).map((e) => [edge, e])
  })

  let outsideCorner = true
  const pairSum = edgeCombinations.reduce((total, pair) => {
    if (
      (pair[0].X == pair[1].X && pair[1].X == node.X) ||
      (pair[0].Y == pair[1].Y && pair[1].Y == node.Y)
    )
      outsideCorner = false
    else {
      let insideCorner =
        pair[0].Edges.filter((e) => pair[1].Edges.includes(e)).length == 1
      if (insideCorner) return total + 1
    }
    return total
  }, 0)
  return outsideCorner ? pairSum + 1 : pairSum
}
