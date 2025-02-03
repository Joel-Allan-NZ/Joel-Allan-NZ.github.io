export function partOne(input: string[]): number | string {
  const hands = input.map((x) => {
    let matches = x.split(' ')
    return {
      cards: matches[0],
      handValue: findHandType(matches[0], false),
      bid: parseInt(matches[1]),
    }
  })
  console.log(hands)
  hands.sort((x, y) => compareHandValue(x, y, false))
  return hands.reduce((total, hand, index) => hand.bid * (index + 1) + total, 0)
}

interface CamelCardHand {
  cards: string
  handValue: number
  bid: number
}

function compareHandValue(
  x: CamelCardHand,
  y: CamelCardHand,
  joker: boolean
): number {
  if (x.handValue != y.handValue) return x.handValue - y.handValue

  for (let i = 0; i < x.cards.length; i++) {
    if (x.cards[i] != y.cards[i])
      return cardValue(x.cards[i], joker) - cardValue(y.cards[i], joker)
  }
  return 0
}

function cardValue(card: string, joker: boolean): number {
  switch (card) {
    case 'A':
      return 14
    case 'K':
      return 13
    case 'Q':
      return 12
    case 'J':
      return joker ? 0 : 11
    case 'T':
      return 10
    default:
      return parseInt(card)
  }
}

function findHandType(hand: string, joker: boolean): number {
  const counted = new Map<string, number>()
  let max = 1
  hand.split('').forEach((c) => {
    let d = counted.get(c)
    if (d) {
      counted.set(c, d + 1)
      max = d + 1 > max ? d + 1 : max
    } else counted.set(c, 1)
  })

  if (joker && counted.get('J'))
    return findHandTypeJoker(counted.size, max, counted.get('J')!)

  switch (counted.size) {
    case 1:
      return 7
    case 2:
      return counted.values().find((x) => x == 2 || x == 3) ? 5 : 6
    case 3:
      return max == 3 ? 4 : 3
    case 4:
      return 2
    default:
      return 1
  }
}

export function partTwo(input: string[]): number | string {
  const hands = input.map((x) => {
    let matches = x.split(' ')
    return {
      cards: matches[0],
      handValue: findHandType(matches[0], true),
      bid: parseInt(matches[1]),
    }
  })
  hands.sort((x, y) => compareHandValue(x, y, true))
  console.log(hands)
  return hands.reduce((total, hand, index) => hand.bid * (index + 1) + total, 0)
}

function findHandTypeJoker(
  keyCount: number,
  maxCount: number,
  jokers: number
): number {
  switch (keyCount) {
    case 1:
    case 2:
      return 7
    case 3:
      return jokers == 1 && maxCount < 3 ? 5 : 6
    case 4:
      return jokers == 2 || maxCount == 2 ? 4 : 2
    default:
      return 2
  }
}
