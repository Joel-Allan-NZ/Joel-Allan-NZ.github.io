export function partOne(input: string[]): number | string {
  var modules = parse(input)
  const pulses = [0, 0]

  for (let i = 0; i < 1000; i++) {
    const result = buttonPulses(modules, i)
    pulses[0] += result[0]
    pulses[1] += result[1]
  }

  return pulses[0] * pulses[1]
}

interface Module {
  type: string
  name: string
  connections: string[]
  high: boolean
  inputs: Map<string, boolean> | undefined
}

interface Pulse {
  high: boolean
  origin: string
  destination: string
}

function parse(input: string[]): Map<string, Module> {
  const modules = new Map<string, Module>()
  const outputOnly = new Set<string>()

  input.forEach((line) => {
    const split = line.split(/\, | /)
    const type = split[0][0]
    const name = type == 'b' ? split[0] : split[0].slice(1)
    modules.set(name, {
      type,
      name,
      connections: split.slice(2),
      high: false,
      inputs: undefined,
    })
  })

  modules.entries().forEach((kvp) => {
    if (kvp[1].type == '&') {
      kvp[1].inputs = new Map<string, boolean>()
      modules.values().forEach((value) => {
        if (value.connections.includes(kvp[0]))
          kvp[1].inputs!.set(value.name, false)
      })
    }
    kvp[1].connections.forEach((connection) => {
      if (!modules.has(connection)) outputOnly.add(connection)
    })
  })

  outputOnly.forEach((name) =>
    modules.set(name, {
      type: 'b',
      name,
      connections: [],
      high: true,
      inputs: undefined,
    })
  )

  return modules
}

function buttonPulses(
  modules: Map<string, Module>,
  presses: number,
  monitoring: Map<string, number> | undefined = undefined
): number[] {
  let queue: Pulse[] = []
  const pulses = [1, 0]
  queue.push({ high: false, origin: 'button', destination: 'broadcaster' })

  while (queue.length > 0) {
    const pulse = queue.shift()!
    const destination = modules.get(pulse.destination)!

    if (monitoring && pulse.high && monitoring.has(pulse.origin))
      if (monitoring.get(pulse.origin) == -1)
        monitoring.set(pulse.origin, presses)

    handlePulse(destination, pulse, pulses, queue)
  }
  return pulses
}

function handlePulse(
  destination: Module,
  pulse: Pulse,
  pulses: number[],
  next: Pulse[]
): void {
  if (destination.type == '%') {
    if (!pulse.high) {
      destination.high = !destination.high
      countPulses(destination.high, destination.connections.length, pulses)

      destination.connections.forEach((connection) =>
        next.push({
          high: destination.high,
          origin: destination.name,
          destination: connection,
        })
      )
    }
  } else if (destination.type == '&') {
    destination.inputs!.set(pulse.origin, pulse.high)
    const output = destination.inputs!.values().some((x) => !x)
    countPulses(output, destination.connections.length, pulses)

    destination.connections.forEach((connection) =>
      next.push({
        high: output,
        origin: destination.name,
        destination: connection,
      })
    )
  } else {
    pulses[0] += destination.connections.length
    destination.connections.forEach((connection) =>
      next.push({
        high: false,
        origin: destination.name,
        destination: connection,
      })
    )
  }
}

function countPulses(high: boolean, length: number, pulses: number[]) {
  if (high) pulses[1] += length
  else pulses[0] += length
}

export function partTwo(input: string[]): number | string {
  const modules = parse(input)
  const grandParentHigh = new Map<string, number>()
  const rxParents = modules.values().filter((x) => x.connections.includes('rx'))

  rxParents.forEach((parent) =>
    parent.inputs?.keys().forEach((input) => grandParentHigh.set(input, -1))
  )

  let pressed = 0

  while (modules.get('rx')!.high) {
    pressed++
    buttonPulses(modules, pressed, grandParentHigh)
    if (grandParentHigh.values().every((v) => v != -1)) {
      console.log(grandParentHigh.values())
      return grandParentHigh.values().reduce((total, value) => value * total, 1)
    }
  }
  return pressed
}
