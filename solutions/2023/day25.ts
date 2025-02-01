export function partOne(input: string[]): number | string {
  const { keys, locks } = parse(input)

  return keys.reduce(
    (total, key) => total + locks.filter((lock) => isFit(key, lock, 5)).length,
    0
  )
}

function parse(input: string[]): { keys: number[][]; locks: number[][] } {
  const DIAGRAMHEIGHT = 7
  const KEYSIZE = 5
  const keys: number[][] = []
  const locks: number[][] = []

  for (let i = 0; i < input.length; i += DIAGRAMHEIGHT + 1) {
    const lockOrKey: number[] = Array(5).fill(-1)
    for (let j = 0; j < DIAGRAMHEIGHT; j++) {
      for (let k = 0; k < KEYSIZE; k++) {
        if (input[i + j][k] == '#') lockOrKey[k]++
      }
    }
    if (input[i][0] != '#') keys.push(lockOrKey)
    else locks.push(lockOrKey)
  }

  return { keys, locks }
}

function isFit(key: number[], lock: number[], keySize: number): boolean {
  return key.every((value, index) => lock[index] + value <= keySize)
}

export function partTwo(input: string[]): number | string {
  return 'Free Star! ⭐'
}
