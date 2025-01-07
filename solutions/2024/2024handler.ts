import { partOne as partOne1, partTwo as partTwo1 } from './day1'
import { partOne as partOne2, partTwo as partTwo2 } from './day2'

export function partOne(day: string, input: string[]): number | string {
  switch (day) {
    case '1':
      return partOne1(input)
    case '2':
      return partOne2(input)
    default:
      return `${day} not recognized as a valid year`
  }
}

export function partTwo(day: string, input: string[]): number | string {
  switch (day) {
    case '1':
      return partTwo1(input)
    case '2':
      return partTwo2(input)
    default:
      return `${day} not recognized as a valid year`
  }
}
