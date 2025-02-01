export function partOne(input: string[]): number | string {
  const games = parse(input, 0)

  return games.reduce((total, game) => total + findIntersection(game), 0)
}

interface Game {
  a: { x: number; y: number }
  b: { x: number; y: number }
  x: number
  y: number
}

function findIntersection(game: Game): number {
  const numerator = game.a.y * game.x - game.a.x * game.y
  const divisor = game.a.y * game.b.x - game.a.x * game.b.y

  if (numerator % divisor != 0) return 0

  let b = numerator / divisor
  let remX = game.x - b * game.b.x

  if (remX % game.a.x != 0) return 0

  let a = remX / game.a.x

  return a * 3 + b
}

function parse(input: string[], offset: number): Game[] {
  const games: Game[] = []
  let a: number[] = []
  let b: number[] = []
  input.forEach((line, index) => {
    if (index % 4 == 0 && line.length > 0) {
      a = line.split(/\+|\,/).map((x) => parseInt(x))
    } else if (index % 4 == 1) b = line.split(/\+|\,/).map((x) => parseInt(x))
    else if (index % 4 == 2) {
      let s = line
        .split(/\=|\,/)
        .slice(1)
        .map((x) => parseInt(x))
      games.push({
        a: { x: a[1], y: a[3] },
        b: { x: b[1], y: b[3] },
        x: s[0] + offset,
        y: s[2] + offset,
      })
    }
  })
  return games
}

export function partTwo(input: string[]): number | string {
  const games = parse(input, 10000000000000)
  return games.reduce((total, game) => total + findIntersection(game), 0)
}
