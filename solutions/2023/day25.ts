export function partOne(input: string[]): number | string {
  const graph = new Map<string, Map<string, number>>()
  for (let line of input) {
    const split = line.split(' ')
    const a = split[0].slice(0, 3)

    if (!graph.has(a)) graph.set(a, new Map<string, number>())

    for (let add of split.slice(1)) {
      if (!graph.has(add)) graph.set(add, new Map<string, number>())

      graph.get(a)!.set(add, 1)
      graph.get(add)!.set(a, 1)
    }
  }

  while (true) {
    const copy = new Map<string, Map<string, number>>()
    graph.keys().forEach((key) => {
      copy.set(key, new Map<string, number>())
      graph
        .get(key)!
        .entries()
        .forEach((v) => copy.get(key)!.set(v[0], v[1]))
    })
    const count = karger(copy)
    const entries = copy.entries().toArray()

    if (entries[0][1].get(entries[1][0]) == 3) {
      return count.get(entries[0][0])! * count.get(entries[1][0])!
    }
  }
}

function karger(graph: Map<string, Map<string, number>>): Map<string, number> {
  const count = new Map<string, number>()
  graph.keys().forEach((key) => count.set(key, 1))

  while (graph.size > 2) {
    const edge = getRandomEdge(graph)
    merge(graph, edge)
    const newCount = count.get(edge[0])! + count.get(edge[1])!
    count.set(edge[0], newCount)
  }
  return count
}

function getRandomEdge(graph: Map<string, Map<string, number>>): string[] {
  const u = graph.keys().toArray()[Math.floor(Math.random() * graph.size)]
  const vSize = graph.get(u)!.size
  const v = graph.get(u)!.keys().toArray()[Math.floor(Math.random() * vSize)]

  return [u, v]
}

function merge(graph: Map<string, Map<string, number>>, edge: string[]): void {
  const vEdges = graph.get(edge[1])!.entries().toArray()

  for (let e of vEdges) {
    if (e[0] != edge[0]) {
      let uDistance = graph.get(edge[0])?.get(e[0])
      uDistance ??= 0
      graph.get(edge[0])?.set(e[0], e[1] + uDistance)

      graph.get(e[0])?.set(edge[0], graph.get(edge[0])!.get(e[0])!)
    }
    graph.get(e[0])?.delete(edge[1])
  }

  graph.get(edge[0])?.delete(edge[1])
  graph.delete(edge[1])
}

export function partTwo(input: string[]): number | string {
  return 'Free Star! ⭐'
}
