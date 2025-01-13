export function partOne(input: string[]): number | string {
  const parsed = parse(input)

  return parsed.reduce(
    (total, current) =>
      canBeValid(current[0], current[1], current.slice(2), 0)
        ? total + current[0]
        : total,
    0
  )
}

function parse(input: string[]): number[][] {
  return input.map((line) => line.split(/\ \:|\ /).map((val) => parseInt(val)))
}

function canBeValid(
  target: number,
  total: number,
  values: number[],
  index: number
): boolean {
  if (index == values.length) return total == target
  if (total > target) return false

  return (
    canBeValid(target, total * values[index], values, index + 1) ||
    canBeValid(target, total + values[index], values, index + 1)
  )
}

export function partTwo(input: string[]): number | string {
  const parsed = parse(input)

  return parsed.reduce(
    (total, current) =>
      canBeValidWithConcat(current[0], current[1], current.slice(2), 0)
        ? total + current[0]
        : total,
    0
  )
}

function canBeValidWithConcat(
  target: number,
  total: number,
  values: number[],
  index: number
): boolean {
  if (index == values.length) return total == target
  if (total > target) return false

  return (
    canBeValidWithConcat(target, total * values[index], values, index + 1) ||
    canBeValidWithConcat(target, total + values[index], values, index + 1) ||
    canBeValidWithConcat(
      target,
      parseInt(total.toString() + values[index]),
      values,
      index + 1
    )
  )
}
