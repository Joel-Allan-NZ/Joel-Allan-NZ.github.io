export function partOne(input: string[]): number | string {
  const { wires, gatesByWire } = parse(input)
  const binaryString = runSystem(wires, gatesByWire)
  return parseInt(binaryString, 2)
}

interface Gate {
  a: string
  b: string
  operation: string
  output: string
}

function parse(input: string[]): {
  wires: Map<string, boolean | undefined>
  gatesByWire: Map<string, Gate[]>
} {
  const wires = new Map<string, boolean | undefined>()
  const gatesByWire = new Map<string, Gate[]>()
  let gates = false

  input.forEach((line) => {
    if (!line || line.length == 0) {
      gates = true
    } else {
      if (gates) {
        const split = line.split(/ /)
        const gate: Gate = {
          a: split[0],
          b: split[2],
          operation: split[1],
          output: split[4],
        }
        if (!gatesByWire.has(gate.a)) gatesByWire.set(gate.a, [gate])
        else gatesByWire.get(gate.a)?.push(gate)
        if (!gatesByWire.has(gate.b)) gatesByWire.set(gate.b, [gate])
        else gatesByWire.get(gate.b)?.push(gate)

        if (!wires.has(gate.a)) wires.set(gate.a, undefined)
        if (!wires.has(gate.b)) wires.set(gate.b, undefined)
        if (!wires.has(gate.output)) wires.set(gate.output, undefined)
      } else {
        const split = line.split(/: /)
        wires.set(split[0], split[1] === '1')
      }
    }
  })
  return { wires, gatesByWire }
}

function runSystem(
  wires: Map<string, boolean | undefined>,
  gates: Map<string, Gate[]>
): string {
  let gatesToProcess = [...gates.values().toArray()].flatMap((x) => x)
  let gatesToProcessNext: Gate[] = []

  while (gatesToProcess.length > 0) {
    const currentGate = gatesToProcess.shift()!
    const gateResult = resolveGate(currentGate, wires)
    if (wires.get(currentGate.output) != gateResult) {
      wires.set(currentGate.output, gateResult)
      if (gates.has(currentGate.output)) {
        gatesToProcessNext = [
          ...gatesToProcessNext,
          ...gates.get(currentGate.output)!,
        ]
      }
    }
    if (gatesToProcess.length == 0) {
      gatesToProcess = gatesToProcessNext
      gatesToProcessNext = []
    }
  }

  return wires
    .keys()
    .filter((x) => x.startsWith('z'))
    .toArray()
    .sort((x, y) => (y > x ? 1 : y == x ? 0 : -1))
    .reduce(
      (total, current) => (wires.get(current) ? total + '1' : total + '0'),
      ''
    )
}

function resolveGate(
  gate: Gate,
  wires: Map<string, boolean | undefined>
): boolean | undefined {
  const a = wires.get(gate.a)
  const b = wires.get(gate.b)

  if (a === undefined || b === undefined) return undefined
  if (gate.operation == 'AND') return a && b
  if (gate.operation == 'OR') return a || b
  if (gate.operation == 'XOR') return a != b
}

export function partTwo(input: string[]): number | string {
  const { wires, gatesByWire } = parse(input)
  const zBits =
    'z' +
    wires
      .keys()
      .reduce((sum, wire) => (wire.startsWith('z') ? sum + 1 : sum), -1)
  const gates = [...new Set([...gatesByWire.values().flatMap((x) => x)])]
  const incorrectGates = gates.filter(
    (gate) => !isValidGate(gatesByWire, gate, zBits)
  )

  return incorrectGates
    .map((x) => x.output)
    .sort()
    .join(',')
}

function isValidGate(
  gatesByWire: Map<string, Gate[]>,
  gate: Gate,
  zBits: string
): boolean {
  if (isFullAdderStart(gate)) {
    if (gatesByWire.has(gate.output)) {
      const childGates = gatesByWire.get(gate.output)!
      if (
        gate.operation == 'AND' &&
        childGates.some((x) => x.operation == 'AND')
      )
        return false
      if (
        gate.operation == 'XOR' &&
        childGates.some((x) => x.operation == 'OR')
      )
        return false
    }
  }
  if (isFullAdderEnd(gate, zBits) && gate.operation != 'XOR') return false
  if (isAdderMiddle(gate) && gate.operation == 'XOR') return false
  return true
}

function isAdderMiddle(gate: Gate): boolean {
  return (
    !gate.a.startsWith('x') &&
    !gate.a.startsWith('y') &&
    !gate.b.startsWith('x') &&
    !gate.b.startsWith('y') &&
    !gate.output.startsWith('z')
  )
}

function isFullAdderEnd(gate: Gate, zBits: string): boolean {
  return gate.output.startsWith('z') && gate.output != zBits
}

function isFullAdderStart(gate: Gate) {
  return (
    (gate.a.startsWith('x') || gate.a.startsWith('y')) &&
    (gate.b.startsWith('x') || gate.b.startsWith('y')) &&
    !gate.a.endsWith('00') &&
    !gate.b.endsWith('00')
  )
}
