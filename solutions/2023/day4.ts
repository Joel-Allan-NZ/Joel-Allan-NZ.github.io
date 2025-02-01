export function partOne(input: string[]): number | string {
  const cards = parse(input)

  return cards
    .values()
    .reduce((total, card) => (card == 0 ? total : total + 2 ** (card - 1)), 0)
}

function parse(input: string[]): Map<number, number> {
  const cards = new Map<number, number>()

  input.forEach((line) => {
    const split = line.split('|')
    const num = split[0].split(':')
    const numbers = new Set<string>([
      ...num[1].matchAll(/\d+/g).map((x) => x[0]),
    ])
    const winning = split[1].matchAll(/\d+/g)
    const game = parseInt(num[0].match(/\d+/)![0])

    const winningCount = winning.reduce(
      (total, current) => (numbers.has(current[0]) ? total + 1 : total),
      0
    )
    cards.set(game, winningCount)
  })
  return cards
}

export function partTwo(input: string[]): number | string {
  const cards = parse(input)
  const cache = new Map<number, number>()
  return cards
    .keys()
    .reduce((total, card) => countCardWinnings(cards, cache, card) + total, 0)
}

function countCardWinnings(
  cards: Map<number, number>,
  cache: Map<number, number>,
  card: number
): number {
  if (cache.has(card)) return cache.get(card)!

  const winSize = cards.get(card)! + card
  let total = 1
  for (let i = card + 1; i <= winSize; i++)
    total += countCardWinnings(cards, cache, i)

  cache.set(card, total)
  return total
}
