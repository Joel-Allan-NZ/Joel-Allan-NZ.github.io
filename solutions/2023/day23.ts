export function partOne(input: string[]): number | string {
  const graph = parse(input)
  const trios = new Set<string>()

  const tKeys = graph.keys().filter((key) => key.startsWith('t'))
  tKeys.forEach((key) => {
    const neighbours = graph.get(key)!
    neighbours.forEach((neighbour) => {
      const intersect = new Set([...neighbours]).intersection(
        new Set([...graph.get(neighbour)!])
      )
      intersect.forEach((n) => {
        const v = [key, n, neighbour]
        trios.add(v.sort().join('|'))
      })
    })
  })
  return trios.size
}

function parse(input: string[]): Map<string, string[]> {
  const graph = new Map<string, string[]>()
  input.forEach((line) => {
    let split = line.split('-')
    if (!graph.has(split[0])) graph.set(split[0], [split[1]])
    else graph.get(split[0])?.push(split[1])

    if (!graph.has(split[1])) graph.set(split[1], [split[0]])
    else graph.get(split[1])?.push(split[0])
  })
  return graph
}

export function partTwo(input: string[]): number | string {
  const graph = parse(input)
  const cliques: string[] = []

  bronKerbosch(
    new Set<string>(),
    new Set([...graph.keys()]),
    new Set<string>(),
    graph,
    cliques
  )
  return cliques.reduce((longest, current) =>
    current.length > longest.length ? current : longest
  )
}

function bronKerbosch(
  r: Set<string>,
  p: Set<string>,
  x: Set<string>,
  graph: Map<string, string[]>,
  cliques: string[]
) {
  if (p.size == 0 && x.size == 0) {
    cliques.push([...r].sort().join(','))
    return
  }
  const pivot = [...p.union(x)].reduce(
    (max, current) =>
      graph.get(current)!.length > (graph.get(max)?.length ?? 0)
        ? current
        : max,
    ''
  )
  const pc: Set<string> = new Set(
    [...p].filter((x) => !graph.get(pivot)!.includes(x))
  )

  pc.forEach((node) => {
    const neighbourSet = new Set(graph.get(node)!)
    bronKerbosch(
      new Set([...r, node]),
      p.intersection(neighbourSet),
      x.intersection(neighbourSet),
      graph,
      cliques
    )
    p.delete(node)
    x.add(node)
  })
}
