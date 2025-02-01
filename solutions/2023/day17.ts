export function partOne(input: string[]): number | string {
  const { state, instructions } = parse(input)

  while (
    state.instructionPointer > -1 &&
    state.instructionPointer < instructions.length - 1
  )
    operation(
      instructions[state.instructionPointer],
      instructions[state.instructionPointer + 1],
      state
    )

  return state.output
}

interface State {
  A: number
  B: number
  C: number
  output: string
  instructionPointer: number
}

function parse(input: string[]): { state: State; instructions: number[] } {
  const state: State = { A: 0, B: 0, C: 0, output: '', instructionPointer: 0 }
  state.A = parseInt(input[0].match(/(\d+)/)![0])
  state.B = parseInt(input[1].match(/(\d+)/)![0])
  state.C = parseInt(input[2].match(/(\d+)/)![0])

  const instructions = input[4]
    .split(/[\, ]/)
    .slice(1)
    .map((x) => parseInt(x))
  return { state, instructions }
}

function operation(opCode: number, operand: number, state: State) {
  switch (opCode) {
    case 0:
      adv(comboOperand(operand, state), state)
      break
    case 1:
      bxl(operand, state)
      break
    case 2:
      bst(comboOperand(operand, state), state)
      break
    case 3:
      jnz(operand, state)
      break
    case 4:
      bxc(state)
      break
    case 5:
      out(comboOperand(operand, state), state)
      break
    case 6:
      bdv(comboOperand(operand, state), state)
      break
    case 7:
      cdv(comboOperand(operand, state), state)
  }
  if (opCode != 3) state.instructionPointer += 2
}

function comboOperand(operand: number, state: State): number {
  switch (operand) {
    case 4:
      return state.A
    case 5:
      return state.B
    case 6:
      return state.C
    default:
      return operand
  }
}

function adv(comboOperand: number, state: State) {
  state.A = Math.floor(state.A / 2 ** comboOperand)
}
function bdv(comboOperand: number, state: State) {
  state.B = Math.floor(state.A / 2 ** comboOperand)
}
function cdv(comboOperand: number, state: State) {
  state.C = Math.floor(state.A / 2 ** comboOperand)
}
function bxl(operand: number, state: State) {
  state.B ^= operand
}
function bst(comboOperand: number, state: State) {
  state.B = comboOperand % 8
}
function jnz(operand: number, state: State) {
  state.instructionPointer =
    state.A == 0 ? state.instructionPointer + 2 : operand
}
function bxc(state: State) {
  state.B ^= state.C
}
function out(comboOperand: number, state: State) {
  state.output =
    state.output.length > 0
      ? `${state.output},${((comboOperand % 8) + 8) % 8}`
      : `${((comboOperand % 8) + 8) % 8}`
}

export function partTwo(input: string[]): number | string {
  const { state, instructions } = parse(input)
  let candidates = new Set<number>([0])

  for (let i = 1; i <= instructions.length; i++) {
    let nextCandidates = new Set<number>()
    candidates.forEach((candidate) => {
      nextCandidates = nextCandidates.union(
        findNextCandidates(candidate, i, state, instructions)
      )
    })
    candidates = nextCandidates
  }
  return candidates
    .values()
    .toArray()
    .reduce((total, x) => (total < x ? total : x), 2 ** 63)
}

function findNextCandidates(
  start: number,
  position: number,
  state: State,
  instructions: number[]
): Set<number> {
  const candidates = new Set<number>()
  for (let offset = 0; offset < 8; offset++) {
    state.output = ''
    state.instructionPointer = 0
    state.A = start + offset

    while (
      state.instructionPointer > -1 &&
      state.instructionPointer < instructions.length - 1
    ) {
      operation(
        instructions[state.instructionPointer],
        instructions[state.instructionPointer + 1],
        state
      )
    }

    let numberOut = state.output.split(/,/).map((x) => parseInt(x))
    if (
      position > 0 &&
      numberOut[numberOut.length - position] ==
        instructions[instructions.length - position]
    ) {
      candidates.add(
        position < instructions.length ? (start + offset) * 8 : start + offset
      )
    }
  }
  return candidates
}
