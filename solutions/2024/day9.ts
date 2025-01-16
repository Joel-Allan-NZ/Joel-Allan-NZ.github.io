interface Memory {
  file: boolean
  id: number
  length: number
  index: number
}
export function partOne(input: string[]): number | string {
  const spaces = parse(input)
  return calculateChecksum(spaces)
}

function parse(input: string[]): Memory[] {
  const memoryBlocks: Memory[] = []
  let file = true
  let index = 0
  let id = 0
  input[0].split('').forEach((c) => {
    let length = parseInt(c)
    memoryBlocks.push({ file, length, id: file ? id : -1, index })
    index += length
    id = file ? id + 1 : id
    file = !file
  })
  return memoryBlocks
}

function calculateChecksum(memoryBlocks: Memory[]): number {
  let checksum = 0
  let lastFileIndex = memoryBlocks.findLastIndex((x) => x.file)

  memoryBlocks.forEach((space) => {
    if (space.file) {
      checksum += gaussSum(space.id, space.length, space.index)
      space.file = false
    } else {
      while (space.length > 0) {
        const origin = memoryBlocks[lastFileIndex]
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

function moveAndCountChunks(origin: Memory, destination: Memory): number {
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
  const memoryBlocks = parse(input)
  return calculateNoFragChecksum(memoryBlocks)
}

function calculateNoFragChecksum(memoryBlocks: Memory[]): number {
  let total = 0
  const lastIndex = memoryBlocks.findLastIndex((x) => x.file)

  for (let i = lastIndex; i > -1; i -= 2) {
    const origin = memoryBlocks[i]
    const destination = tryFindDestination(memoryBlocks, i)
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
  memoryBlocks: Memory[],
  toMoveIndex: number
): Memory | null {
  let firstFit = memoryBlocks.findIndex(
    (x) => !x.file && x.length >= memoryBlocks[toMoveIndex].length
  )
  return firstFit != -1 && firstFit < toMoveIndex
    ? memoryBlocks[firstFit]
    : null
}
