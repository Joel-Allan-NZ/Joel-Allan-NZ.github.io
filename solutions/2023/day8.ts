export function partOne(input: string[]): number | string {
  const { directions, graph } = parse(input)
  let steps = 0
  let position = 'AAA'
  let directionIndex = 0

  while (position != 'ZZZ') {
    const direction = directions[directionIndex]
    position =
      direction == 'L' ? graph.get(position)![0] : graph.get(position)![1]
    steps++
    directionIndex =
      directionIndex == directions.length - 1 ? 0 : directionIndex + 1
  }
  return steps
}

function parse(input: string[]): {
  directions: string
  graph: Map<string, string[]>
} {
  const directions = input[0]
  const graph = new Map<string, string[]>()
  input.slice(2).forEach((line) => {
    const paths = [line.slice(7, 10), line.slice(12, 15)]
    graph.set(line.slice(0, 3), paths)
  })
  return { directions, graph }
}

export function partTwo(input: string[]): number | string {
  const { directions, graph } = parse(input)
  let loops = [...graph.keys().filter((x) => x.endsWith('A'))].map((x) =>
    findLoop(graph, x, directions)
  )
  const factors = new Set<number>()
  const g = gcd(loops[0], loops[1])
  factors.add(g)
  loops.forEach((loopLength) => factors.add(loopLength / g))

  return factors.values().reduce((total, x) => x * total, 1)
}

function findLoop(
  graph: Map<string, string[]>,
  position: string,
  directions: string
) {
  const travelled = new Map<string, number[]>([[position, [0]]])
  let steps = 0
  let directionIndex = 0

  while (true) {
    const direction = directions[directionIndex]
    position =
      direction == 'L' ? graph.get(position)![0] : graph.get(position)![1]
    steps++
    directionIndex =
      directionIndex == directions.length - 1 ? 0 : directionIndex + 1

    const been = travelled.get(position)
    if (!been) travelled.set(position, [steps])
    else travelled.set(position, [...been, steps])

    if (been) {
      if (
        been[been.length - 1] % directions.length ==
        steps % directions.length
      )
        return been[been.length - 1]
    }
  }
}

function gcd(a: number, b: number): number {
  while (b != 0) {
    let t = b
    b = a % b
    a = t
  }
  return a
}
