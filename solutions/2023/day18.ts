export function partOne(input: string[]): number | string {
  const corners = digTrenches(input)

  return gaussArea(corners) + calculatePerimeter(corners) / 2 + 1
}

function digTrenches(input: string[]): number[][] {
  let x = 0,
    y = 0
  const corners: number[][] = []

  for (let line of input) {
    const split = line.split(' ')
    const distance = parseInt(split[1])
    corners.push([x, y])

    x = split[0] == 'R' ? x + distance : split[0] == 'L' ? x - distance : x
    y = split[0] == 'D' ? y + distance : split[0] == 'U' ? y - distance : y
  }
  return corners
}

function gaussArea(corners: number[][]): number {
  const total = corners
    .map((corner, index) =>
      index == corners.length - 1
        ? [corner, corners[0]]
        : [corner, corners[index + 1]]
    )
    .reduce(
      (total, pair) =>
        total + pair[0][0] * pair[1][1] - pair[1][0] * pair[0][1],
      0
    )

  return 0.5 * Math.abs(total)
}

function calculatePerimeter(corners: number[][]) {
  return corners
    .map((corner, index) =>
      index == corners.length - 1
        ? [corner, corners[0]]
        : [corner, corners[index + 1]]
    )
    .reduce(
      (total, pair) =>
        total +
        Math.abs(pair[0][0] - pair[1][0]) +
        Math.abs(pair[0][1] - pair[1][1]),
      0
    )
}

export function partTwo(input: string[]): number | string {
  var directions = ['R', 'D', 'L', 'U']
  const parsedInput = input.map((line) => {
    var split = line.split(' ')
    var direction = directions[parseInt(split[2][split[2].length - 2])]
    return `${direction} ${parseInt(split[2].slice(2, -2), 16)}`
  })

  const corners = digTrenches(parsedInput)

  return gaussArea(corners) + calculatePerimeter(corners) / 2 + 1
}
