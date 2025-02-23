export function partOne(input: string[]): number | string {
  const hail = parse(input)
  const MIN = 200000000000000
  const MAX = 400000000000000

  let count = 0
  for (let i = 0; i < hail.length; i++) {
    for (let j = i + 1; j < hail.length; j++) {
      const inter = intercept(hail[i], hail[j])
      if (isValidIntercept(hail[i], hail[j], inter, MIN, MAX)) {
        count++
      }
    }
  }
  return count
}

function parse(input: string[]): number[][][] {
  const hail: number[][][] = []
  input.forEach((line) => {
    const split = line.split('@')
    hail.push(split.map((x) => x.split(', ').map((x) => parseInt(x))))
  })
  return hail
}

function intercept(a: number[][], b: number[][]): number[] {
  if (a[1][1] * b[1][0] - a[0][0] * b[1][1] == 0) return [-1, -1]

  const numerator =
    a[0][0] * b[1][1] -
    a[0][1] * b[1][0] -
    b[0][0] * b[1][1] +
    b[0][1] * b[1][0]
  const denominator = a[1][1] * b[1][0] - a[1][0] * b[1][1]

  const lambda = numerator / denominator

  return [a[0][0] + lambda * a[1][0], a[0][1] + lambda * a[1][1]]
}

function isValidIntercept(
  a: number[][],
  b: number[][],
  intercept: number[],
  min: number,
  max: number
): boolean {
  if (
    intercept.some(
      (i, index) =>
        (i < a[0][index] && a[1][index] > 0) ||
        (i < b[0][index] && b[1][index] > 0)
    )
  )
    return false
  if (
    intercept.some(
      (i, index) =>
        (i > a[0][index] && a[1][index] < 0) ||
        (i > b[0][index] && b[1][index] < 0)
    )
  )
    return false

  return intercept.every((i) => i >= min && i <= max)
}

export function partTwo(input: string[]): number | string {
  const hail = parse(input)
  const velocityVector = findIntersectVelocity(hail)

  const a = hail[0]
  const ab = [a, hail[1]]

  const m = ab.map(
    (x) => (x[1][1] - velocityVector[1]) / (x[1][0] - velocityVector[0])
  )
  const c = ab.map((x, index) => x[0][1] - m[index] * x[0][0])

  const x = Math.floor((c[1] - c[0]) / (m[0] - m[1]))
  const y = Math.floor(m[0] * x + c[0])
  const z =
    a[0][2] +
    ((a[1][2] - velocityVector[2]) * (x - a[0][0])) /
      (a[1][0] - velocityVector[0])

  return x + y + z
}

function findIntersectVelocity(hail: number[][][]): number[] {
  const sets = [new Set<number>(), new Set<number>(), new Set<number>()]

  for (let i = 0; i < hail.length; i++) {
    for (let j = i + 1; j < hail.length; j++) {
      for (let k = 0; k < 3; k++) {
        const res = findPotentialIntersectVelocity(hail[i], hail[j], k, 2000)
        if (res.size > 0) {
          sets[k] = sets[k].size > 0 ? sets[k].intersection(res) : res
        }
      }
    }
  }
  return sets.map((x) => x.values().toArray()[0])
}

function findPotentialIntersectVelocity(
  a: number[][],
  b: number[][],
  vectorDimension: number,
  speedRange: number
): Set<number> {
  const potential = new Set<number>()
  if (a[1][vectorDimension] == b[1][vectorDimension]) {
    const diff = b[0][vectorDimension] - a[0][vectorDimension]
    for (let v = -1 * speedRange; v <= speedRange; v++) {
      const c = v - a[1][vectorDimension]
      if (c != 0 && diff != 0 && ((diff % c) + c) % c == 0) potential.add(v)
    }
  }
  return potential
}
