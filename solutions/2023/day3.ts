export function partOne(input: string[]): number | string {
  const singleLineInput = input.reduce((total, current) => total + current, '')
  const matches = [...singleLineInput.matchAll(/mul\((\d+),(\d+)\)/g).toArray()]

  return matches.reduce(
    (total, match) => total + parseInt(match[1]) * parseInt(match[2]),
    0
  )
}

export function partTwo(input: string[]): number | string {
  const singleLineInput = input.reduce((total, current) => total + current, '')
  const matches = [
    ...singleLineInput.matchAll(/mul\((\d+),(\d+)\)|(don\'t\(\))|(do\(\))/g),
  ]
  let dont = false
  let total = 0
  matches.forEach((match) => {
    if (match[0].startsWith('don')) dont = true
    else if (match[0].startsWith('do')) dont = false
    else if (!dont) total += parseInt(match[1]) * parseInt(match[2])
  })
  return total
}
