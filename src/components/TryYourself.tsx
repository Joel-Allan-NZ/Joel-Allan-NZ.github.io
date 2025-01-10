import React from 'react'
import { partOne, partTwo } from '../../solutions/handler'

export default function TryYourself({ year, puzz }) {
  const [puzzleInput, setPuzzleInput] = React.useState<string>('')
  const [solution, setSolution] = React.useState<string | number | undefined>(
    undefined
  )

  const runPartOne = () => {
    setSolution(() => partOne(year, puzz, puzzleInput.split(/\r|\n/)))
  }
  const runPartTwo = () => {
    setSolution(() => partTwo(year, puzz, puzzleInput.split(/\r|\n/)))
  }

  return (
    <div className="mb-10">
      <textarea
        name="puzzleinput"
        className="w-full border border-black rounded-sm min-h-32"
        placeholder="Paste your input here and try it out for yourself! :)"
        value={puzzleInput}
        onChange={(e) => {
          setPuzzleInput(e.target.value.trim())
        }}
      ></textarea>
      <div>
        {' '}
        <button
          className="border border-blue-200 rounded-lg bg-blue-100 ml-2 p-1 transition delay-100 duration-300 ease-in-out hover:bg-blue-200 hover:scale-105"
          onClick={() => runPartOne()}
        >
          Solve Part One
        </button>
        <button
          className="border border-blue-200 rounded-lg bg-blue-100 ml-2 p-1 transition delay-100 duration-300 ease-in-out hover:bg-blue-200 hover:scale-105"
          onClick={() => runPartTwo()}
        >
          Solve Part Two
        </button>
      </div>

      {solution ? <p>Result: {solution}</p> : <></>}
    </div>
  )
}
