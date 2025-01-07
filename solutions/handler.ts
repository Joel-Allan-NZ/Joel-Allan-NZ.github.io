import {
  partOne as partOne2024,
  partTwo as partTwo2024,
} from './2024/2024handler'

export function partOne(
  year: string,
  day: string,
  input: string[]
): string | number {
  year = year.toString()
  day = day.toString()

  switch (year) {
    case '2024':
      return partOne2024(day, input)
    default:
      return `${year} not recognized as a valid year`
  }
}

export function partTwo(
  year: string,
  day: string,
  input: string[]
): string | number {
  year = year.toString()
  day = day.toString()

  switch (year) {
    case '2024':
      return partTwo2024(day, input)
    default:
      return `${year} not recognized as a valid year`
  }
}
