export function partOne(input: string[]): number | string {
  return findPaths(input, 0, 3)
}
interface HeatNode {
  x: number
  y: number
  value: number
  from: number[]
}

function findPaths(
  input: string[],
  minSteps: number,
  maxSteps: number
): number {
  const grid = heatGrid(input)
  grid[0][0].from = [0, 0, 0, 0]
  let future: { x: number; y: number; nextVertical: boolean }[] = []
  getNextVertical(grid, grid[0][0], minSteps, maxSteps, future)
  getNextHorizontal(grid, grid[0][0], minSteps, maxSteps, future)

  while (future.length > 0) {
    const next = future
    future = []
    for (let state of next) {
      if (state.nextVertical)
        getNextVertical(
          grid,
          grid[state.y][state.x],
          minSteps,
          maxSteps,
          future
        )
      else
        getNextHorizontal(
          grid,
          grid[state.y][state.x],
          minSteps,
          maxSteps,
          future
        )
    }
  }
  var last = grid[grid.length - 1][grid[0].length - 1]
  return Math.min(last.from[0], last.from[1], last.from[2], last.from[3])
}

function heatGrid(input: string[]): HeatNode[][] {
  const grid: HeatNode[][] = []
  const big = 2 ** 31
  for (let y = 0; y < input.length; y++) {
    grid.push([])
    for (let x = 0; x < input[y].length; x++) {
      grid[y].push({
        x,
        y,
        value: parseInt(input[y][x]),
        from: [big, big, big, big],
      })
    }
  }
  return grid
}

function getNextVertical(
  grid: HeatNode[][],
  origin: HeatNode,
  minSteps: number,
  maxSteps: number,
  next: { x: number; y: number; nextVertical: boolean }[]
): void {
  let originDistance = Math.min(origin.from[1], origin.from[3])

  for (let i = 1; i <= maxSteps; i++) {
    if (origin.y - i < 0) break

    let node = grid[origin.y - i][origin.x]
    originDistance += node.value
    if (i >= minSteps && node.from[2] > originDistance) {
      next.push({ x: node.x, y: node.y, nextVertical: false })
      node.from[2] = originDistance
    }
  }

  originDistance = Math.min(origin.from[1], origin.from[3])

  for (let i = 1; i <= maxSteps; i++) {
    if (origin.y + i > grid.length - 1) break

    let node = grid[origin.y + i][origin.x]
    originDistance += node.value
    if (i >= minSteps && node.from[0] > originDistance) {
      next.push({ x: node.x, y: node.y, nextVertical: false })
      node.from[0] = originDistance
    }
  }
}

function getNextHorizontal(
  grid: HeatNode[][],
  origin: HeatNode,
  minSteps: number,
  maxSteps: number,
  next: { x: number; y: number; nextVertical: boolean }[]
): void {
  let originDistance = Math.min(origin.from[0], origin.from[2])
  for (let i = 1; i <= maxSteps; i++) {
    if (origin.x + 1 > grid[0].length - i) break

    let node = grid[origin.y][origin.x + i]
    originDistance += node.value
    if (i >= minSteps && node.from[3] > originDistance) {
      next.push({ x: node.x, y: node.y, nextVertical: true })
      node.from[3] = originDistance
    }
  }
  originDistance = Math.min(origin.from[0], origin.from[2])
  for (let i = 1; i <= maxSteps; i++) {
    if (origin.x - i < 0) break

    let node = grid[origin.y][origin.x - i]
    originDistance += node.value
    if (i >= minSteps && node.from[1] > originDistance) {
      next.push({ x: node.x, y: node.y, nextVertical: true })
      node.from[1] = originDistance
    }
  }
}

export function partTwo(input: string[]): number | string {
  return findPaths(input, 4, 10)
}
