export function partOne(input: string[]): number | string {
  const cache = new Map<string, number>()
  let result = input.reduce((total, line) => {
    var split = line.split(/ /)
    split[0] = split[0].split(/\.+/).join('.')
    return (
      total +
      findValidArrangements(
        cache,
        split[0],
        split[1].split(/,/).map((x) => parseInt(x))
      )
    )
  }, 0)
  return result
}

function findValidArrangements(
  cache: Map<string, number>,
  springs: string,
  lengths: number[]
): number {
  const line = springs + ' ' + lengths.join(',')

  let result = cache.get(line)
  if (result) return result

  if (lengths.length == 0) return springs.includes('#') ? 0 : 1
  if (springs.length - lengths.reduce((a, b) => a + b) - lengths.length < -1)
    return 0

  const lengthFits = !springs.slice(0, lengths[0]).includes('.')
  if (springs.length == lengths[0]) return lengthFits ? 1 : 0

  return (cache[line] ??=
    (springs[0] != '#'
      ? findValidArrangements(cache, trimWorking(springs, 1), lengths)
      : 0) +
    (lengthFits && springs[lengths[0]] != '#'
      ? findValidArrangements(
          cache,
          trimWorking(springs, lengths[0] + 1),
          lengths.slice(1)
        )
      : 0))
}

function trimWorking(untrimmed: string, start: number) {
  if (start >= untrimmed.length) return ''

  return untrimmed[start] == '.'
    ? untrimmed.slice(start + 1)
    : untrimmed.slice(start)
}

export function partTwo(input: string[]): number | string {
  const cache = new Map<string, number>()

  let result = 0
  for (const line of input) {
    const [row, groups] = line
      .split(' ')
      .map((x, i) =>
        i == 1 ? x.split(',').map((y) => parseInt(y)) : x.split(/\.+/).join('.')
      )
    result += findValidArrangements(
      cache,
      Array(5).fill(row).join('?'),
      Array(5).fill(groups).flat()
    )
  }
  return result
}
