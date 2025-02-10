export function partOne(input: string[]): number | string {
  return input[0]
    .split(',')
    .reduce((total, current) => total + HASH(current), 0)
}

function HASH(s: string): number {
  return s
    .split('')
    .reduce(
      (total, char, index) => ((total + s.charCodeAt(index)) * 17) % 256,
      0
    )
}

export function partTwo(input: string[]): number | string {
  const boxes = new Map<number, string[]>()

  input[0].split(',').forEach((instruction) => {
    const label =
      instruction[instruction.length - 1] == '-'
        ? instruction.slice(0, -1)
        : instruction.slice(0, -2)

    const hashed = HASH(label)

    let box = boxes.get(hashed)
    if (!box) {
      box = []
      boxes.set(hashed, box)
    }

    const index = box.findIndex((lens) => lens.slice(0, -1) == label)
    if (instruction[instruction.length - 1] == '-') {
      if (index != -1) box.splice(index, 1)
    } else {
      if (index == -1) box.push(label + instruction[instruction.length - 1])
      else box[index] = label + instruction[instruction.length - 1]
    }
  })

  return boxes.entries().reduce((total, box) => {
    let index = 0
    return (
      total +
      box[1].reduce((t, lens) => {
        index++
        return t + (box[0] + 1) * index * parseInt(lens[lens.length - 1])
      }, 0)
    )
  }, 0)
}
