export function partOne(input: string[]): number | string {
  const secrets = input.map((x) => parseInt(x))

  return secrets.reduce((total, secret) => {
    for (let i = 0; i < 2000; i++) secret = getNextSecret(secret)

    return total + secret
  }, 0)
}

function getNextSecret(secret: number): number {
  secret ^= secret << 6
  secret = ((secret % 16777216) + 16777216) % 16777216

  secret ^= secret >> 5
  secret = ((secret % 16777216) + 16777216) % 16777216

  secret ^= secret << 11
  return ((secret % 16777216) + 16777216) % 16777216
}

export function partTwo(input: string[]): number | string {
  const secrets = input.map((x) => parseInt(x))
  const permTotals: number[][][][] = []
  for (let i = 0; i < 19; i++) {
    permTotals.push([])
    for (let j = 0; j < 19; j++) {
      permTotals[i].push([])
      for (let k = 0; k < 19; k++) permTotals[i][j].push(Array(19).fill(0))
    }
  }
  let max = 0
  secrets.forEach(
    (secret) => (max = countSecretTotals(secret, permTotals, max))
  )
  return max
}

function countSecretTotals(
  secret: number,
  permTotals: number[][][][],
  max: number
) {
  const seen = new Set<number>()
  const secretValues: number[] = [secret % 10]

  for (let i = 0; i < 2000; i++) {
    secret = getNextSecret(secret)
    secretValues.push(secret % 10)

    if (i > 2) {
      const lastFour = [
        9 + secretValues[i + 1] - secretValues[i],
        9 + secretValues[i] - secretValues[i - 1],
        9 + secretValues[i - 1] - secretValues[i - 2],
        9 + secretValues[i - 2] - secretValues[i - 3],
      ]
      const s =
        lastFour[0] * 1000000 +
        lastFour[1] * 10000 +
        lastFour[2] * 100 +
        lastFour[3]

      if (!seen.has(s)) {
        const res =
          permTotals[lastFour[0]][lastFour[1]][lastFour[2]][lastFour[3]] +
          (secret % 10)
        permTotals[lastFour[0]][lastFour[1]][lastFour[2]][lastFour[3]] = res
        if (res > max) max = res
        seen.add(s)
      }
    }
  }
  return max
}
