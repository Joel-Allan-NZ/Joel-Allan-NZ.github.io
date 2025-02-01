export function partOne(input: string[]): number | string {
  return input.reduce((total, line) => total + readCalibrationValue(line), 0)
}

function readCalibrationValue(line: string): number {
  const digits = ['a', 'a']

  line.split('').forEach((c) => {
    if (!isNaN(parseInt(c))) {
      if (digits[0] == 'a') digits[0] = c
      digits[1] = c
    }
  })
  return parseInt(digits.join(''))
}

export function partTwo(input: string[]): number | string {
  const spelled = [
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
  ]
  return input.reduce(
    (total, line) =>
      total +
      parseInt(readCalibrationWithSpelledValues(line, spelled).join('')),
    0
  )
}

function readCalibrationWithSpelledValues(
  line: string,
  spelled: string[]
): string[] {
  const digits: string[] = []

  line.split('').forEach((c, index) => {
    if (!isNaN(parseInt(c))) {
      digits.push(c)
    } else {
      let value = spelled.find((x) => line.slice(index).startsWith(x))
      if (value) {
        value = (spelled.findIndex((v) => v == value) + 1).toString()
        digits.push(value)
      }
    }
  })
  return [digits[0], digits.slice(-1)[0]]
}
