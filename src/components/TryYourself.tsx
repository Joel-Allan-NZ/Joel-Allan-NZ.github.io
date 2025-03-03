import React from 'react'
import { partOne, partTwo } from '../../solutions/handler'

export default function TryYourself({
  year,
  puzz,
}: {
  year: string
  puzz: string
}) {
  const [puzzleInput, setPuzzleInput] = React.useState<string>('')
  const [solution, setSolution] = React.useState<string | number | undefined>(
    undefined
  )
  const [solving, setSolving] = React.useState(false)

  const runPartOne = async () => {
    setSolving(true)
    partOne(year, puzz, puzzleInput.split(/\r|\n/))
      .then((result) =>
        setSolution(() =>
          result == 0
            ? 'Either you tried to run a bad input, or the answer was 0'
            : result
        )
      )
      .catch(() =>
        setSolution(
          'Something went wrong! Ensure you have the correct input and try again.'
        )
      )
      .finally(() => setSolving(false))
  }

  const runPartTwo = async () => {
    setSolving(true)
    partTwo(year, puzz, puzzleInput.split(/\r|\n/))
      .then((result) => {
        setSolution(() =>
          result == 0
            ? 'Either you tried to run a bad input, or the answer was 0'
            : result
        )
      })
      .catch(() =>
        setSolution(
          'Something went wrong! Ensure you have the correct input and try again.'
        )
      )
      .finally(() => {
        setSolving(false)
      })
  }

  return (
    <div className="mb-10">
      <textarea
        name="puzzleinput"
        aria-label="paste your input here"
        className="w-full border border-black rounded min-h-32 bg-chicSecondary text-chicFour mb-6"
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
      {solving ? (
        <p>Thinking...</p>
      ) : solution ? (
        <p>Result: {solution}</p>
      ) : (
        <></>
      )}
    </div>
  )
}
