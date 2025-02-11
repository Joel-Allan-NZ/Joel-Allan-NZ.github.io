import * as y2024 from './2024/2024handler'
import * as y2023 from './2023/2023handler'

export async function partOne(
  year: string,
  day: string,
  input: string[]
): Promise<string | number> {
  year = year.toString()
  day = day.toString()

  return new Promise<number | string>((resolve) => {
    setTimeout(() => {
      // We fulfill the promise
      resolve(resolvePartOne(year, day, input))
    }, 0)
  })
}

function resolvePartOne(
  year: string,
  day: string,
  input: string[]
): string | number {
  switch (year) {
    case '2024':
      return y2024.partOne(day, input)
    case '2023':
      return y2023.partOne(day, input)
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

  return new Promise<number | string>((resolve) => {
    setTimeout(() => {
      // We fulfill the promise
      resolve(resolvePartTwo(year, day, input))
    }, 0)
  })
}

function resolvePartTwo(year: string, day: string, input: string[]) {
  switch (year) {
    case '2024':
      return y2024.partTwo(day, input)
    case '2023':
      return y2023.partTwo(day, input)
    default:
      return `${year} not recognized as a valid year`
  }
}
