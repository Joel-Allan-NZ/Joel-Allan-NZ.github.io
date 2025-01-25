import * as y2024 from './2024/2024handler'

export async function partOne(
  year: string,
  day: string,
  input: string[]
): Promise<string | number> {
  year = year.toString()
  day = day.toString()

  switch (year) {
    case '2024':
      return y2024.partOne(day, input)
    default:
      return `${year} not recognized as a valid year`
  }
}

export async function partTwo(
  year: string,
  day: string,
  input: string[]
): Promise<string | number> {
  year = year.toString()
  day = day.toString()

  switch (year) {
    case '2024':
      return y2024.partTwo(day, input)
    default:
      return `${year} not recognized as a valid year`
  }
}
