import { match } from 'assert'

export function partOne(input: string[]): number | string {
  const singleLineInput = input.reduce((total, current) => total + current, '')
  const matches =
    singleLineInput.matchAll(/mul\((\d+),(\d+)\)/g).toArray() ?? []

  return valueOfMatches(matches.map((x) => [x[1], x[2]]))
}

function valueOfMatches(matches: string[][]): number {
  return matches.reduce(
    (total, match) => total + parseInt(match[0]) * parseInt(match[1]),
    0
  )
}

export function partTwo(input: string[]): number | string {
  const singleLineInput = input.reduce((total, current) => total + current, '')
  const matches =
    singleLineInput.matchAll(/mul\((\d+),(\d+)\)/g).toArray() ?? []

  const donts = singleLineInput
    .matchAll(/don\'t\(\)/g)
    .toArray()
    .map((match) => match.index)

  const dos = singleLineInput
    .matchAll(/do\(\)/g)
    .toArray()
    .map((match) => match.index)

  const disabledRanges = findDisabledRanges(donts, dos)

  const inDoRange = matches?.filter(
    (match) =>
      !disabledRanges.some(
        (range) => match.index > range[0] && match.index < range[1]
      )
  )

  return valueOfMatches(inDoRange.map((match) => [match[1], match[2]]))
}

function findDisabledRanges(donts: number[], dos: number[]): number[][] {
  const disabledRanges: number[][] = [
    [donts[0], dos.find((x) => x > donts[0]) ?? 2 ** 32],
  ]

  donts.slice(1).forEach((dont) => {
    if (dont > disabledRanges.at(-1)![1])
      disabledRanges.push([dont, dos.find((x) => x > dont) ?? 2 ** 32])
  })
  return disabledRanges
}
