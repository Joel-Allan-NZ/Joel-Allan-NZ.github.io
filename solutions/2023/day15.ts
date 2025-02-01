export function partOne(input: string[]): number | string {
  const parsed = parse(input, false)
  if (!parsed) return 'parse error'
  const { graph, robot, directions } = parsed

  makeAllMoves(graph, robot, directions, false)
  return calculateGPSSum(graph, 'O')
}

interface Node {
  character: string
}

interface CoordNode {
  x: number
  y: number
  node: Node
}

function makeAllMoves(
  graph: Map<number, Map<number, Node>>,
  robot: CoordNode,
  directions: string,
  wide: boolean
): void {
  directions.split('').forEach((direction) => {
    const toMoveColumns = wide
      ? findChangingWideNodes(graph, robot, direction)
      : findChangingNodes(graph, robot, direction)

    if (toMoveColumns.length > 0 && toMoveColumns[0].length > 0) {
      toMoveColumns.forEach((toMove) => {
        if (toMove.length > 0) {
          for (let i = toMove.length - 1; i > 0; i--) {
            toMove[i].node.character = toMove[i - 1].node.character
          }
          if (toMove.length > 1 && toMove[1].node.character == '@') {
            robot.x = toMove[1].x
            robot.y = toMove[1].y
          }
          toMove[0].node.character = '.'
          robot.node = graph.get(robot.y)?.get(robot.x)!
        }
      })
    }
  })
}

function coordOffset(direction: string): number[] {
  if (direction == 'v') return [0, 1]
  if (direction == '^') return [0, -1]
  if (direction == '<') return [-1, 0]
  return [1, 0]
}

function findChangingNodes(
  graph: Map<number, Map<number, Node>>,
  robot: CoordNode,
  direction: string
): CoordNode[][] {
  let toMove: CoordNode[] = [robot]
  const offset = coordOffset(direction)
  let steps = 1
  let lastValue = robot.node.character

  while (lastValue != '.') {
    let nextCoord = {
      x: robot.x + steps * offset[0],
      y: robot.y + steps * offset[1],
    }
    let nextNode = graph.get(nextCoord.y)?.get(nextCoord.x)!
    toMove.push({ x: nextCoord.x, y: nextCoord.y, node: nextNode })
    steps++

    lastValue = nextNode.character

    if (lastValue == '#') {
      toMove = []
      break
    }
  }
  return [toMove]
}

function parse(
  input: string[],
  wide: boolean = false
):
  | {
      graph: Map<number, Map<number, Node>>
      robot: CoordNode
      directions: string
    }
  | undefined {
  const graph = new Map<number, Map<number, Node>>()
  const robot = { x: 0, y: 0, node: { character: '_' } }

  for (const [y, line] of input.entries()) {
    if (line.length == 0)
      return {
        graph,
        robot,
        directions: input.slice(y + 1).reduce((x, y) => x + y),
      }

    line.split('').forEach((c, x) => {
      if (!graph.has(y)) graph.set(y, new Map<number, Node>())

      if (wide) {
        let first = c == 'O' ? '[' : c
        let second = first == '[' ? ']' : c == '#' ? '#' : '.'
        graph.get(y)!.set(x * 2, { character: first })
        graph.get(y)!.set(x * 2 + 1, { character: second })
      } else graph.get(y)!.set(x, { character: c })

      if (c === '@') {
        robot.x = wide ? 2 * x : x
        robot.y = y
        robot.node = graph.get(robot.y)!.get(robot.x)!
      }
    })
  }
}

function calculateGPSSum(
  graph: Map<number, Map<number, Node>>,
  match: string
): number {
  return graph.keys().reduce((total, key) => {
    return (
      total +
      graph
        .get(key)!
        .keys()
        .reduce(
          (t, nestedKey) =>
            graph.get(key)!.get(nestedKey)!.character == match
              ? t + nestedKey + 100 * key
              : t,
          0
        )
    )
  }, 0)
}

export function partTwo(input: string[]): number | string {
  const parsed = parse(input, true)
  if (!parsed) return 'parse error'
  const { graph, robot, directions } = parsed

  makeAllMoves(graph, robot, directions, true)

  return calculateGPSSum(graph, '[')
}

function findChangingWideNodes(
  graph: Map<number, Map<number, Node>>,
  robot: CoordNode,
  direction: string
): CoordNode[][] {
  if (direction == '<' || direction == '>')
    return findChangingNodes(graph, robot, direction)

  const toMove = new Map<number, CoordNode[]>()
  toMove.set(robot.x, [robot])
  const offset = coordOffset(direction)
  while (true) {
    const { isLastRow: lastRow, nodes: row } = findNextRow(
      graph,
      toMove,
      offset
    )

    row.forEach((node) => {
      if (toMove.has(node.x)) toMove.get(node.x)!.push(node)
      else toMove.set(node.x, [node])
    })

    if (row.length == 0) return []
    else if (lastRow) return [...toMove.values().toArray()]
  }
}

function findNextRow(
  graph: Map<number, Map<number, Node>>,
  toMove: Map<number, CoordNode[]>,
  offset: number[]
): { isLastRow: boolean; nodes: CoordNode[] } {
  let nodes: CoordNode[] = []
  let isLastRow = true
  let filtered = toMove
    .values()
    .filter((m) => m[m.length - 1].node.character != '.')

  for (let column of filtered) {
    const { x, y } = column[column.length - 1]
    let nextNode = graph.get(y + offset[1])?.get(x)!
    nodes.push({ x, y: y + offset[1], node: nextNode })

    if (nextNode.character == '#') return { isLastRow: false, nodes: [] }

    if (nextNode.character != '.') {
      isLastRow = false
      let xOffset = nextNode.character == ']' ? x - 1 : x + 1
      let offsetValue = graph.get(y + offset[1])?.get(xOffset)!

      nodes.push({ x: xOffset, y: y + offset[1], node: offsetValue })
    }
  }
  return { isLastRow, nodes }
}
