export function partOne(input: string[]): number | string {
  return findComplexity(2, input)
}

interface Key {
  x: number
  y: number
  c: string
}

class RobotCache {
  cache: Map<string, Map<string, Map<number, number>>>
  constructor() {
    this.cache = new Map<string, Map<string, Map<number, number>>>()
  }

  setCache(a: string, b: string, robots: number, count: number) {
    if (!this.cache.has(a))
      this.cache.set(a, new Map<string, Map<number, number>>())
    if (!this.cache.get(a)?.has(b))
      this.cache.get(a)?.set(b, new Map<number, number>())

    this.cache.get(a)?.get(b)?.set(robots, count)
  }

  tryGetCache(a: string, b: string, robots: number) {
    return this.cache.get(a)?.get(b)?.get(robots)
  }
}

function findComplexity(robotCount: number, input: string[]): number {
  const { numPad, directionalPad } = generateKeyDictionaries()
  const cache = new RobotCache()
  let score = 0

  for (let line of input) {
    const moves = numPadMoves(line, 'A', numPad)

    const minCost = moves.reduce((minimum, current) => {
      const pairs = current
        .split('')
        .map((item, index) => [index == 0 ? 'A' : current[index - 1], item])
      const pairsCost = pairs.reduce((total, pair) => {
        return (
          total + findMinimumStepCost(pair, robotCount, cache, directionalPad)
        )
      }, 0)
      return pairsCost < minimum ? pairsCost : minimum
    }, Number.POSITIVE_INFINITY)

    score += minCost * parseInt(line.slice(0, line.length - 1))
  }
  return score
}

function generateKeyDictionaries(): {
  numPad: Map<string, Key>
  directionalPad: Map<string, Key>
} {
  const numKeys = ['789', '456', '123', ' 0A']
  const dirKeys = [' ^A', '<v>']
  const directionalPad = new Map<string, Key>()
  const numPad = new Map<string, Key>()
  dirKeys
    .flatMap((row, y) => row.split('').map((c, x) => ({ x, y, c })))
    .forEach((key) => {
      if (key.c != ' ') directionalPad.set(key.c, key)
    })
  numKeys
    .flatMap((row, y) => row.split('').map((c, x) => ({ x, y, c })))
    .forEach((key) => {
      if (key.c != ' ') numPad.set(key.c, key)
    })
  return { numPad, directionalPad }
}

function numPadMoves(
  code: string,
  start: string,
  keys: Map<string, Key>
): string[] {
  const result: string[] = []
  const end = code[0]
  const moves = generateMoves(keys.get(start)!, keys.get(end)!)

  moves.forEach((move) => {
    if (code.length == 1) moves.forEach((move) => result.push(move + 'A'))
    else
      moves
        .flatMap((move) =>
          numPadMoves(code.slice(1), end, keys).map(
            (partialPath) => move + 'A' + partialPath
          )
        )
        .forEach((move) => result.push(move))
  })
  return result
}

function generateMoves(start: Key, end: Key): string[] {
  const result: string[] = []
  const stack: { x: number; y: number; path: string[] }[] = []
  stack.push({ x: start.x, y: start.y, path: [] })

  while (stack.length > 0) {
    const { x, y, path } = stack.shift()!
    if (x == end.x && y == end.y) {
      result.push(path.join(''))
      continue
    }
    const potentialNumber = parseInt(end.c)
    if (x == 0 && y == 3 && !isNaN(potentialNumber)) continue
    if (x == 0 && y == 0 && isNaN(potentialNumber)) continue

    if (x != end.x)
      stack.push(
        x < end.x
          ? { x: x + 1, y, path: [...path, '>'] }
          : { x: x - 1, y, path: [...path, '<'] }
      )
    if (y != end.y)
      stack.push(
        y < end.y
          ? { x, y: y + 1, path: [...path, 'v'] }
          : { x, y: y - 1, path: [...path, '^'] }
      )
  }
  return result
}

function findMinimumStepCost(
  step: string[],
  robotCount: number,
  cache: RobotCache,
  directionalPad: Map<string, Key>
): number {
  let cachedValue = cache.tryGetCache(step[0], step[1], robotCount)
  if (!cachedValue) {
    const moves = generateMoves(
      directionalPad.get(step[0])!,
      directionalPad.get(step[1])!
    )

    cachedValue = moves.reduce((min, move) => {
      const paths = (move + 'A')
        .split('')
        .map((c, i) => [i == 0 ? 'A' : move[i - 1], c])

      const cost = pathCost(paths, robotCount, cache, directionalPad)

      return cost > min ? min : cost
    }, Number.POSITIVE_INFINITY)

    cache.setCache(step[0], step[1], robotCount, cachedValue)
  }
  return cachedValue
}

function pathCost(
  paths: string[][],
  robotCount: number,
  cache: RobotCache,
  directionalPad: Map<string, Key>
): number {
  return paths.reduce((total, path) => {
    return robotCount == 1
      ? total + 1
      : total + findMinimumStepCost(path, robotCount - 1, cache, directionalPad)
  }, 0)
}

export function partTwo(input: string[]): number | string {
  return findComplexity(25, input)
}
