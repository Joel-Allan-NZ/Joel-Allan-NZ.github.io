export function partOne(input: string[]): number | string {
  const { edges, updates } = parse(input)
  return updates.reduce(
    (total, update) =>
      isValidOrder(edges, update)
        ? total + update[Math.floor(update.length / 2)]
        : total,
    0
  )
}

export function partTwo(input: string[]): number | string {
  const { edges, updates } = parse(input)
  return updates.reduce((total, update) => {
    if (isValidOrder(edges, update)) return total
    update.sort((a, b) => {
      return edges.get(a)!.includes(b) ? -1 : edges.get(b)!.includes(a) ? 1 : 0
    })
    return total + update[Math.floor(update.length / 2)]
  }, 0)
}

function isValidOrder(edges: Map<number, number[]>, update: number[]) {
  let valid = update.every((item, index) => {
    return (
      update.slice(index + 1).find((after) => {
        return edges.has(after) && edges.get(after)!.includes(item)
      }) === undefined
    )
  })
  return valid
}

function parse(input: string[]): {
  edges: Map<number, number[]>
  updates: number[][]
} {
  const edges = new Map<number, number[]>()
  const updates: number[][] = []
  let updating = false

  input.forEach((line) => {
    if (!line || line.length == 0) updating = true
    else if (updating) {
      updates.push(line.split(',').map((x) => parseInt(x)))
    } else if (!updating) {
      const split = line.split('|').map((x) => parseInt(x))
      if (!edges.has(split[0])) edges.set(split[0], [split[1]])
      else if (!edges.get(split[0])!.includes(split[1]))
        edges.set(split[0], [...edges.get(split[0])!, split[1]])
    }
  })

  return { edges, updates }
}
