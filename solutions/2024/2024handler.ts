import { partOne as partOne1, partTwo as partTwo1 } from './day1'
import { partOne as partOne2, partTwo as partTwo2 } from './day2'
import { partOne as partOne3, partTwo as partTwo3 } from './day3'
import { partOne as partOne4, partTwo as partTwo4 } from './day4'
import { partOne as partOne5, partTwo as partTwo5 } from './day5'
import { partOne as partOne6, partTwo as partTwo6 } from './day6'
import { partOne as partOne7, partTwo as partTwo7 } from './day7'
import { partOne as partOne8, partTwo as partTwo8 } from './day8'
import { partOne as partOne9, partTwo as partTwo9 } from './day9'
import { partOne as partOne10, partTwo as partTwo10 } from './day10'

export function partOne(day: string, input: string[]): number | string {
  switch (day) {
    case '1':
      return partOne1(input)
    case '2':
      return partOne2(input)
    case '3':
      return partOne3(input)
    case '4':
      return partOne4(input)
    case '5':
      return partOne5(input)
    case '6':
      return partOne6(input)
    case '7':
      return partOne7(input)
    case '8':
      return partOne8(input)
    case '9':
      return partOne9(input)
    case '10':
      return partOne10(input)
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
    case '3':
      return partTwo3(input)
    case '4':
      return partTwo4(input)
    case '5':
      return partTwo5(input)
    case '6':
      return partTwo6(input)
    case '7':
      return partTwo7(input)
    case '8':
      return partTwo8(input)
    case '9':
      return partTwo9(input)
    case '10':
      return partTwo10(input)
    default:
      return `${day} not recognized as a valid year`
  }
}
