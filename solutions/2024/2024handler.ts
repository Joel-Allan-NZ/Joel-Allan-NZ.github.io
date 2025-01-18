import * as day1 from './day1'
import * as day2 from './day2'
import * as day3 from './day3'
import * as day4 from './day4'
import * as day5 from './day5'
import * as day6 from './day6'
import * as day7 from './day7'
import * as day8 from './day8'
import * as day9 from './day9'
import * as day10 from './day10'
import * as day11 from './day11'
import * as day12 from './day12'
import * as day13 from './day13'
import * as day14 from './day14'
import * as day15 from './day15'

export function partOne(day: string, input: string[]): number | string {
  switch (day) {
    case '1':
      return day1.partOne(input)
    case '2':
      return day2.partOne(input)
    case '3':
      return day3.partOne(input)
    case '4':
      return day4.partOne(input)
    case '5':
      return day5.partOne(input)
    case '6':
      return day6.partOne(input)
    case '7':
      return day7.partOne(input)
    case '8':
      return day8.partOne(input)
    case '9':
      return day9.partOne(input)
    case '10':
      return day10.partOne(input)
    case '11':
      return day11.partOne(input)
    case '12':
      return day12.partOne(input)
    case '13':
      return day13.partOne(input)
    case '14':
      return day14.partOne(input)
    case '15':
      return day15.partOne(input)
    default:
      return `${day} not recognized as a valid year`
  }
}

export function partTwo(day: string, input: string[]): number | string {
  switch (day) {
    case '1':
      return day1.partTwo(input)
    case '2':
      return day2.partTwo(input)
    case '3':
      return day3.partTwo(input)
    case '4':
      return day4.partTwo(input)
    case '5':
      return day5.partTwo(input)
    case '6':
      return day6.partTwo(input)
    case '7':
      return day7.partTwo(input)
    case '8':
      return day8.partTwo(input)
    case '9':
      return day9.partTwo(input)
    case '10':
      return day10.partTwo(input)
    case '11':
      return day11.partTwo(input)
    case '12':
      return day12.partTwo(input)
    case '13':
      return day13.partTwo(input)
    case '14':
      return day14.partTwo(input)
    case '15':
      return day15.partTwo(input)
    default:
      return `${day} not recognized as a valid year`
  }
}
