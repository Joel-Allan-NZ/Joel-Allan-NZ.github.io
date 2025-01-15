interface Space {
  file: boolean
  id: number
  length: number
  index: number
}
export function partOne(input: string[]): number | string {
  const spaces = parse(input)
  return calculateChecksum(spaces)
}

function parse(input: string[]): Space[] {
  const spaces: Space[] = []
  let file = true
  let index = 0
  let id = 0
  input[0].split('').forEach((c) => {
    let length = parseInt(c)
    spaces.push({ file, length, id: file ? id : -1, index })
    index += length
    id = file ? id + 1 : id
    file = !file
  })
  return spaces
}

function calculateChecksum(spaces: Space[]): number {
  let checksum = 0
  let lastFileIndex = spaces.findLastIndex((x) => x.file)

  spaces.forEach((space) => {
    if (space.file) {
      checksum += gaussSum(space.id, space.length, space.index)
      space.file = false
    } else {
      while (space.length > 0) {
        const origin = spaces[lastFileIndex]
        if (!origin.file) return checksum

        checksum += moveAndCountChunks(origin, space)

        if (origin.length == 0) {
          origin.file = false
          lastFileIndex -= 2
        }
      }
    }
  })
  return checksum
}

function moveAndCountChunks(origin: Space, destination: Space): number {
  const bigger = origin.length > destination.length ? origin : destination
  const smaller = origin.length > destination.length ? destination : origin

  const checksum = gaussSum(origin.id, smaller.length, destination.index)

  destination.index += smaller.length
  bigger.length -= smaller.length
  smaller.length = 0

  return checksum
}

function gaussSum(id: number, length: number, index: number): number {
  return Math.floor(id * (length / 2) * (2 * index + length - 1))
}

export function partTwo(input: string[]): number | string {
  const spaces = parse(input)
  return calculateNoFragChecksum(spaces)
}

function calculateNoFragChecksum(spaces: Space[]): number {
  let total = 0
  const lastIndex = spaces.findLastIndex((x) => x.file)

  for (let i = lastIndex; i > -1; i -= 2) {
    const origin = spaces[i]
    const destination = tryFindDestination(spaces, i)
    if (!destination) total += gaussSum(origin.id, origin.length, origin.index)
    else {
      total += gaussSum(origin.id, origin.length, destination.index)
      destination.length -= origin.length
      destination.index += origin.length
    }
  }
  return total
}

function tryFindDestination(
  spaces: Space[],
  toMoveIndex: number
): Space | null {
  let firstFit = spaces.findIndex(
    (x) => !x.file && x.length >= spaces[toMoveIndex].length
  )
  return firstFit != -1 && firstFit < toMoveIndex ? spaces[firstFit] : null
}
