export function partOne(input: string[]): number | string {
  const cache = new Map<number, Map<number, number>>()

  return input[0]
    .split(' ')
    .map((x) => parseInt(x))
    .reduce((total, current) => total + applyRules(current, 25, cache), 0)
}

export function applyRules(
  stone: number,
  count: number,
  cache: Map<number, Map<number, number>>
): number {
  if (cache.has(stone)) {
    const blinks = cache.get(stone)
    if (blinks?.has(count)) return blinks.get(count)!
  }

  if (count == 0) return nestedAdd(cache, stone, 0, 1)
  if (stone == 0)
    return nestedAdd(cache, stone, count, applyRules(1, count - 1, cache))
  if (Math.floor(Math.log10(stone)) % 2 == 0)
    return nestedAdd(
      cache,
      stone,
      count,
      applyRules(stone * 2024, count - 1, cache)
    )

  let s = stone.toString()
  let half = Math.floor(s.length / 2)
  return nestedAdd(
    cache,
    stone,
    count,
    applyRules(parseInt(s.slice(0, half)), count - 1, cache) +
      applyRules(parseInt(s.slice(half)), count - 1, cache)
  )
}

function nestedAdd<T, U, V>(
  map: Map<T, Map<U, V>>,
  key: T,
  nestedKey: U,
  value: V
): V {
  if (!map.has(key)) {
    map.set(key, new Map<U, V>([[nestedKey, value]]))
  } else if (!map.get(key)?.has(nestedKey)) {
    map.get(key)?.set(nestedKey, value)
  }
  return value
}

export function partTwo(input: string[]): number | string {
  const cache = new Map<number, Map<number, number>>()

  return input[0]
    .split(' ')
    .map((x) => parseInt(x))
    .reduce((total, current) => total + applyRules(current, 75, cache), 0)
}
