export function partOne(input: string[]): number | string {
  const { seeds, reduced } = parseAndReduce(input)

  return seeds.reduce((min, seed) => {
    const inRange = reduced.find(
      (range) => range.start <= seed && range.end >= seed
    )
    const value = inRange ? seed + inRange.offset : seed
    return min < value ? min : value
  }, 2 ** 63)
}

interface OffsetRange {
  start: number
  end: number
  offset: number
}

function parseAndReduce(input: string[]): {
  seeds: number[]
  reduced: OffsetRange[]
} {
  const seeds = input[0]
    .split(' ')
    .slice(1)
    .map((x) => parseInt(x))

  let reduced: OffsetRange[] = []
  let next: OffsetRange[] = []

  for (let i = 3; i < input.length; i++) {
    const line = input[i]
    if (!line || line.length == 0) {
      i++
      reduced = reduced.length == 0 ? next : merge(reduced, next)
      next = []
    } else {
      const split = line.split(' ').map((x) => parseInt(x))
      next.push({
        start: split[1],
        end: split[2] + split[1] - 1,
        offset: split[0] - split[1],
      })
    }
  }
  return { seeds, reduced: merge(reduced, next) }
}

function merge(a: OffsetRange[], b: OffsetRange[]): OffsetRange[] {
  const result: OffsetRange[] = []
  a.sort((x, y) => x.start + x.offset - (y.start + y.offset))
  b.sort((x, y) => x.start - y.start)
  let aRange = a.shift()
  let bRange = b.shift()

  while (aRange && bRange) {
    result.push(mergeRanges(aRange, bRange))

    if (aRange.end < aRange.start) aRange = a.shift()
    if (bRange.end < bRange.start) bRange = b.shift()
  }

  if (aRange && aRange.end >= aRange.start) result.push(aRange)
  if (bRange && bRange.end >= bRange.start) result.push(bRange)

  return [...result, ...b, ...a]
}

function mergeRanges(aRange: OffsetRange, bRange: OffsetRange): OffsetRange {
  let result: OffsetRange = { start: 0, end: 0, offset: 0 }
  if (aRange.start + aRange.offset == bRange.start) {
    const end = Math.min(aRange.end + aRange.offset, bRange.end) - aRange.offset
    result = { start: aRange.start, end, offset: aRange.offset + bRange.offset }
    aRange.start = end + 1
    bRange.start = end + aRange.offset + 1
  } else {
    let smaller = aRange
    let end = 0
    if (aRange.start + aRange.offset < bRange.start) {
      end = Math.min(aRange.end, bRange.start - 1 - aRange.offset)
    } else {
      smaller = bRange
      end = Math.min(bRange.end, aRange.start - 1 + aRange.offset)
    }
    result = { start: smaller.start, end, offset: smaller.offset }
    smaller.start = end + 1
  }
  return result
}

export function partTwo(input: string[]): number | string {
  const { seeds, reduced } = parseAndReduce(input)
  reduced.sort((x, y) => x.start + x.offset - (y.start + y.offset))
  const seedRanges = seeds
    .slice(1)
    .map((seed, index) => ({
      start: seeds[index],
      end: seeds[index] + seed - 1,
    }))
    .filter((x, i) => i % 2 == 0)
    .toSorted((x, y) => x.start - y.start)

  for (const range of reduced) {
    for (const seedRange of seedRanges) {
      if (seedRange.start >= range.start && seedRange.start <= range.end)
        return seedRange.start + range.offset
      if (seedRange.start <= range.start && seedRange.end >= range.start)
        return range.start + range.offset
    }
  }
  return 'Not Found'
}
